import inquirer from 'inquirer'
import { Store } from '../../store'
import { notEmpty } from './inquirerValidations'

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
