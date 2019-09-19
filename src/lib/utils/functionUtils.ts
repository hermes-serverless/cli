import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import { table } from 'table'
import { Store } from './../../store'
import { HermesFunction, HermesFunctionProto } from './../../typings.d'
import { configDockerhubUsername } from './configUtils'

export const parseHermesConfig = (dir: string): HermesFunctionProto => {
  const hermesPath = path.join(dir, 'hermes.config.json')
  if (!fs.existsSync(hermesPath)) {
    console.log(chalk.bold.red("This directory doesn't have a hermes.config.json"))
    process.exit(1)
  }

  const hermesConf: HermesFunctionProto = JSON.parse(
    fs.readFileSync(hermesPath, { encoding: 'utf-8' })
  )

  const fields = ['functionName', 'functionVersion', 'gpuCapable', 'language', 'scope', 'handler']
  const err: any[] = []
  fields.forEach((field: string) => {
    if (hermesConf[field as keyof typeof hermesConf] == null) {
      err.push(chalk.bold.red(`Missing field ${field} on hermes.config.json`))
    }
  })

  if (err.length !== 0) {
    err.forEach(msg => console.log(msg))
    process.exit(1)
  }

  const versionReg = /^([0-9]+\.)([0-9]+\.)([0-9])$/
  if (!versionReg.test(hermesConf.functionVersion)) {
    console.log(chalk.bold.red(`Use [number].[number].[number] pattern for versioning`))
    process.exit(1)
  }

  const nameReg = /^[a-z0-9_]+[a-z0-9_\-]*$/
  if (!nameReg.test(hermesConf.functionName)) {
    console.log(
      chalk.bold.red(
        `Use only lowercase letters, numbers, hyphens and underlines for function name. Don't start function name with hyphen`
      )
    )
    process.exit(1)
  }

  return hermesConf
}

export const getDockerhubUsername = async () => {
  let dockerUser = Store.getDockerhubUsername()
  if (dockerUser) {
    console.log(
      chalk.bold(
        `-> Using ${chalk.green(
          dockerUser
        )} as your Dockerhub username. If this is not correct change it using hermes config.\n`
      )
    )
  } else dockerUser = configDockerhubUsername('')
  return dockerUser
}

interface FunctionTableHeader {
  functionName?: string
  language?: string
  scope?: string
  gpuCapable?: string
  watcherImage?: string
}

export const printFnTable = (fnArr: HermesFunction[], header?: FunctionTableHeader) => {
  const tableData: any[] = []

  const resultHeader = {
    functionName: 'Function',
    language: 'Language',
    scope: 'Scope',
    gpuCapable: 'GPU Capable',
    watcherImage: 'Watcher Image',
    ...header,
  }

  tableData.push(
    [
      resultHeader.functionName,
      resultHeader.language,
      resultHeader.scope,
      resultHeader.gpuCapable,
      resultHeader.watcherImage,
    ].map(str => {
      return chalk.bold(str)
    })
  )

  const sortedFnArr = fnArr.sort((a, b) => {
    if (a.functionName === b.functionName) return a.functionVersion < b.functionVersion ? -1 : 1
    return a.functionName < b.functionName ? -1 : 1
  })

  sortedFnArr.forEach(fn => {
    const { functionName, functionVersion, language, scope, gpuCapable, imageName } = fn
    tableData.push([
      `${functionName}:${functionVersion}`,
      language,
      scope.toUpperCase(),
      gpuCapable,
      imageName,
    ])
  })

  console.log(table(tableData))
}
