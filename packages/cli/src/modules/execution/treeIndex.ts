export default {
  list: {
    description: 'List your executions',
    handler: './execution/list',
    options: [
      {
        description: 'Pretty print',
        long: 'pretty',
        short: 'p',
        type: 'boolean',
      },
    ],
  },
  inspect: {
    description: 'Get info on an execution',
    handler: './execution/inspect',
    requiredArgs: 'runID',
    options: [
      {
        description: 'Show only the result output',
        long: 'result',
        short: 'r',
        type: 'boolean',
      },
    ],
  },
}
