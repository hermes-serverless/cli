import { Store } from '../store/index'
import { AuthDatasource } from '../lib/datasources/Auth'
import fs from 'fs'
import inquirer from 'inquirer'
import { CommanderStatic } from 'commander'

interface PasswordPromptAns {
  password: string
}

const notEmpty = (str: string) => {
  if (!str) return "Password can't be empty"
  return true
}

export const loginCommand = (program: CommanderStatic) => {
  program
    .command('login <username>')
    .option('-p, --password-path <passwordPath>', 'Path to file containing the password')
    .action(async (username, cmd) => {
      let password: string
      if (!cmd.passwordPath) {
        const ans: PasswordPromptAns = await inquirer.prompt([
          {
            type: 'password',
            message: 'Password? ',
            name: 'password',
            validate: notEmpty,
          },
        ])
        password = ans.password
      } else {
        try {
          password = fs.readFileSync(cmd.passwordPath, { encoding: 'utf-8' })
        } catch (err) {
          console.log(err)
          process.exit(1)
        }
      }

      try {
        const authObj = await AuthDatasource.login({
          username,
          password,
        })

        console.log(authObj)
        if (authObj.auth) Store.addToken(authObj.token)
      } catch (err) {
        if (err.response && err.response.data) console.log(err.response.data)
        else console.log(err)
        process.exit(1)
      }
    })
}
