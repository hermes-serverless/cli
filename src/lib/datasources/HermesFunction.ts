import axios, { AxiosInstance } from 'axios'
import { Store } from '../../store'
import { User } from '../../typings'
import { getAuthorizationHeader } from '../utils/authUtils'
import { HermesFunction } from './../../typings.d'

interface BaseObj {
  user: User
}

export interface GetFunctionObj extends BaseObj {
  functions: HermesFunction[]
}

export interface DeployFunctionObj extends BaseObj {
  newFunction: HermesFunction[]
}

export interface DeleteFunctionObj extends BaseObj {
  deletedFunctions: HermesFunction[]
}

export interface UpdatedFunctionObj extends BaseObj {
  updatedFunctions: HermesFunction[]
}

export interface PartialFunctionID {
  functionName?: string
  functionVersion?: string
}

export interface FunctionID {
  functionName: string
  functionVersion: string
}

const createUrl = (username: string, partialFunctionID: PartialFunctionID) => {
  const { functionName, functionVersion } = partialFunctionID
  return (
    `/${username}/function` +
    (functionName ? `/${functionName}` + (functionVersion ? `/${functionVersion}` : '') : '')
  )
}

export class HermesFunctionDatasource {
  private static client: AxiosInstance = axios.create({
    baseURL: Store.getBaseUrl() + '/user',
  })

  public static async getFunction(
    username: string,
    partialFunctionID: PartialFunctionID,
    token: string
  ): Promise<GetFunctionObj> {
    try {
      const clientRes = await this.client.get(createUrl(username, partialFunctionID), {
        headers: getAuthorizationHeader(token),
      })
      return clientRes.data
    } catch (err) {
      throw err
    }
  }

  public static async deleteFunction(
    username: string,
    partialFunctionID: PartialFunctionID,
    token: string
  ): Promise<DeleteFunctionObj> {
    try {
      const clientRes = await this.client.delete(createUrl(username, partialFunctionID), {
        headers: getAuthorizationHeader(token),
      })
      return clientRes.data
    } catch (err) {
      throw err
    }
  }

  public static async deployFunction(
    username: string,
    hermesFunction: HermesFunction,
    token: string
  ): Promise<DeployFunctionObj> {
    try {
      const clientRes = await this.client.post(`/${username}/function`, hermesFunction, {
        headers: getAuthorizationHeader(token),
      })
      return clientRes.data
    } catch (err) {
      throw err
    }
  }

  public static async updateFunction(
    username: string,
    partialFunctionID: FunctionID,
    updatedHermesFunction: HermesFunction,
    token: string
  ): Promise<UpdatedFunctionObj> {
    try {
      const clientRes = await this.client.put(
        createUrl(username, partialFunctionID),
        updatedHermesFunction,
        {
          headers: getAuthorizationHeader(token),
        }
      )
      return clientRes.data
    } catch (err) {
      throw err
    }
  }
}
