import { Store } from './../../store/index'
import { Subprocess } from './../../lib/resources/Subprocess'
import { CommanderStatic } from 'commander'
import axios from 'axios'
import { parseHermesConfig } from '../../lib/functionUtils'
import { StringStream } from '../../lib/resources/StringStream'

const getDockerfilePath = (language: string) => {
  return `https://raw.githubusercontent.com/hermes-tcc/project-building-base-images/master/${language}.Dockerfile`
}

export const functionBuildCommand = (program: CommanderStatic) => {
  program.command('build [dir]').action(async (dir, cmd) => {
    const functionDir = dir ? dir : process.cwd()
    const hermesConfig = parseHermesConfig(functionDir)
    const { data: dockerfile } = await axios.get(getDockerfilePath(hermesConfig.language))
    const docker = new Subprocess({
      path: Store.getDockerPath(),
      args: [
        'build',
        '-f',
        '-',
        '-t',
        hermesConfig.functionName + ':' + hermesConfig.functionVersion,
        functionDir,
      ],
    })

    docker.start({
      in: new StringStream(dockerfile),
      out: process.stdout,
      err: process.stderr,
    })

    await docker.finish()
  })
}
