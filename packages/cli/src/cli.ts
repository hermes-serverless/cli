#! /usr/bin/env node
import { Environment } from '@hermes-serverless/cli-resources'
import { join } from 'path'
import tree from './modules/tree'
import { Store } from './store'
const { find, run } = require('findhelp')

Environment.baseURL = Store.getBaseUrl()

const timeSpent = (spent: [number, number]) => {
  const ms = spent[0] * 1000 + Math.round(spent[1] / 1e6)
  const sec = Math.floor(ms / 1000)
  return `${sec}.${ms - sec * 1000} seconds`
}

const main = async () => {
  const args = process.argv.slice(2)
  const command = await find(tree, args)
  const startTime = process.hrtime()
  await run.call(tree, command, join(__dirname, 'modules'))
  process.stderr.write(timeSpent(process.hrtime(startTime)))
}

main().catch(err => {
  console.error(err)
})
