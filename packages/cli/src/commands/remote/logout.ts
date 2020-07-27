import chalk from 'chalk'
import { isLogged } from '../../lib/utils/authUtils'
import { CustomCommand } from '../../oclif/CustomCommand'
import { Store } from '../../store'

export default class Logout extends CustomCommand {
  static description = 'Logout from a remote Hermes server'

  static flags = {
    ...CustomCommand.globalFlags,
  }
  async run() {
    this.parse(Logout)
    const { state, username } = await isLogged()
    if (state === 'Logged') {
      Store.addToken('')
      console.log(`You logged out from ${chalk.green(username)}`)
    } else if (state === 'TokenExpired') {
      console.log(chalk.bold("Your token expired. You're logged out now"))
    } else if (state === 'NotLogged') {
      console.log(chalk.bold('You are not logged in!'))
    }
  }
}
