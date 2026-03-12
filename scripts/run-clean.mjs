import { spawn } from "node:child_process"
import { rm } from "node:fs/promises"

const args = process.argv.slice(2)
const command = args.join(" ").trim()

const suppressedPatterns = [
  "[baseline-browser-mapping] The data in this module is over two months old.",
]

const cleanTargets = [
  ".next",
  "output",
  "tsconfig.tsbuildinfo",
  "api/__pycache__",
  "fastapi_backend/__pycache__",
]

function shouldPreclean(input) {
  return /\bnext\s+(dev|build)\b/.test(input)
}

async function removeBuildArtifacts() {
  await Promise.all(
    cleanTargets.map((target) =>
      rm(target, {
        force: true,
        recursive: true,
      })
    )
  )
}

function forwardStream(stream, writer) {
  let buffer = ""

  stream.on("data", (chunk) => {
    buffer += chunk.toString()

    let newlineIndex = buffer.indexOf("\n")
    while (newlineIndex !== -1) {
      const line = buffer.slice(0, newlineIndex + 1)
      buffer = buffer.slice(newlineIndex + 1)

      if (!suppressedPatterns.some((pattern) => line.includes(pattern))) {
        writer.write(line)
      }

      newlineIndex = buffer.indexOf("\n")
    }
  })

  stream.on("end", () => {
    if (buffer && !suppressedPatterns.some((pattern) => buffer.includes(pattern))) {
      writer.write(buffer)
    }
  })
}

if (args.includes("--clean-only")) {
  await removeBuildArtifacts()
  process.exit(0)
}

if (!command) {
  console.error('Usage: node scripts/run-clean.mjs "<command>"')
  process.exit(1)
}

if (shouldPreclean(command)) {
  await removeBuildArtifacts()
}

const child = spawn(command, {
  env: process.env,
  shell: true,
  stdio: ["inherit", "pipe", "pipe"],
})

forwardStream(child.stdout, process.stdout)
forwardStream(child.stderr, process.stderr)

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }

  process.exit(code ?? 1)
})
