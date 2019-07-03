import chalk from 'chalk'
import { CommanderStatic } from 'commander'
import { isLogged } from '../lib/utils/authUtils'
import { Store } from './../store/index'

export const logoutCommand = (program: CommanderStatic) => {
  program.command('logout').action(async cmd => {
    const { state, username } = await isLogged()
    if (state === 'Logged') {
      Store.addToken('')
      console.log(`You logged out from ${chalk.green(username)}`)
    } else if (state === 'TokenExpired') {
      console.log(chalk.bold("Your token expired. You're logged out now"))
    } else if (state === 'NotLogged') {
      console.log(chalk.bold('You are not logged in!'))
    }
  })
}
