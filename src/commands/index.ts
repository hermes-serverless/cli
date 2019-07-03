import { CommanderStatic } from 'commander'
import { configCommand } from './config'
import { functionBuildCommand } from './functions/build'
import { deleteCommand } from './functions/delete'
import { deployCommand } from './functions/deploy'
import { infoCommand } from './functions/info'
import { initCommand } from './functions/init'
import { listCommand } from './functions/list'
import { loginCommand } from './login'
import { logoutCommand } from './logout'
import { meCommand } from './me'
import { registerCommand } from './register'
import { functionRunListCommand } from './run/function-runs'
import { runCommand } from './run/run'
import { runStatusCommand } from './run/run-status'
import { runListCommand } from './run/runs'
import { unregisterCommand } from './unregister'

export interface CommandsObject {
  [command: string]: any
}

interface CommandProto {
  name: string
  creator: Function
}

const commandsToCreate: CommandProto[] = [
  { name: 'register', creator: registerCommand },
  { name: 'unregister', creator: unregisterCommand },
  { name: 'login', creator: loginCommand },
  { name: 'logout', creator: logoutCommand },
  { name: 'me', creator: meCommand },
  { name: 'config', creator: configCommand },

  { name: 'init', creator: initCommand },
  { name: 'build', creator: functionBuildCommand },
  { name: 'deploy', creator: deployCommand },
  { name: 'delete', creator: deleteCommand },
  { name: 'info', creator: infoCommand },
  { name: 'list', creator: listCommand },

  { name: 'run', creator: runCommand },
  { name: 'function-runs', creator: functionRunListCommand },
  { name: 'runs', creator: runListCommand },
  { name: 'run-status', creator: runStatusCommand },
]

export const commandLoader = (program: CommanderStatic) => {
  const commands: CommandsObject = {}
  commandsToCreate.forEach(commandProto => {
    commands[commandProto.name] = commandProto.creator(program)
  })

  return commands
}
