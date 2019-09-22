import { HermesFunctionDatasource } from '@hermes-serverless/cli-resources'
import { guaranteeLogged } from '../../lib/utils/authUtils'
import { Store } from '../../store'
import { printFnTable } from './../../lib/utils/functionUtils'

interface Arguments {
  pretty?: string
  p?: string
}

export default async (opts: Arguments) => {
  const pretty = opts.pretty || opts.p || false
  const username = await guaranteeLogged()
  const { functions: fnArr } = await HermesFunctionDatasource.getFunction(
    username,
    {},
    Store.getToken()
  )

  if (pretty) {
    // @ts-ignore
    printFnTable(fnArr)
  } else console.log(fnArr.join('\n'))
}
