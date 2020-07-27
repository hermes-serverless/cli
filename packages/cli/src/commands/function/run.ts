import { RunDatasource } from '@hermes-serverless/cli-resources'
import { createFsReadStream } from '@hermes-serverless/fs-utils'
import { flags as oclifFlags } from '@oclif/command'
import chalk from 'chalk'
import fs from 'fs'
import inquirer from 'inquirer'
import { guaranteeLogged } from '../../lib/utils/authUtils'
import { CustomCommand } from '../../oclif/CustomCommand'
import { Store } from '../../store'

const validateFormat = (fnID: string) => {
  const reg = /(.+)\/(.+):(.+)/
  if (!reg.test(fnID)) {
    console.error('Invalid functionID, use the format functionOwner/functionName:functionVersion')
    process.exit(1)
  }
  const [_, functionOwner, functionName, functionVersion] = reg.exec(fnID)
  return { functionOwner, functionName, functionVersion }
}

export default class FunctionRun extends CustomCommand {
  static description = 'Start a hermes-function execution'

  static examples = [
    'hermes function:run username/function-name:1.0.0',
    'hermes function:run username/function-name:1.0.0 --async',
    'hermes function:run username/function-name:1.0.0 --sync',
    'hermes function:run username/function-name:1.0.0 --file ./path/to/input',
  ]

  static flags = {
    ...CustomCommand.globalFlags,
    async: oclifFlags.boolean({
      char: 'a',
      description: 'Run hermes-function asynchronously',
      default: false,
    }),
    file: oclifFlags.string({
      char: 'f',
      description: 'Path to an input file',
    }),
  }

  static args = [{ name: 'functionId', require: true }]
  async run() {
    const {
      flags: { async, file },
      args: { functionId: functionIdString },
    } = this.parse(FunctionRun)

    const username = await guaranteeLogged()
    const functionID = validateFormat(functionIdString)

    let input
    if (file) {
      if (!fs.existsSync(file)) {
        console.log(chalk.bold.red(`File ${file} doesn't exists`))
        return process.exit(1)
      }

      if (!fs.lstatSync(file).isFile()) {
        console.log(chalk.bold.red(`Path ${file} is not a file`))
        return process.exit(1)
      }

      input = await createFsReadStream(file, { encoding: 'utf-8' })
    } else {
      const { input: stringInput } = await inquirer.prompt([
        {
          type: 'input',
          name: 'input',
          message: 'Input:',
        },
      ])
      input = stringInput
    }

    if (!async) {
      const outStream = await RunDatasource.createSyncRun(
        username,
        functionID,
        input,
        Store.getToken()
      )

      outStream.pipe(process.stdout)
    } else {
      const ret = await RunDatasource.createAsyncRun(username, functionID, input, Store.getToken())
      console.log(ret)
    }
  }
}
