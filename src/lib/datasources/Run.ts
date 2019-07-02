import { Readable } from 'stream'
import { PartialFunctionID, FunctionID } from './HermesFunction'
import axios, { AxiosInstance } from 'axios'
import { Store } from '../../store'
import { User, CompleteRunInfo } from '../../typings'
import { getAuthorizationHeader } from '../utils/authUtils'
import FormData from 'form-data'

interface BaseObj {
  user: User
}

export interface GetRunObj extends BaseObj {
  runs: CompleteRunInfo[]
}

export interface DeleteRunObj extends BaseObj {
  deletedRuns: CompleteRunInfo[]
}

interface PartialFunctionIDWithOwner extends PartialFunctionID {
  functionOwner: string
}

interface FunctionIDWithOwner extends FunctionID {
  functionOwner: string
}

const createFunctionRunsUrl = (username: string, partialFunctionID: PartialFunctionIDWithOwner) => {
  const { functionOwner, functionName, functionVersion } = partialFunctionID
  return (
    `/${username}/function-runs/${functionOwner}` +
    (functionName ? `/${functionName}` + (functionVersion ? `/${functionVersion}` : '') : '')
  )
}

const createRunsUrl = (username: string, { id }: { id?: string }) => {
  return `/${username}/runs` + (id ? `/${id}` : '')
}

export class RunDatasource {
  private static client: AxiosInstance = axios.create({
    baseURL: Store.getBaseUrl() + '/user',
  })

  public static async getRuns(
    username: string,
    runID: { id?: string },
    token: string
  ): Promise<GetRunObj> {
    try {
      const clientRes = await this.client.get(createRunsUrl(username, runID), {
        headers: getAuthorizationHeader(token),
      })
      return clientRes.data
    } catch (err) {
      throw err
    }
  }

  public static async deleteRun(
    username: string,
    runID: { id: string },
    token: string
  ): Promise<GetRunObj> {
    try {
      const clientRes = await this.client.delete(createRunsUrl(username, runID), {
        headers: getAuthorizationHeader(token),
      })
      return clientRes.data
    } catch (err) {
      throw err
    }
  }

  public static async getFunctionRuns(
    username: string,
    functionID: PartialFunctionIDWithOwner,
    token: string
  ): Promise<GetRunObj> {
    try {
      const clientRes = await this.client.get(createFunctionRunsUrl(username, functionID), {
        headers: getAuthorizationHeader(token),
      })
      return clientRes.data
    } catch (err) {
      throw err
    }
  }

  public static async deleteFunctionRuns(
    username: string,
    functionID: PartialFunctionIDWithOwner,
    token: string
  ): Promise<GetRunObj> {
    try {
      const clientRes = await this.client.delete(createFunctionRunsUrl(username, functionID), {
        headers: getAuthorizationHeader(token),
      })
      return clientRes.data
    } catch (err) {
      throw err
    }
  }

  static async createFunctionRun(
    username: string,
    functionID: FunctionIDWithOwner,
    input: Readable | string,
    token: string
  ): Promise<any> {
    try {
      const { functionOwner, functionName, functionVersion } = functionID
      const form = new FormData()
      form.append('input', input)
      const res = await this.client.post(
        `${username}/run/${functionOwner}/${functionName}/${functionVersion}`,
        form,
        {
          headers: {
            ...getAuthorizationHeader(token),
            ...form.getHeaders(),
          },
        }
      )
      return res.data
    } catch (err) {
      throw err
    }
  }

  static async getRunStatus(username: string, runID: string, token: string): Promise<any> {
    try {
      const res = await this.client.get(`${username}/run/${runID}/status`, {
        headers: {
          ...getAuthorizationHeader(token),
        },
        responseType: 'stream',
      })
      return res.data
    } catch (err) {
      throw err
    }
  }
}
