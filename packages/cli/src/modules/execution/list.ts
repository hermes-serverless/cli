import { RunDatasource } from '@hermes-serverless/cli-resources'
import { inspect } from 'util'
import { guaranteeLogged } from '../../lib/utils/authUtils'
import { Store } from '../../store'
import { printRunTable } from './../../lib/utils/runUtils'

interface Arguments {
  pretty: boolean
  p: boolean
}

export default async (opts: Arguments) => {
  const prettyPrint = opts.pretty || opts.p || false
  const username = await guaranteeLogged()
  const { runs } = await RunDatasource.getRuns(username, {}, Store.getToken())
  prettyPrint ? printRunTable(runs) : console.log(runs.map(run => inspect(run)).join('\n'))
}
