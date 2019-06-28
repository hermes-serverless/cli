import chalk from 'chalk'
import { CommanderStatic } from 'commander'
import fs from 'fs'
import inquirer from 'inquirer'
import { RunDatasource } from '../../lib/datasources/Run'
import { guaranteeLogged } from '../../lib/utils/authUtils'
import { Store } from '../../store'
import { Waiter } from './../../lib/utils/CustomPromises'

export const runCommand = (program: CommanderStatic) => {
  program
    .command('run <functionOwner/fName:fVersion>')
    .option('-f, --file <filePath>', 'Specify a input file')
    .action(async (functionInfo, cmd) => {
      const username = await guaranteeLogged()
      const [functionOwner, encodedFName] = functionInfo.split('/')
      const [functionName, functionVersion] = encodedFName.split(':')

      let input
      if (cmd.file) {
        if (!fs.existsSync(cmd.file)) {
          console.log(chalk.bold.red(`File ${cmd.file} doesn't exists`))
          return process.exit(1)
        }

        if (!fs.lstatSync(cmd.file).isFile()) {
          console.log(chalk.bold.red(`Path ${cmd.file} is not a file`))
          return process.exit(1)
        }

        const readyWaiter = new Waiter()
        const readStream = fs.createReadStream(cmd.file, { encoding: 'utf-8' })

        readStream.on('open', () => {
          readyWaiter.resolve()
        })
        readStream.on('error', err => {
          readyWaiter.reject()
        })

        await readyWaiter.finish()
        input = readStream
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

      const functionID = {
        functionOwner,
        functionName,
        functionVersion,
      }

      const ret = await RunDatasource.createFunctionRun(
        username,
        functionID,
        input,
        Store.getToken()
      )

      console.log(ret)
    })
}
