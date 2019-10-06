import chalk from 'chalk'
import { isLogged } from '../../lib/utils/authUtils'

export default async () => {
  const { state, username } = await isLogged()
  if (state === 'Logged') {
    console.log(`You're ` + chalk.green(`${username}`))
  } else if (state === 'NotLogged') {
    console.log(chalk.bold('You are not logged in!'))
  } else if (state === 'TokenExpired') {
    console.log(chalk.bold('Your token expired'))
  }
}
