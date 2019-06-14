import ConfigStore from 'configstore'
import { name as appName } from '../../package.json'
import { User } from '../typings'

export class Store {
  private static store = new ConfigStore(appName, {
    hermesEndpointUrl: 'localhost',
    hermesEndpointPort: 3000,
    token: '',
  })

  public static getBaseUrl(protocol?: string) {
    const url =
      `${protocol || 'http'}://` +
      this.store.get('hermesEndpointUrl') +
      ':' +
      this.store.get('hermesEndpointPort')
    return url
  }

  public static addToken(token: string) {
    this.store.set('token', token)
  }

  public static getToken() {
    return this.store.get('token')
  }
}
