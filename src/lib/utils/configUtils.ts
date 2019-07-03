import chalk from 'chalk'
import inquirer from 'inquirer'
import { Store } from '../../store'
import { isURL, notEmpty } from './inquirerValidations'

interface DockerhubUsernamePrompt {
  dockerhubUsername: string
}

export const configDockerhubUsername = async (val: string) => {
  if (val) return Store.setDockerhubUsername(val)
  const ans: DockerhubUsernamePrompt = await inquirer.prompt([
    {
      message: 'Your dockerhub username? ',
      name: 'dockerhubUsername',
      validate: notEmpty("Dockerhub username can't be empty"),
    },
  ])
  Store.setDockerhubUsername(ans.dockerhubUsername)
  return ans.dockerhubUsername
}

export const configHermesURL = async (url: string) => {
  const validate = (str: string) => {
    const arr = [notEmpty("Hermes URL can't be empty")(str), isURL('Invalid URL')(str)]
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i] !== true) return arr[i]
    }
    return true
  }

  const msg = validate(url)
  if (msg === true) return Store.setHermesURL(url)
  console.log(chalk.bold.red(`${msg}`))
}
