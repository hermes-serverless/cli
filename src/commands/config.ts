import { configDockerhubUsername } from './../lib/utils/configUtils'
import { CommanderStatic } from 'commander'
import inquirer from 'inquirer'

const configs = ['docker.username']

interface ConfigOptionPrompt {
  option: string
}

export const configCommand = (program: CommanderStatic) => {
  program.command('config [option] [val]').action(async (option, val, cmd) => {
    let configToChange = option
    if (!configToChange || !(configToChange in configs)) {
      const { option: selected } = (await inquirer.prompt([
        {
          type: 'list',
          message: 'Choose the configuration you want to change:',
          name: 'option',
          choices: configs,
        },
      ])) as ConfigOptionPrompt
      configToChange = selected
    }

    if (configToChange === 'docker.username') return await configDockerhubUsername(val)
  })
}
