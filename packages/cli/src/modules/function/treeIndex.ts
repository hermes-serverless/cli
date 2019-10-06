export default {
  build: {
    description: 'Build a hermes-function locally',
    handler: './function/build',
  },
  delete: {
    description: 'Delete a function from remote',
    handler: './function/delete',
    requiredArgs: ['functionName', 'functionVersion'],
  },
  deploy: {
    description: 'Deploy a function to remote',
    handler: './function/deploy',
    options: [
      {
        description: 'Update if hermes-function already exists',
        long: 'update',
        short: 'u',
        type: 'boolean',
      },
    ],
  },
  init: {
    description: 'Init a hermes-function',
    handler: './function/init',
    options: [
      {
        description: 'Path to create hermes-function folder',
        long: 'path',
        short: 'p',
        type: 'string',
      },
    ],
  },
  list: {
    description: 'List your hermes-functions registered on remote',
    handler: './function/list',
    options: [
      {
        description: 'Pretty print',
        long: 'pretty',
        short: 'p',
        type: 'boolean',
      },
    ],
  },
  run: {
    description: 'Start a hermes-function execution',
    handler: './function/run',
    requiredArgs: ['functionID'],
    options: [
      {
        description: 'Run hermes-function synchronously',
        long: 'sync',
        short: 's',
        type: 'boolean',
      },
      {
        description: 'Run hermes-function asynchronously',
        long: 'async',
        short: 'a',
        type: 'boolean',
      },
      {
        description: 'Use an input file',
        long: 'file',
        short: 'f',
        type: 'string',
      },
    ],
  },
}
