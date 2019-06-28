import { CommanderStatic } from 'commander'
import { Builder } from '../../lib/resources/HermesFunction/Builder'

export const functionBuildCommand = (program: CommanderStatic) => {
  program.command('build [dir]').action(async (dir, cmd) => {
    const fnDir = dir ? dir : process.cwd()
    const builder = new Builder(fnDir)
    await builder.buildFunction()
  })
}
