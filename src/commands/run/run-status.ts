import { CommanderStatic } from 'commander'
import { Readable } from 'stream'
import { RunDatasource } from '../../lib/datasources/Run'
import { guaranteeLogged } from '../../lib/utils/authUtils'
import { Waiter } from '../../lib/utils/CustomPromises'
import { Store } from '../../store'

export const runStatusCommand = (program: CommanderStatic) => {
  program.command('run-status <runID>').action(async (runID, cmd) => {
    const username = await guaranteeLogged()
    try {
      const statusStream = await RunDatasource.getRunStatus(username, runID, Store.getToken())
      statusStream.pipe(process.stdout)
    } catch (err) {
      const done = new Waiter()
      ;(err.response.data as Readable).on('close', () => {
        console.log('')
        done.resolve()
      })

      err.response.data.pipe(process.stdout)
      await done.finish()
    }
  })
}
