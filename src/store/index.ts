import ConfigStore from 'configstore'
import { name as appName } from '../../package.json'

export class Store {
  private static store = new ConfigStore(appName, {
    hermesEndpointUrl: '',
    token: '',
    dockerBin: '/usr/bin/docker',
    dockerhubUsername: '',
  })

  public static getBaseUrl = () => {
    return Store.store.get('hermesEndpointUrl')
  }

  public static setHermesURL = (url: string) => {
    Store.store.set('hermesEndpointUrl', url)
    return url
  }

  public static addToken = (token: string) => {
    Store.store.set('token', token)
    return token
  }

  public static getToken = () => {
    return Store.store.get('token')
  }

  public static getDockerPath = () => {
    return Store.store.get('dockerBin')
  }

  public static setDockerPath = (path: string) => {
    Store.store.set('dockerBin', path)
    return path
  }

  public static getDockerhubUsername = () => {
    return Store.store.get('dockerhubUsername')
  }

  public static setDockerhubUsername = (username: string) => {
    Store.store.set('dockerhubUsername', username)
    return username
  }
}
