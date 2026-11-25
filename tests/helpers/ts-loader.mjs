// Minimal Node module hooks so node:test can import app TypeScript on the CI
// Node 20 toolchain: maps the "@/..." alias onto src/ and strips types with the
// project's own TypeScript compiler (no type checking; `npm run type-check` does that).
import { readFile } from 'node:fs/promises'
import ts from 'typescript'

const srcDirectory = new URL('../../src/', import.meta.url)

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('@/')) {
    return nextResolve(new URL(`${specifier.slice(2)}.ts`, srcDirectory).href, context)
  }
  return nextResolve(specifier, context)
}

export async function load(url, context, nextLoad) {
  if (!url.endsWith('.ts')) {
    return nextLoad(url, context)
  }
  const source = await readFile(new URL(url), 'utf8')
  const { outputText } = ts.transpileModule(source, {
    fileName: url,
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  })
  return { format: 'module', source: outputText, shortCircuit: true }
}
