import { RunDatasource } from '@hermes-serverless/cli-resources'
import { CommanderStatic } from 'commander'
import { guaranteeLogged } from '../../lib/utils/authUtils'
import { Store } from '../../store'

export const runStatusCommand = (program: CommanderStatic) => {
  program
    .command('run-status <runID>')
    .option('-r, --result', 'Only run output')
    .action(async (runID, cmd) => {
      const username = await guaranteeLogged()
      let status = await RunDatasource.getRunStatus(username, runID, Store.getToken(), [
        'err',
        'out',
      ])

      if (status.out == null) {
        const res = await RunDatasource.getRunResultOutput(username, runID, Store.getToken())
        status.out = res
      }
      if (cmd.result) {
        console.log(status.out)
      } else console.log(status)
    })
}
