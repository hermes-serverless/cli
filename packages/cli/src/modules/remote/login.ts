import { AuthDatasource } from '@hermes-serverless/cli-resources'
import inquirer from 'inquirer'
import { notEmpty } from '../../lib/utils/inquirerValidations'
import { Store } from '../../store/index'

interface PasswordPromptAns {
  password: string
}

export default async (username: string) => {
  let password: string
  const ans: PasswordPromptAns = await inquirer.prompt([
    {
      type: 'password',
      message: 'Password? ',
      name: 'password',
      validate: notEmpty("Password can't be empty"),
    },
  ])
  password = ans.password

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
}
