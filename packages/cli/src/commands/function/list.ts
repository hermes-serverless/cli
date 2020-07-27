import { HermesFunctionDatasource } from '@hermes-serverless/cli-resources'
import { flags as oclifFlags } from '@oclif/command'
import { inspect } from 'util'
import { guaranteeLogged } from '../../lib/utils/authUtils'
import { CustomCommand } from '../../oclif/CustomCommand'
import { Store } from '../../store'
import { printFnTable } from './../../lib/utils/functionUtils'

export default class FunctionList extends CustomCommand {
  static description = 'List your hermes-functions registered on remote'

  static examples = ['hermes function:list', 'hermes function:list --json']

  static flags = {
    ...CustomCommand.globalFlags,
    json: oclifFlags.boolean({
      char: 'j',
      description: 'Output data as json',
      default: false,
    }),
  }
  async run() {
    const {
      flags: { json },
    } = this.parse(FunctionList)
    const pretty = !json
    const username = await guaranteeLogged()
    const { functions: fnArr } = await HermesFunctionDatasource.getFunction(
      username,
      {},
      Store.getToken()
    )

    if (pretty) {
      printFnTable(fnArr)
    } else console.log(fnArr.map((fn) => inspect(fn)).join('\n\n'))
  }
}
