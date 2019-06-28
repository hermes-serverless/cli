import { listCommand } from './functions/list'
import { deployCommand } from './functions/deploy'
import { unregisterCommand } from './unregister'
import { loginCommand } from './login'
import { registerCommand } from './register'
import { meCommand } from './me'
import { logoutCommand } from './logout'
import { CommanderStatic } from 'commander'
import { initCommand } from './functions/init'
import { functionBuildCommand } from './functions/build'
import { configCommand } from './config'
import { infoCommand } from './functions/info'
import { deleteCommand } from './functions/delete'
import { runCommand } from './run/run'
import { functionRunListCommand } from './run/function-runs'
import { runListCommand } from './run/runs'

export interface CommandsObject {
  [command: string]: any
}

interface CommandProto {
  name: string
  creator: Function
}

const commandsToCreate: CommandProto[] = [
  { name: 'build', creator: functionBuildCommand },
  { name: 'config', creator: configCommand },
  { name: 'delete', creator: deleteCommand },
  { name: 'deploy', creator: deployCommand },
  { name: 'function-runs', creator: functionRunListCommand },
  { name: 'info', creator: infoCommand },
  { name: 'init', creator: initCommand },
  { name: 'list', creator: listCommand },
  { name: 'login', creator: loginCommand },
  { name: 'logout', creator: logoutCommand },
  { name: 'me', creator: meCommand },
  { name: 'register', creator: registerCommand },
  { name: 'run', creator: runCommand },
  { name: 'runs', creator: runListCommand },
  { name: 'unregister', creator: unregisterCommand },
]

export const commandLoader = (program: CommanderStatic) => {
  const commands: CommandsObject = {}
  commandsToCreate.forEach(commandProto => {
    commands[commandProto.name] = commandProto.creator(program)
  })

  return commands
}
