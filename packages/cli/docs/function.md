`hermes function`
=================

Hermes-functions related commands. Run 'hermes function' to see all subcommands

* [`hermes function:build`](#hermes-functionbuild)
* [`hermes function:delete [FUNCTIONNAME] [FUNCTIONVERSION]`](#hermes-functiondelete-functionname-functionversion)
* [`hermes function:deploy`](#hermes-functiondeploy)
* [`hermes function:init`](#hermes-functioninit)
* [`hermes function:list`](#hermes-functionlist)
* [`hermes function:run [FUNCTIONID]`](#hermes-functionrun-functionid)

## `hermes function:build`

Build a hermes-function locally. Should be run in the directory in which the hermes-function source code is located

```
USAGE
  $ hermes function:build

OPTIONS
  -h, --help     show CLI help
  -j, --json     Output data as json
  -v, --verbose  Show debug level logs
```

_See code: [build/commands/function/build.ts](https://github.com/hermes-serverless/hermes/blob/v0.1.8/build/commands/function/build.ts)_

## `hermes function:delete [FUNCTIONNAME] [FUNCTIONVERSION]`

Delete a function from remote

```
USAGE
  $ hermes function:delete [FUNCTIONNAME] [FUNCTIONVERSION]

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  Show debug level logs

EXAMPLE
  hermes function:delete gpu-pi-montecarlo 1.0.0
```

_See code: [build/commands/function/delete.ts](https://github.com/hermes-serverless/hermes/blob/v0.1.8/build/commands/function/delete.ts)_

## `hermes function:deploy`

Deploy a function to remote. Should be run in the directory in which the hermes-function source code is located

```
USAGE
  $ hermes function:deploy

OPTIONS
  -h, --help     show CLI help
  -u, --update   Update if hermes-function already exists
  -v, --verbose  Show debug level logs
```

_See code: [build/commands/function/deploy.ts](https://github.com/hermes-serverless/hermes/blob/v0.1.8/build/commands/function/deploy.ts)_

## `hermes function:init`

Init a hermes-function

```
USAGE
  $ hermes function:init

OPTIONS
  -h, --help       show CLI help
  -p, --path=path  [default: .] Path to create hermes-function folder
  -v, --verbose    Show debug level logs

EXAMPLES
  hermes function:init
  hermes function:init -p ./dir/to/create/hermes-function
```

_See code: [build/commands/function/init.ts](https://github.com/hermes-serverless/hermes/blob/v0.1.8/build/commands/function/init.ts)_

## `hermes function:list`

List your hermes-functions registered on remote

```
USAGE
  $ hermes function:list

OPTIONS
  -h, --help     show CLI help
  -j, --json     Output data as json
  -v, --verbose  Show debug level logs

EXAMPLES
  hermes function:list
  hermes function:list --json
```

_See code: [build/commands/function/list.ts](https://github.com/hermes-serverless/hermes/blob/v0.1.8/build/commands/function/list.ts)_

## `hermes function:run [FUNCTIONID]`

Start a hermes-function execution

```
USAGE
  $ hermes function:run [FUNCTIONID]

OPTIONS
  -a, --async      Run hermes-function asynchronously
  -f, --file=file  Path to an input file
  -h, --help       show CLI help
  -s, --sync       Run hermes-function synchronously
  -v, --verbose    Show debug level logs

EXAMPLES
  hermes function:run username/function-name:1.0.0
  hermes function:run username/function-name:1.0.0 --async
  hermes function:run username/function-name:1.0.0 --sync
  hermes function:run username/function-name:1.0.0 --file ./path/to/input
```

_See code: [build/commands/function/run.ts](https://github.com/hermes-serverless/hermes/blob/v0.1.8/build/commands/function/run.ts)_
