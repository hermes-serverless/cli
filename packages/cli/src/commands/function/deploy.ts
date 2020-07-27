import { Pusher } from '@hermes-serverless/cli-resources'
import { flags as oclifFlags } from '@oclif/command'
import { guaranteeLogged } from '../../lib/utils/authUtils'
import { getDockerhubUsername } from '../../lib/utils/functionUtils'
import { CustomCommand } from '../../oclif/CustomCommand'
import { Store } from '../../store'
import { printFnTable } from './../../lib/utils/functionUtils'

export default class FunctionDeploy extends CustomCommand {
  static description =
    'Deploy a function to remote. Should be run in the directory in which the hermes-function source code is located'

  static flags = {
    ...CustomCommand.globalFlags,
    update: oclifFlags.boolean({
      char: 'u',
      description: 'Update if hermes-function already exists',
      default: false,
    }),
  }
  async run() {
    const {
      flags: { update },
    } = this.parse(FunctionDeploy)
    const fnDir = process.cwd()
    const pusher = new Pusher(fnDir, await guaranteeLogged(), await getDockerhubUsername(), {
      logger: console,
      outputToStdout: true,
    })

    const fn = await pusher.addToHermes(update, Store.getToken(), 'production')
    printFnTable(fn)
  }
}
