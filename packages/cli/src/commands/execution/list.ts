import { RunDatasource } from '@hermes-serverless/cli-resources'
import { flags as oclifFlags } from '@oclif/command'
import { guaranteeLogged } from '../../lib/utils/authUtils'
import { CustomCommand } from '../../oclif/CustomCommand'
import { Store } from '../../store'
import { printRunTable } from './../../lib/utils/runUtils'

export default class ExecutionList extends CustomCommand {
  static description = 'List your executions'

  static examples = ['hermes execution:list', 'hermes execution:list --json']

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
    const {
      flags: { json },
    } = this.parse(ExecutionList)
    const username = await guaranteeLogged()
    const { runs } = await RunDatasource.getRuns(username, {}, Store.getToken())
    json ? console.log(JSON.stringify(runs)) : printRunTable(runs)
  }
}
