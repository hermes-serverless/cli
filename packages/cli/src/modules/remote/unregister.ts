import { AuthDatasource, UserDatasource } from '@hermes-serverless/cli-resources'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { isLogged } from '../../lib/utils/authUtils'
import { Store } from '../../store/index'

export default async () => {
  const { state, username: loggedUsername } = await isLogged()

  if (state !== 'Logged') {
    console.log(chalk.bold('You have to be logged in'))
    return
  }

  const { username } = await inquirer.prompt([
    {
      message: 'Type your username to delete: ',
      name: 'username',
    },
  ])

  if (loggedUsername !== username) {
    console.log(
      chalk.bold(
        `You can't delete ${chalk.red(username)} since you're ${chalk.red(loggedUsername)}`
      )
    )
    return
  }

  const { password } = await inquirer.prompt([
    {
      type: 'password',
      message: 'Type your password: ',
      name: 'password',
    },
  ])

  try {
    const authObj = await AuthDatasource.login({
      username,
      password,
    })

    const { deletedUser } = await UserDatasource.deleteUser(username, authObj.token)
    console.log(chalk.bold(`Deleted user: ${chalk.red(deletedUser.username)}`))
    Store.addToken('')
  } catch (err) {
    if (err.response && err.response.data) console.log(err.response.data)
    else console.log(err)
    process.exit(1)
  }
}
