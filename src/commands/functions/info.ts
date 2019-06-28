import { printFnTable } from './../../lib/utils/functionUtils'
import { HermesFunctionDatasource } from './../../lib/datasources/HermesFunction'
import { CommanderStatic } from 'commander'
import { isLogged } from '../../lib/utils/authUtils'
import { Store } from '../../store'
import { AxiosError } from 'axios'

export const infoCommand = (program: CommanderStatic) => {
  program
    .command('info <functionName> [functionVersion]')
    .action(async (functionName, functionVersion, cmd) => {
      const { username } = await isLogged()
      try {
        const { functions } = await HermesFunctionDatasource.getFunction(
          username,
          { functionName, functionVersion },
          Store.getToken()
        )

        printFnTable(functions)
      } catch (err) {
        const axiosErr: AxiosError = err
        console.log(axiosErr.response.data)
        process.exit(1)
      }
    })
}