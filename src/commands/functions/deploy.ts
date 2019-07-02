import { CommanderStatic } from 'commander'
import { Pusher } from '../../lib/resources/HermesFunction/Pusher'

export const deployCommand = (program: CommanderStatic) => {
  program
    .command('deploy [dir]')
    .option('-u, --update', 'Update if function already exists')
    .action(async (dir, cmd) => {
      const fnDir = dir ? dir : process.cwd()
      const pusher = new Pusher(fnDir)
      await pusher.addToHermes(cmd.update != null, 'production')
    })
}
