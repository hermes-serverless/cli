#!/usr/bin/env node
import chalk from 'chalk'
import program from 'commander'
import projectPackage from '../package.json'
import { commandLoader } from './commands'

program.version(projectPackage.version)
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
