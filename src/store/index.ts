import ConfigStore from 'configstore'
import { name as appName } from '../../package.json'

export class Store {
  private static store = new ConfigStore(appName, {
    hermesEndpointUrl: 'localhost',
    hermesEndpointPort: 3000,
  })

  public static getBaseUrl(protocol?: string) {
    const url =
      `${protocol || 'http'}://` +
      this.store.get('hermesEndpointUrl') +
      ':' +
      this.store.get('hermesEndpointPort')
    return url
  }
}
