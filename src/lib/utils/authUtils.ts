import chalk from 'chalk'
import { Store } from '../../store'
import { AuthDatasource } from './../datasources/Auth'

export const isLogged = async () => {
  if (!Store.getToken()) {
    return {
      state: 'NotLogged',
      username: null,
    }
  }

  try {
    const { username } = await AuthDatasource.getMe(Store.getToken())
    return {
      username,
      state: 'Logged',
    }
  } catch (err) {
    if (err.response && err.response.data) console.log(err.response.data)
    else console.log(err)
    return {
      state: 'TokenExpired',
      username: null,
    }
  }
}

export const guaranteeLogged = async (): Promise<string> => {
  const { username, state } = await isLogged()
  if (state === 'NotLogged') {
    console.log(chalk.bold('You are not logged in!'))
    process.exit(1)
  } else if (state === 'TokenExpired') {
    console.log(chalk.bold('Your token expired'))
    process.exit(1)
  }
  return username
}

export const getAuthorizationHeader = (token: string) => {
  return {
    Authorization: 'Bearer ' + token,
  }
}
