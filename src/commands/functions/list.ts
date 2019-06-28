import { printFnTable } from './../../lib/utils/functionUtils'
import { HermesFunctionDatasource } from './../../lib/datasources/HermesFunction'
import { CommanderStatic } from 'commander'
import { guaranteeLogged } from '../../lib/utils/authUtils'
import { Store } from '../../store'

export const listCommand = (program: CommanderStatic) => {
  program.command('list').action(async cmd => {
    const username = await guaranteeLogged()
    const { functions: fnArr } = await HermesFunctionDatasource.getFunction(
      username,
      {},
      Store.getToken()
    )
    printFnTable(fnArr)
  })
}
