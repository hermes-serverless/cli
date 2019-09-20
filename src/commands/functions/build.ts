import { Builder } from '@hermes-serverless/cli-resources'
import { CommanderStatic } from 'commander'
import { guaranteeLogged } from '../../lib/utils/authUtils'
import { getDockerhubUsername } from '../../lib/utils/functionUtils'

export const functionBuildCommand = (program: CommanderStatic) => {
  program.command('build [dir]').action(async (dir, cmd) => {
    const fnDir = dir ? dir : process.cwd()
    const builder = new Builder(fnDir, await guaranteeLogged(), await getDockerhubUsername(), {
      logger: console,
      outputToStdout: true,
    })

    await builder.buildFunction()
  })
}
