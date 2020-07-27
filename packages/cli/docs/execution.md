`hermes execution`
==================

Executions related commands. Run 'hermes execution' to see all subcommands

* [`hermes execution:inspect RUNID`](#hermes-executioninspect-runid)
* [`hermes execution:list`](#hermes-executionlist)

## `hermes execution:inspect RUNID`

Get info on an execution

```
USAGE
  $ hermes execution:inspect RUNID

OPTIONS
  -h, --help     show CLI help
  -r, --result   Show only the result output
  -v, --verbose  Show debug level logs

EXAMPLES
  hermes execution:inspect 15
  hermes execution:inspect 15 --result
```

_See code: [build/commands/execution/inspect.ts](https://github.com/hermes-serverless/hermes/blob/v0.2.0/build/commands/execution/inspect.ts)_

## `hermes execution:list`

List your executions

```
USAGE
  $ hermes execution:list

OPTIONS
  -h, --help     show CLI help
  -j, --json     Output data as json
  -v, --verbose  Show debug level logs

EXAMPLES
  hermes execution:list
  hermes execution:list --json
```

_See code: [build/commands/execution/list.ts](https://github.com/hermes-serverless/hermes/blob/v0.2.0/build/commands/execution/list.ts)_
