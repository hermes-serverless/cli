#!/usr/bin/env node
import { Environment } from '@hermes-serverless/cli-resources'
import chalk from 'chalk'
import program from 'commander'
import { commandLoader } from './commands'
import { Store } from './store'

Environment.baseURL = Store.getBaseUrl()

program.version('0.0.2')
const commands = commandLoader(program)

program.on('command:*', () => {
  console.error(`${chalk.bold.red('Invalid command: ')} ${program.args.join(' ')}\n`)
  program.help()
  process.exit(1)
})

program.parse(process.argv)

if (program.args.length === 0) {
  program.help()
  process.exit(1)
}
