import { Environment } from '@hermes-serverless/cli-resources'
import { Store } from '../store'

export default () => {
  Environment.baseURL = Store.getBaseUrl()
}
