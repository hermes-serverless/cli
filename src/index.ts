#!/usr/bin/env node
import chalk from 'chalk'
import program from 'commander'
import { commandLoader } from './commands'

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
