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

const appDir = fileURLToPath(new URL('../src/app/', import.meta.url))

// `useTranslations("ns")` scopes `t`, so `t.raw("a.b")` inside it refers to the
// full key `ns.a.b`. With no namespace the literal is already the full key.
function rawStringArrayKeysIn(source) {
  const namespace = source.match(/useTranslations\(\s*['"]([^'"]+)['"]\s*\)/)?.[1]
  const keys = new Set()
  for (const match of source.matchAll(/\braw\(\s*['"]([^'"]+)['"]\s*\)\s+as\s+string\[\]/g)) {
    keys.add(namespace ? `${namespace}.${match[1]}` : match[1])
  }
  return keys
}

async function rawStringArrayKeysUsedInSource() {
  const files = await listSourceFiles(appDir)
  const sources = await Promise.all(files.filter((f) => /\.tsx$/.test(f)).map((f) => readFile(f, 'utf8')))
  const keys = new Set()
  for (const source of sources) {
    for (const key of rawStringArrayKeysIn(source)) keys.add(key)
  }
  assert.ok(keys.size > 0, 'expected at least one t.raw(...) as string[] call in src/app')
  return keys
}

async function loadMessages(locale) {
  const raw = await readFile(new URL(`../src/i18n/messages/${locale}.json`, import.meta.url), 'utf8')
  return JSON.parse(raw)
}

// Records the value type at every key path. Arrays are described by their
// element shape so that a change from `string[]` to `object[]`, or a change in
// the keys of those objects, is a visible difference rather than both "array".
function describeArray(items) {
  if (items.length === 0) return '[]'
  if (items.every((item) => typeof item === 'string')) return 'string[]'
  if (items.every((item) => item !== null && typeof item === 'object' && !Array.isArray(item))) {
    const shapes = new Set(items.map((item) => describeShape(item, new Set())))
    return `object[]{${[...shapes].sort().join(',')}}`
  }
  return 'array'
}

function describeShape(value, seen) {
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

test('keys consumed via t.raw() as string[] are non-empty string arrays in every locale', async () => {
  const keys = [...(await rawStringArrayKeysUsedInSource())].sort()
  const messagesByLocale = Object.fromEntries(
    await Promise.all(locales.map(async (locale) => [locale, await loadMessages(locale)]))
  )

  for (const locale of locales) {
    for (const key of keys) {
      const value = getMessage(messagesByLocale[locale], key)
      assert.ok(
        value !== MISSING && Array.isArray(value) && value.length > 0 && value.every((item) => typeof item === 'string'),
        `${locale}.json should define ${key} (used as t.raw(...) as string[]) as a non-empty string array`
      )
    }
  }
})

test('the source and the catalogs agree on which keys exist', async () => {
  // Guards the extraction itself: if namespace resolution ever breaks, this is
  // where it shows up, instead of the previous test silently checking nothing.
  const files = (await listSourceFiles(appDir)).filter((f) => /\.tsx$/.test(f))
  const english = await loadMessages('en')
  for (const file of files) {
    const source = await readFile(file, 'utf8')
    for (const key of rawStringArrayKeysIn(source)) {
      assert.ok(
        getMessage(english, key) !== MISSING,
        `${relative(process.cwd(), file)} uses t.raw("${key}"), which en.json does not define`
      )
    }
  }
})
