import { RunDatasource } from '@hermes-serverless/cli-resources'
import { CommanderStatic } from 'commander'
import { guaranteeLogged } from '../../lib/utils/authUtils'
import { Store } from '../../store'
import { printRunTable } from './../../lib/utils/runUtils'

export const functionRunListCommand = (program: CommanderStatic) => {
  program
    .command('function-runs <functionOwner> [functionName] [functionVersion]')
    .action(async (functionOwner, functionName, functionVersion, cmd) => {
      const username = await guaranteeLogged()
      const { runs } = await RunDatasource.getFunctionRuns(
        username,
        { functionOwner, functionName, functionVersion },
        Store.getToken()
      )

      printRunTable(runs)
    })
}
