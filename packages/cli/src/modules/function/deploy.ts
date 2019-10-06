import { Pusher } from '@hermes-serverless/cli-resources'
import { guaranteeLogged } from '../../lib/utils/authUtils'
import { getDockerhubUsername, printFnTable } from '../../lib/utils/functionUtils'
import { Store } from '../../store'

interface Arguments {
  update?: boolean
  u?: boolean
}

export default async (opts: Arguments) => {
  const update = opts.update || opts.u || false
  const fnDir = process.cwd()
  const pusher = new Pusher(fnDir, await guaranteeLogged(), await getDockerhubUsername(), {
    logger: console,
    outputToStdout: true,
  })

  const fn = await pusher.addToHermes(update, Store.getToken(), 'production')
  printFnTable(fn)
}
