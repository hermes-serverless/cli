import axios, { AxiosInstance } from 'axios'
import { Store } from '../store'
import { UserForAuth, User } from '../typings'

export class Auth {
  private static client: AxiosInstance = axios.create({
    baseURL: Store.getBaseUrl(),
  })

  public static async register(newUser: UserForAuth): Promise<User> {
    try {
      const clientRes = await this.client.post('/register', newUser)
      return clientRes.data
    } catch (err) {
      console.log(err)
      process.exit(1)
    }
  }

  public static async login(loginData: UserForAuth): Promise<User> {
    try {
      const clientRes = await this.client.post('/login', loginData)
      return clientRes.data
    } catch (err) {
      console.log(err)
      process.exit(1)
    }
  }

  public static async getMe(auth: string): Promise<User> {
    try {
      const clientRes = await this.client.get('/me', {
        headers: { Authorization: auth },
      })
      return clientRes.data
    } catch (err) {
      console.log(err)
      process.exit(1)
    }
  }
}
