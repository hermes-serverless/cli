import { CommanderStatic } from 'commander'
import { loginCommand } from './login'
import { registerCommand } from './register'
import { meCommand } from './me'
import { logoutCommand } from './logout'

export interface CommandsObject {
  [command: string]: any
}

interface CommandProto {
  name: string
  creator: Function
}

const commandsToCreate: CommandProto[] = [
  { name: 'register', creator: registerCommand },
  { name: 'login', creator: loginCommand },
  { name: 'logout', creator: logoutCommand },
  { name: 'me', creator: meCommand },
]

export const commandLoader = (program: CommanderStatic) => {
  const commands: CommandsObject = {}
  commandsToCreate.forEach(commandProto => {
    commands[commandProto.name] = commandProto.creator(program)
  })

  return commands
}
