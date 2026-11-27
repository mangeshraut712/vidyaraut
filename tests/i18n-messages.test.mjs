import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import { join, relative } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const locales = ['en', 'hi', 'mr']

// Pages consume these with `t.raw(key) as string[]` and map over them right away,
// so a missing key or a scalar value in any locale breaks the rendered page.
//
// The keys are derived from the source rather than listed by hand, so a new
// `t.raw(...)` call cannot be exercised in a page yet left unchecked here.
const MISSING = Symbol('missing')

const appDir = fileURLToPath(new URL('../src/app/', import.meta.url))

async function listSourceFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name)
      return entry.isDirectory() ? listSourceFiles(path) : Promise.resolve([path])
    })
  )
  return files.flat()
}

// `useTranslations("ns")` scopes `t`, so `t.raw("a.b")` refers to the full key
// `ns.a.b`. With no namespace the literal is already the full key. A file may
// declare more than one namespace, so each call is resolved against the nearest
// preceding `useTranslations` rather than a single file-wide namespace.
const USE_TRANSLATIONS = /\b(?:useTranslations|getTranslations)(?:\s*<[^>]*>)?\(\s*(?:['"]([^'"]*)['"]\s*)?\)/g
const RAW_CALL = /\b(\w+)\.raw\(\s*(['"`])([^'"`]+)\2\s*\)/g

function rawStringArrayKeysIn(source) {
  const translators = []
  for (const match of source.matchAll(USE_TRANSLATIONS)) {
    const name = source.slice(0, match.index).match(/(\w+)\s*=\s*(?:await\s+)?$/)?.[1]
    // If the binding cannot be recognised, the translator's keys would be
    // skipped silently. Fail instead, so an unsupported pattern is never a
    // quiet gap in coverage.
    assert.ok(
      name,
      `could not determine which variable holds the translator in: ${match[0].trim()}. Update the test's binding pattern.`
    )
    translators.push({ index: match.index, name, namespace: match[1] ?? '' })
  }

  const keys = new Set()
  for (const match of source.matchAll(RAW_CALL)) {
    // Only an identifier bound to a translator is one. Any other `.raw()` method
    // (response.raw, markdown.raw, ...) is unrelated to i18n and is ignored.
    const scope = translators.filter((t) => t.index < match.index && t.name === match[1]).pop()
    if (!scope) continue

    // i18n keys must be static. A template literal is treated as an error rather
    // than skipped, so a dynamic key cannot slip past this test unnoticed.
    assert.notEqual(
      match[2],
      '`',
      `t.raw() with a template literal cannot be checked statically: ${match[0]}`
    )
    keys.add(scope.namespace ? `${scope.namespace}.${match[3]}` : match[3])
  }
  return keys
}

// Returns, per file, the raw keys it uses, so every test reads each file once.
async function rawStringArrayKeysByFile() {
  const files = (await listSourceFiles(appDir)).filter((file) => /\.tsx$/.test(file))
  const result = new Map()
  for (const file of files) {
    const keys = rawStringArrayKeysIn(await readFile(file, 'utf8'))
    if (keys.size > 0) result.set(file, keys)
  }
  assert.ok(result.size > 0, 'expected at least one t.raw(...) call in src/app')
  return result
}

async function loadMessages(locale) {
  const raw = await readFile(new URL(`../src/i18n/messages/${locale}.json`, import.meta.url), 'utf8')
  return JSON.parse(raw)
}

// Records the value type at every key path. Arrays are described by their
// element shape so that a change from `string[]` to `object[]`, or a change in
// the keys of those objects, is a visible difference rather than both "array".
// JSON cannot contain cycles, so no reference tracking is needed here.
function describeArray(items) {
  if (items.length === 0) return '[]'
  if (items.every((item) => typeof item === 'string')) return 'string[]'
  if (items.every((item) => item !== null && typeof item === 'object' && !Array.isArray(item))) {
    const shapes = new Set(items.map((item) => describeShape(item)))
    return `object[]{${[...shapes].sort().join(',')}}`
  }
  return 'array'
}

function describeShape(value) {
  return Object.keys(value)
    .sort()
    .map((key) => `${key}:${typeof value[key]}`)
    .join(' ')
}

function flattenMessages(value, prefix, shape) {
  if (value === null) {
    shape.set(prefix, 'null')
    return shape
  }
  if (Array.isArray(value)) {
    shape.set(prefix, describeArray(value))
    return shape
  }
  if (typeof value === 'object') {
    for (const [key, nested] of Object.entries(value)) {
      flattenMessages(nested, prefix ? `${prefix}.${key}` : key, shape)
    }
    return shape
  }

  shape.set(prefix, typeof value)
  return shape
}

function getMessage(messages, key) {
  return key.split('.').reduce((node, part) => (node == null ? MISSING : node[part]), messages)
}

test('every locale defines the same message keys and value types as English', async () => {
  const messagesByLocale = Object.fromEntries(
    await Promise.all(locales.map(async (locale) => [locale, await loadMessages(locale)]))
  )
  const englishShape = [...flattenMessages(messagesByLocale.en, '', new Map()).entries()].sort()

  for (const locale of locales.slice(1)) {
    const localeShape = [...flattenMessages(messagesByLocale[locale], '', new Map()).entries()].sort()
    assert.deepEqual(
      localeShape,
      englishShape,
      `${locale}.json should mirror en.json with the same keys and value types`
    )
  }
})

test('every t.raw(...) key in the source is a non-empty string array in every locale', async () => {
  const keysByFile = await rawStringArrayKeysByFile()
  const messagesByLocale = Object.fromEntries(
    await Promise.all(locales.map(async (locale) => [locale, await loadMessages(locale)]))
  )

  for (const [file, keys] of keysByFile) {
    for (const key of keys) {
      for (const locale of locales) {
        const value = getMessage(messagesByLocale[locale], key)
        assert.ok(
          value !== MISSING && Array.isArray(value) && value.length > 0 && value.every((item) => typeof item === 'string'),
          `${relative(process.cwd(), file)} uses t.raw("${key}"), but ${locale}.json does not define it as a non-empty string array`
        )
      }
    }
  }
})
