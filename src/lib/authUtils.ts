import { AuthDatasource } from './datasources/Auth'
import { Store } from '../store'

export const isLogged = async () => {
  if (!Store.getToken())
    return {
      state: 'NotLogged',
      username: null,
    }

  try {
    const { username } = await AuthDatasource.getMe(Store.getToken())
    return {
      state: 'Logged',
      username,
    }
  } catch (err) {
    console.log(err)
    return {
      state: 'TokenExpired',
      username: null,
    }
  }
}

export const getAuthorizationHeader = (token: string) => {
  return {
    Authorization: 'Bearer ' + token,
  }
}
