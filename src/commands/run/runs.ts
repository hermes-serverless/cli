import { RunDatasource } from '@hermes-serverless/cli-resources'
import { CommanderStatic } from 'commander'
import { guaranteeLogged } from '../../lib/utils/authUtils'
import { Store } from '../../store'
import { printRunTable } from './../../lib/utils/runUtils'

export const runListCommand = (program: CommanderStatic) => {
  program.command('runs [runId]').action(async (runId, cmd) => {
    const username = await guaranteeLogged()
    const { runs } = await RunDatasource.getRuns(username, { id: runId }, Store.getToken())
    printRunTable(runs)
  })
}
