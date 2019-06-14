import axios, { AxiosInstance } from 'axios'
import { Store } from '../../store'
import { UserForAuth, User, AuthObj } from '../../typings'
import { getAuthorizationHeader } from '../authUtils'

export interface UpdatedUser {
  updatedUser: User
}

export interface DeletedUser {
  deletedUser: User
}

export class UserDatasource {
  private static client: AxiosInstance = axios.create({
    baseURL: Store.getBaseUrl() + '/user',
  })

  public static async updateUser(
    username: string,
    newUserInfo: User,
    token: string
  ): Promise<UpdatedUser> {
    try {
      const clientRes = await this.client.put(`/${username}`, newUserInfo, {
        headers: getAuthorizationHeader(token),
      })
      return clientRes.data
    } catch (err) {
      throw err
    }
  }

  public static async deleteUser(username: string, token: string): Promise<DeletedUser> {
    try {
      const clientRes = await this.client.delete(`/${username}`, {
        headers: getAuthorizationHeader(token),
      })
      return clientRes.data
    } catch (err) {
      throw err
    }
  }
}
