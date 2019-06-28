import { isLogged } from './../lib/utils/authUtils'
import { CommanderStatic } from 'commander'
import chalk from 'chalk'

export const meCommand = (program: CommanderStatic) => {
  program.command('me').action(async cmd => {
    const { state, username } = await isLogged()
    if (state === 'Logged') {
      console.log(`You're ` + chalk.green(`${username}`))
    } else if (state === 'NotLogged') {
      console.log(chalk.bold('You are not logged in!'))
    } else if (state === 'TokenExpired') {
      console.log(chalk.bold('Your token expired'))
    }
  })
}
