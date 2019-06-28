import axios from 'axios'
import chalk from 'chalk'
import { Store } from './../../../store'
import { BuiltFunction, BuiltWatcher } from './../../../typings.d'
import { StringStream } from './../StringStream'
import { Subprocess } from './../Subprocess'
import { DataProvider } from './DataProvider'
import { runDockerProcess } from '../../utils/functionUtils'

const getDockerfileURL = (language: string) => {
  return `https://raw.githubusercontent.com/hermes-tcc/project-building-base-images/master/${language}.Dockerfile`
}

const getFunctionWatcherURL = () => {
  return 'github.com/hermes-tcc/function-watcher'
}

export class Builder {
  private fnData: DataProvider
  constructor(fnDir: string, fnData?: DataProvider) {
    this.fnData = fnData ? fnData : new DataProvider(fnDir)
  }

  public buildFunction = async (): Promise<BuiltFunction> => {
    await this.fnData.started()
    const { data: dockerfile } = await axios.get(getDockerfileURL(this.fnData.getLanguage()))

    console.log(chalk.bold.green('===== BUILD HERMES FUNCTION ======'))
    const docker = new Subprocess({
      path: Store.getDockerPath(),
      args: ['build', '-f', '-', '-t', this.fnData.getBuildName(), this.fnData.getDir()],
    })

    await runDockerProcess({
      docker,
      input: new StringStream(dockerfile),
    })
    console.log(chalk.bold.green('===== HERMES FUNCTION BUILT ======\n'))
    return this.fnData.getBuiltFunctionObj()
  }

  public buildWatcher = async (target = 'development'): Promise<BuiltWatcher> => {
    await this.fnData.started()
    await this.buildFunction()

    console.log(chalk.bold.green('===== BUILD WATCHER ======'))
    const docker = new Subprocess({
      path: Store.getDockerPath(),
      args: [
        'build',
        '-t',
        this.fnData.getWatcherName(),
        `--target=${target}`,
        '--build-arg',
        `FN_IMAGE=${this.fnData.getBuildName()}`,
        '--build-arg',
        `FN_LANGUAGE=${this.fnData.getConfig().language}`,
        getFunctionWatcherURL(),
      ],
    })

    await runDockerProcess({ docker })
    console.log(chalk.bold.green('===== WATCHER BUILT ======\n'))
    return this.fnData.getBuiltWatcherObj()
  }
}
