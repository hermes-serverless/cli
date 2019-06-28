#!/usr/bin/env node
import program from 'commander'
import projectPackage from '../package.json'
import { commandLoader } from './commands'

program.version(projectPackage.version)
const commands = commandLoader(program)

program.parse(process.argv)
