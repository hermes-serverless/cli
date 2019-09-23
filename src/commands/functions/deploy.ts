import { Pusher } from '@hermes-serverless/cli-resources'
import { CommanderStatic } from 'commander'
import { guaranteeLogged } from '../../lib/utils/authUtils'
import { getDockerhubUsername, printFnTable } from '../../lib/utils/functionUtils'
import { Store } from '../../store'

export const deployCommand = (program: CommanderStatic) => {
  program
    .command('deploy [dir]')
    .option('-u, --update', 'Update if function already exists')
    .action(async (dir, cmd) => {
      const fnDir = dir ? dir : process.cwd()
      const pusher = new Pusher(fnDir, await guaranteeLogged(), await getDockerhubUsername(), {
        logger: console,
        outputToStdout: true,
      })

      const fn = await pusher.addToHermes(cmd.update != null, Store.getToken(), 'production')
      printFnTable(fn)
    })
}
