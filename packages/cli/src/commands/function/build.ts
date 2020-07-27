import { Builder } from '@hermes-serverless/cli-resources'
import { flags as oclifFlags } from '@oclif/command'
import { guaranteeLogged } from '../../lib/utils/authUtils'
import { getDockerhubUsername } from '../../lib/utils/functionUtils'
import { CustomCommand } from '../../oclif/CustomCommand'

export default class FunctionBuild extends CustomCommand {
  static description =
    'Build a hermes-function locally. Should be run in the directory in which the hermes-function source code is located'

  static flags = {
    ...CustomCommand.globalFlags,
    json: oclifFlags.boolean({
      char: 'j',
      description: 'Output data as json',
      default: false,
    }),
  }
  static args = []

  async run() {
    this.parse(FunctionBuild)
    const fnDir = process.cwd()
    const builder = new Builder(fnDir, await guaranteeLogged(), await getDockerhubUsername(), {
      logger: console,
      outputToStdout: true,
    })

    await builder.buildFunction()
  }
}
