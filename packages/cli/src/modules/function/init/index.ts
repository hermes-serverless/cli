import chalk from 'chalk'
import fs from 'fs'
import inquirer from 'inquirer'
import path from 'path'

interface Arguments {
  path?: string
  p?: string
}

const getLanguageOptions = () => {
  return ['cuda', 'cpp']
}

const languageExtension = {
  cpp: 'cpp',
  cuda: 'cu',
}

const makefiles = {
  cpp: `main: main.cpp
  g++ main.cpp -o a.out

clean:
  -rm a.out
`,
  cuda: `main: main.cu
  nvcc -std=c++11 main.cu

clean:
  -rm a.out
`,
}

const basicSrc = {
  cpp: `#include <stdio.h>

int main() {
    
  return 0;
}
  
`,
  cuda: `#include <stdio.h>

int main() {
    
  return 0;
}
  
`,
}

const validateFunctionName = (fName: string) => {
  if (!fName) return "Username can't be empty"
  if (!/^[a-zA-Z0-9_\-]*$/i.test(fName)) return 'Use only letters, numbers, underline and hyphens'
  return true
}

export default async (opts: Arguments) => {
  const folderPath = opts.p || opts.path || '.'
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
      handler: './a.out',
    },
    null,
    '\t'
  )

  console.log(folderPath)
  const dir = path.join(process.cwd(), folderPath || '.', functionName)
  console.log(chalk.bold(`-> Function created at ${dir}`))
  if (fs.existsSync(dir)) throw new Error(`Function directory ${functionName} already exists`)
  fs.mkdirSync(dir)
  fs.writeFileSync(path.join(dir, 'hermes.config.json'), json, { encoding: 'utf-8' })
  fs.writeFileSync(path.join(dir, 'Makefile'), makefiles[language], { encoding: 'utf-8' })
  fs.writeFileSync(path.join(dir, `main.${languageExtension[language]}`), basicSrc[language], {
    encoding: 'utf-8',
  })
}
