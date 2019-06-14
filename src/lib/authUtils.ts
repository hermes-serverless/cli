import { Auth } from './Auth'
import { Store } from '../store'

export const isLogged = async () => {
  if (!Store.getToken())
    return {
      state: 'NotLogged',
      username: null,
    }

  try {
    const { username } = await Auth.getMe(Store.getToken())
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
