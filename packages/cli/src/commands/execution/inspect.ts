import { RunDatasource } from '@hermes-serverless/cli-resources'
import { flags as oclifFlags } from '@oclif/command'
import { guaranteeLogged } from '../../lib/utils/authUtils'
import { CustomCommand } from '../../oclif/CustomCommand'
import { Store } from '../../store'

export default class ExecutionInspect extends CustomCommand {
  static description = 'Get info on an execution'

  static examples = ['hermes execution:inspect 15', 'hermes execution:inspect 15 --result']

  static flags = {
    ...CustomCommand.globalFlags,
    result: oclifFlags.boolean({
      char: 'r',
      description: 'Show only the result output',
      default: false,
    }),
  }
  static args = [{ name: 'runID', required: true }]

  async run() {
    const {
      flags: { result },
      args: { runID },
    } = this.parse(ExecutionInspect)

    const onlyResult = result
    const username = await guaranteeLogged()
    const status = await RunDatasource.getRunStatus(username, runID, Store.getToken(), [
      'out',
      'err',
    ])

    if (status.out == null) {
      const res = await RunDatasource.getRunResultOutput(username, runID, Store.getToken())
      status.out = res
    }
    if (onlyResult) {
      console.log(status.out)
    } else console.log(status)
  }
}
