import { AxiosError } from 'axios'
import { CommanderStatic } from 'commander'
import { RunDatasource } from '../../lib/datasources/Run'
import { guaranteeLogged } from '../../lib/utils/authUtils'
import { Store } from '../../store'
import { Readable } from 'stream'
import { Waiter } from '../../lib/utils/CustomPromises'

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
