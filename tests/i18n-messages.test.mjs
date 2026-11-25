import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const locales = ['en', 'hi', 'mr']

// Pages consume these with `t.raw(key) as string[]` and map over them right away,
// so a missing key or a scalar value in any locale breaks the rendered page.
const rawStringArrayKeys = [
  'home.strengths',
  'projects.p1.tags',
  'projects.p2.tags',
  'projects.p3.tags',
  'skills.marketAnalysis.items',
  'skills.energyTech.items',
  'skills.dataTools.items',
  'skills.technical.items',
  'experience.analyst.highlights',
  'experience.analyst.skills',
  'experience.intern.highlights',
  'experience.intern.skills',
  'experience.dataAnalyst.highlights',
  'experience.dataAnalyst.skills',
  'experience.teacher.highlights',
  'experience.teacher.skills',
]

async function loadMessages(locale) {
  const raw = await readFile(new URL(`../src/i18n/messages/${locale}.json`, import.meta.url), 'utf8')
  return JSON.parse(raw)
}

function flattenMessages(value, prefix, shape) {
  if (Array.isArray(value)) {
    shape.set(prefix, value.every((item) => typeof item === 'string') ? 'string[]' : 'array')
    return shape
  }

  if (value !== null && typeof value === 'object') {
    for (const [key, nested] of Object.entries(value)) {
      flattenMessages(nested, prefix ? `${prefix}.${key}` : key, shape)
    }
    return shape
  }

  shape.set(prefix, typeof value)
  return shape
}

function getMessage(messages, key) {
  return key.split('.').reduce((node, part) => (node == null ? node : node[part]), messages)
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
      `${locale}.json should mirror en.json with the same keys and value types`,
    )
  }
})

test('keys consumed via t.raw() as string[] are non-empty string arrays in every locale', async () => {
  for (const locale of locales) {
    const messages = await loadMessages(locale)

    for (const key of rawStringArrayKeys) {
      const value = getMessage(messages, key)
      assert.ok(
        Array.isArray(value) && value.length > 0 && value.every((item) => typeof item === 'string'),
        `${locale}.json should define ${key} as a non-empty string array`,
      )
    }
  }
})
