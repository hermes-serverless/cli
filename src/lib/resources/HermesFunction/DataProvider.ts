import { FunctionID } from '../../datasources/HermesFunction'
import { guaranteeLogged } from '../../utils/authUtils'
import { Waiter } from '../../utils/CustomPromises'
import { getDockerhubUsername, parseHermesConfig } from '../../utils/functionUtils'
import { HermesFunction, HermesFunctionProto } from './../../../typings.d'
import { ImageNamer } from './ImageNamer'

export class DataProvider {
  private functionDir: string
  private hermesConfig: HermesFunctionProto

  private dockerhubUsername: string
  private username: string
  public functionNamer: ImageNamer

  private startFinish: Waiter<void>

  constructor(functionDir: string) {
    this.functionDir = functionDir
    this.startFinish = new Waiter()
    const start = async () => {
      this.username = await guaranteeLogged()
      this.dockerhubUsername = await getDockerhubUsername()
      this.hermesConfig = parseHermesConfig(this.functionDir)
      this.functionNamer = new ImageNamer(this.hermesConfig, this.username, this.dockerhubUsername)
      this.startFinish.resolve()
    }

    start()
  }

  public started() {
    return this.startFinish.finish()
  }

  public getConfig() {
    return this.hermesConfig
  }

  public getDir() {
    return this.functionDir
  }

  public getFunctionID(): FunctionID {
    const { functionName, functionVersion } = this.hermesConfig
    return {
      functionName,
      functionVersion,
    }
  }

  public getLanguage() {
    return this.hermesConfig.language
  }

  public getDockerhubUsername() {
    return this.dockerhubUsername
  }

  public getUsername() {
    return this.username
  }

  public getFunctionName() {
    return `${this.hermesConfig.functionName}:${this.hermesConfig.functionVersion}`
  }

  public getBuiltFunctionObj = () => {
    return {
      dockerhubUsername: this.dockerhubUsername,
      username: this.username,
      hermesConfig: this.hermesConfig,
    }
  }

  public getBuiltWatcherObj = () => {
    const hermesFunctionConfig = {
      ...this.hermesConfig,
      imageName: this.getWatcherName(),
    }

    return {
      hermesFunctionConfig,
      username: this.username,
    }
  }

  public getFunctionObj = (): HermesFunction => {
    return {
      ...this.hermesConfig,
      imageName: this.getWatcherName(),
    }
  }

  public getWatcherBase = () => {
    return this.functionNamer.getWatcherBase()
  }

  public getWatcherName = () => {
    return this.functionNamer.getWatcherName()
  }

  public getBuildName = () => {
    return this.functionNamer.getBuildName()
  }
}
