import { HermesFunctionDatasource } from '@hermes-serverless/cli-resources'
import { CommanderStatic } from 'commander'
import { guaranteeLogged } from '../../lib/utils/authUtils'
import { Store } from '../../store'
import { printFnTable } from './../../lib/utils/functionUtils'

export const listCommand = (program: CommanderStatic) => {
  program.command('list').action(async cmd => {
    const username = await guaranteeLogged()
    const { functions: fnArr } = await HermesFunctionDatasource.getFunction(
      username,
      {},
      Store.getToken()
    )
    // @ts-ignore
    printFnTable(fnArr)
  })
}
