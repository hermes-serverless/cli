import { RunDatasource } from '@hermes-serverless/cli-resources'
import { CommanderStatic } from 'commander'
import { guaranteeLogged } from '../../lib/utils/authUtils'
import { Store } from '../../store'

export const runStatusCommand = (program: CommanderStatic) => {
  program.command('run-status <runID>').action(async (runID, cmd) => {
    const username = await guaranteeLogged()
    const status = await RunDatasource.getRunStatus(username, runID, Store.getToken(), [
      'stdout',
      'stderr',
    ])

    console.log(status)
  })
}
