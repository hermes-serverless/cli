import chalk from 'chalk'
import { CommanderStatic } from 'commander'
import R from 'ramda'
import { Store } from '../store'
import { configDockerhubUsername, configHermesURL } from './../lib/utils/configUtils'

interface Configs {
  [key: string]: {
    get: () => string
    set: (newValue: string) => Promise<string>
  }
}

const configs: Configs = {
  'docker.username': {
    get: Store.getDockerhubUsername,
    set: configDockerhubUsername,
  },
  'hermes.url': {
    get: Store.getBaseUrl,
    set: configHermesURL,
  },
}

const printConfigs = (obj: Configs) => {
  R.forEachObjIndexed((val, key: string) => {
    console.log(`${chalk.bold(key)}: ${chalk.bold.blue(val.get())}`)
  }, obj)
}

export const configCommand = (program: CommanderStatic) => {
  program.command('config [property] [newValue]').action(async (property, newValue, cmd) => {
    if (property != null) {
      configs['docker.username']
      if (configs[property as keyof typeof configs] == null) {
        console.log(chalk.bold.red('Invalid property'))
        process.exit(1)
      }

      if (newValue != null) {
        configs[property as keyof typeof configs].set(newValue)
      }

      printConfigs({ [property]: configs[property as keyof typeof configs] })
    } else printConfigs(configs)
  })
}
