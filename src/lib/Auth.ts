import { UsernameExistenceObj } from './../typings.d'
import axios, { AxiosInstance } from 'axios'
import { Store } from '../store'
import { UserForAuth, User, AuthObj } from '../typings'

export class Auth {
  private static client: AxiosInstance = axios.create({
    baseURL: Store.getBaseUrl() + '/auth',
  })

  public static async register(newUser: UserForAuth): Promise<AuthObj> {
    try {
      const clientRes = await this.client.post('/register', newUser)
      return clientRes.data
    } catch (err) {
      throw err
    }
  }

  public static async login(loginData: UserForAuth): Promise<AuthObj> {
    try {
      const clientRes = await this.client.post('/login', loginData)
      return clientRes.data
    } catch (err) {
      throw err
    }
  }

  public static async usernameExists(username: string): Promise<UsernameExistenceObj> {
    try {
      const clientRes = await this.client.post(`/register/${username}`)
      return clientRes.data
    } catch (err) {
      throw err
    }
  }

  public static async getMe(token: string): Promise<User> {
    try {
      const clientRes = await this.client.get('/me', {
        headers: { Authorization: 'Bearer ' + token },
      })
      return clientRes.data
    } catch (err) {
      throw err
    }
  }
}
