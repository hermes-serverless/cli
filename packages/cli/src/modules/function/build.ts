import { Builder } from '@hermes-serverless/cli-resources'
import { guaranteeLogged } from '../../lib/utils/authUtils'
import { getDockerhubUsername } from '../../lib/utils/functionUtils'

export default async () => {
  const fnDir = process.cwd()
  const builder = new Builder(fnDir, await guaranteeLogged(), await getDockerhubUsername(), {
    logger: console,
    outputToStdout: true,
  })

  await builder.buildFunction()
}
