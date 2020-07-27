import { HermesFunctionDatasource } from '@hermes-serverless/cli-resources'
import chalk from 'chalk'
import { isLogged } from '../../lib/utils/authUtils'
import { CustomCommand } from '../../oclif/CustomCommand'
import { Store } from '../../store'
import { printFnTable } from './../../lib/utils/functionUtils'

export default class FunctionDelete extends CustomCommand {
  static description = 'Delete a function from remote'

  static examples = ['hermes function:delete gpu-pi-montecarlo 1.0.0']

  static flags = {
    ...CustomCommand.globalFlags,
  }
  static args = [
    { name: 'functionName', require: true },
    { name: 'functionVersion', require: true },
  ]

  async run() {
    const {
      args: { functionName, functionVersion },
    } = this.parse(FunctionDelete)

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
        printFnTable(deletedFunctions)
      }
    } catch (err) {
      const axiosErr = err
      console.log(axiosErr.response.data)
      process.exit(1)
    }
  }
}
