import chalk from 'chalk'
import { isLogged } from '../../lib/utils/authUtils'
import { CustomCommand } from '../../oclif/CustomCommand'
export default class Whoami extends CustomCommand {
  static description = `Check your login credentials`

  static flags = {
    ...CustomCommand.globalFlags,
  }
  async run() {
    this.parse(Whoami)

    const { state, username } = await isLogged()
    if (state === 'Logged') {
      console.log(`You're ` + chalk.green(`${username}`))
    } else if (state === 'NotLogged') {
      console.log(chalk.bold('You are not logged in!'))
    } else if (state === 'TokenExpired') {
      console.log(chalk.bold('Your token expired'))
    }
  }
}
