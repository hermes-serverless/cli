import chalk from 'chalk'
import R from 'ramda'
import { CustomCommand } from '../oclif/CustomCommand'
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

export default class Config extends CustomCommand {
  static description = 'Change or print configs'

  static examples = [
    'hermes config',
    'hermes config hermes.url',
    'hermes config docker.username tiagonapoli',
  ]

  static flags = {
    ...CustomCommand.globalFlags,
  }
  static strict = false

  static args = [
    { name: 'configName', required: false },
    { name: 'newConfigValue', required: false },
  ]

  async run() {
    const {
      args: { configName: property, newConfigValue: newValue },
    } = this.parse(Config)

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
  }
}
