import { RunDatasource } from '@hermes-serverless/cli-resources'
import { createFsReadStream } from '@hermes-serverless/fs-utils'
import chalk from 'chalk'
import fs from 'fs'
import inquirer from 'inquirer'
import { PassThrough } from 'stream'
import { guaranteeLogged } from '../../lib/utils/authUtils'
import { Store } from '../../store'

interface Arguments {
  sync?: boolean
  s?: boolean
  async?: boolean
  a?: boolean
  file?: string
  f?: string
}

const validateFormat = (fnID: string) => {
  const reg = /(.+)\/(.+):(.+)/
  if (!reg.test(fnID)) {
    console.error('Invalid functionID, use the format functionOwner/functionName:functionVersion')
    process.exit(1)
  }
  const [_, functionOwner, functionName, functionVersion] = reg.exec(fnID)
  return { functionOwner, functionName, functionVersion }
}

export default async (functionIdString: string, opts: Arguments) => {
  const file = opts.file || opts.f
  const sync = opts.sync || opts.s
  const async = opts.async || opts.a
  if ((sync && async) || !(sync || async)) {
    console.error('Please select sync or async')
    process.exit(1)
  }

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
    if (async) {
      const { input: stringInput } = await inquirer.prompt([
        {
          type: 'input',
          name: 'input',
          message: 'Input:',
        },
      ])
      input = stringInput
    } else {
      input = new PassThrough()
      process.stdin.pipe(input)
    }
  }

  if (sync) {
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
