import chalk from 'chalk'
import { table } from 'table'
import { CompleteRunInfo } from './../../typings.d'
import moment from 'moment'
import { timeDiff } from './time'

interface RunTableHeader {
  id?: string
  status?: string
  startTime?: string
  endTime?: string
  elapsedTime?: string
  function?: string
}

export const printRunTable = (runArr: CompleteRunInfo[], header?: RunTableHeader) => {
  const tableData: any[] = []
  const dateFormat = 'MM/DD HH:mm:ss.SSS'

  const runs = runArr.map(el => {
    const fn = el.function
    const owner = fn.owner.username
    const startTime = moment(el.startTime)
    const endTime = el.endTime ? moment(el.endTime) : null
    const elapsedTime = el.endTime ? timeDiff(startTime, endTime) : null

    return {
      ...el,
      startTime,
      endTime,
      elapsedTime,
      function: `${owner}/${fn.functionName}:${fn.functionVersion}`,
    }
  })

  const runsSorted = runs.sort((a, b) => {
    if (!a.endTime) {
      if (!b.endTime) return a.startTime.isBefore(b.startTime) ? 1 : -1
      else return -1
    } else {
      if (!b.endTime) return 1
      if (a.endTime.isSame(b.endTime)) return a.startTime.isBefore(a.endTime) ? -1 : 1
      else return a.endTime.isBefore(b.endTime) ? -1 : 1
    }
  })

  const resultHeader = {
    id: 'RunID',
    status: 'Status',
    startTime: 'Start',
    endTime: 'End',
    elapsedTime: 'Elapsed',
    function: `Function`,
    ...header,
  }

  const { id, status, startTime, endTime, elapsedTime } = resultHeader

  tableData.push(
    [id, status, startTime, endTime, elapsedTime, resultHeader.function].map(str => {
      return chalk.bold(str)
    })
  )

  runsSorted.forEach(run => {
    const { id, status, startTime, endTime, elapsedTime, function: fn } = run
    tableData.push([
      id,
      status,
      startTime.format(dateFormat),
      endTime ? endTime.format(dateFormat) : '----- --:--:--.---',
      elapsedTime ? elapsedTime : '----- --:--:--.---',
      fn,
    ])
  })

  console.log(table(tableData))
}
