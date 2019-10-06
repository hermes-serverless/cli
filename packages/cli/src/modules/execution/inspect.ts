import { RunDatasource } from '@hermes-serverless/cli-resources'
import { guaranteeLogged } from '../../lib/utils/authUtils'
import { Store } from '../../store'

interface Arguments {
  r?: boolean
  result?: boolean
}

export default async (runID: string, opts: Arguments) => {
  const onlyResult = opts.r || opts.result || false
  const username = await guaranteeLogged()
  const status = await RunDatasource.getRunStatus(username, runID, Store.getToken(), [
    'out',
    'err',
  ])

  if (status.out == null) {
    const res = await RunDatasource.getRunResultOutput(username, runID, Store.getToken())
    status.out = res
  }
  if (onlyResult) {
    console.log(status.out)
  } else console.log(status)
}
