import inquirer from 'inquirer'
import { CommanderStatic } from 'commander'
import fs from 'fs'
import path from 'path'

const getLanguageOptions = () => {
  return ['cuda']
}

const validateFunctionName = (fName: string) => {
  if (!fName) return "Username can't be empty"
  if (!/^[a-zA-Z0-9_\-]*$/i.test(fName)) return 'Use only letters, numbers, underline and hyphens'
  return true
}

export const initCommand = (program: CommanderStatic) => {
  program.command('init').action(async cmd => {
    const { functionName, language, gpuCapable } = await inquirer.prompt([
      {
        type: 'input',
        name: 'functionName',
        message: 'Function name:',
        validate: validateFunctionName,
      },
      {
        type: 'list',
        name: 'language',
        message: 'Choose the function language:',
        choices: getLanguageOptions(),
      },
      {
        type: 'confirm',
        name: 'gpuCapable',
        message: 'Should use GPU?',
      },
    ])

    const json = JSON.stringify(
      {
        functionName,
        language,
        gpuCapable,
        scope: 'public',
        functionVersion: '1.0.0',
      },
      null,
      '\t'
    )

    const dir = path.join(process.cwd(), functionName)
    console.log(dir)
    if (fs.existsSync(dir)) throw new Error(`Function directory ${functionName} already exists`)
    fs.mkdirSync(dir)
    fs.writeFileSync(path.join(dir, 'hermes_config.json'), json, { encoding: 'utf-8' })
  })
}
