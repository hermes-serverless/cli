import { HermesFunctionDatasource } from '@hermes-serverless/cli-resources'
import chalk from 'chalk'
import { isLogged } from '../../lib/utils/authUtils'
import { Store } from '../../store'
import { printFnTable } from './../../lib/utils/functionUtils'

export default async (functionName: string, functionVersion: string) => {
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
    const axiosErr = err
    console.log(axiosErr.response.data)
    process.exit(1)
  }
}
