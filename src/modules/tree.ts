import executionNamespace from './execution/treeIndex'
import functionNamespace from './function/treeIndex'
import remoteNamespace from './remote/treeIndex'

export default {
  handler: './default',
  options: [
    {
      short: 'h',
      long: 'help',
      description: 'show help information',
      type: 'boolean',
    },
    {
      long: 'version',
      short: 'v',
      description: 'show version number',
      type: 'boolean',
    },
  ],
  config: {
    optionalArgs: ['property', 'newValue'],
    description: 'Change or print a config',
    handler: './config',
  },
  execution: executionNamespace,
  function: functionNamespace,
  remote: remoteNamespace,
}
