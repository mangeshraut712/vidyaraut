import assert from 'node:assert/strict'
import { register } from 'node:module'
import test from 'node:test'

register('./helpers/ts-loader.mjs', import.meta.url)

const { assistantAgentMap, isAssistantAgentId } = await import('../src/lib/assistant-agents.ts')

test('isAssistantAgentId accepts every declared agent id', () => {
  for (const agentId of Object.keys(assistantAgentMap)) {
    assert.equal(isAssistantAgentId(agentId), true, `"${agentId}" is a declared agent id`)
  }
})

test('isAssistantAgentId rejects Object.prototype member names and near misses', () => {
  // chat-route.ts trusts this guard for the client-supplied `agent` field.
  for (const name of ['constructor', 'toString', 'hasOwnProperty', 'valueOf', '__proto__', 'Portfolio', '']) {
    assert.equal(isAssistantAgentId(name), false, `"${name}" must not pass the agent allow-list`)
  }
})
