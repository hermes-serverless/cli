import chalk from 'chalk'
import { Store } from '../../../store'
import { printFnTable, runDockerProcess } from '../../utils/functionUtils'
import { HermesFunctionDatasource } from './../../datasources/HermesFunction'
import { Subprocess } from './../Subprocess'
import { Builder } from './Builder'
import { DataProvider } from './DataProvider'
import { AxiosError } from 'axios'

export class Pusher {
  private builder: Builder
  private fnData: DataProvider

  constructor(fnDir: string) {
    this.fnData = new DataProvider(fnDir)
    this.builder = new Builder(fnDir, this.fnData)
  }

  public addToHermes = async (update: boolean, target = 'development') => {
    await this.fnData.started()

    const exists = await this.checkIfFunctionExists()

    if (exists) {
      console.log(
        chalk.bold(`-> The function ${chalk.green(this.fnData.getFunctionName())} already exists.`)
      )
      if (!update) return process.exit(1)
      console.log(chalk.bold(`-> Update function!`))
    }

    await this.build(target)
    await this.pushWatcherToDockerhub()
    if (exists && update) await this.updateOnHermes()
    else await this.pushToHermes()
  }

  private build = (target: string) => {
    return this.builder.buildWatcher(target)
  }

  private pushToHermes = async () => {
    console.log(chalk.bold.green('===== DEPLOY FUNCTION ON HERMES ======'))
    const fn = await HermesFunctionDatasource.deployFunction(
      this.fnData.getUsername(),
      this.fnData.getFunctionObj(),
      Store.getToken()
    )
    console.log(chalk.bold.green('===== FUNCTION DEPLOYED ======'))

    printFnTable([fn.newFunction[0]])
  }

  private updateOnHermes = async () => {
    console.log(chalk.bold.green('===== UPDATE FUNCTION ON HERMES ======'))
    const fn = await HermesFunctionDatasource.updateFunction(
      this.fnData.getUsername(),
      this.fnData.getFunctionID(),
      this.fnData.getFunctionObj(),
      Store.getToken()
    )
    console.log(chalk.bold.green('===== FUNCTION UPDATED ======'))

    printFnTable([fn.updatedFunctions[0]])
  }

  private checkIfFunctionExists = async () => {
    try {
      await HermesFunctionDatasource.getFunction(
        this.fnData.getUsername(),
        this.fnData.getFunctionID(),
        Store.getToken()
      )
      return true
    } catch (err) {
      const axiosErr: AxiosError = err
      console.log(axiosErr.response.data.error)
      return axiosErr.response.data.error !== 'NoSuchFunction'
    }
  }

  private pushWatcherToDockerhub = async () => {
    const docker = new Subprocess({
      path: Store.getDockerPath(),
      args: ['push', this.fnData.getWatcherName()],
    })

    await runDockerProcess({
      docker,
      errorMessage: chalk.bold.red(
        `ERROR: Check if you're logged in to ${chalk.blue(
          this.fnData.getDockerhubUsername()
        )} on docker. You can do it using docker logout and docker login again`
      ),
    })

    console.log(
      chalk.bold.green(`===== IMAGE ${this.fnData.getWatcherName()} PUSHED TO DOCKERHUB ======\n`)
    )
  }
}
