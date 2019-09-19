import { HermesFunctionDatasource } from '@hermes-serverless/cli-resources'
import { AxiosError } from 'axios'
import chalk from 'chalk'
import { CommanderStatic } from 'commander'
import { isLogged } from '../../lib/utils/authUtils'
import { Store } from '../../store'
import { printFnTable } from './../../lib/utils/functionUtils'

export const deleteCommand = (program: CommanderStatic) => {
  program
    .command('delete <functionName> [functionVersion]')
    .action(async (functionName, functionVersion, cmd) => {
      const { username } = await isLogged()
      try {
        const { deletedFunctions } = await HermesFunctionDatasource.deleteFunction(
          username,
          { functionName, functionVersion },
          Store.getToken()
        )

        if (deletedFunctions.length === 0) {
          console.log(chalk.bold(`-> No functions deleted`))
        } else {
          console.log(chalk.bold(`==== DELETED FUNCTIONS ====`))
          // @ts-ignore
          printFnTable(deletedFunctions)
        }
      } catch (err) {
        const axiosErr: AxiosError = err
        console.log(axiosErr.response.data)
        process.exit(1)
      }
    })
}
