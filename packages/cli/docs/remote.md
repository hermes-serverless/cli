`hermes remote`
===============

Auth related commands. Run 'hermes remote' to see all subcommands

* [`hermes remote:login USERNAME`](#hermes-remotelogin-username)
* [`hermes remote:logout`](#hermes-remotelogout)
* [`hermes remote:register`](#hermes-remoteregister)
* [`hermes remote:unregister`](#hermes-remoteunregister)
* [`hermes remote:whoami`](#hermes-remotewhoami)

## `hermes remote:login USERNAME`

Login into a remote Hermes server

```
USAGE
  $ hermes remote:login USERNAME

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  Show debug level logs

EXAMPLE
  hermes login tiagonapoli
```

_See code: [build/commands/remote/login.ts](https://github.com/hermes-serverless/hermes/blob/v0.1.8/build/commands/remote/login.ts)_

## `hermes remote:logout`

Logout from a remote Hermes server

```
USAGE
  $ hermes remote:logout

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  Show debug level logs
```

_See code: [build/commands/remote/logout.ts](https://github.com/hermes-serverless/hermes/blob/v0.1.8/build/commands/remote/logout.ts)_

## `hermes remote:register`

Register into a remote Hermes server

```
USAGE
  $ hermes remote:register

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  Show debug level logs
```

_See code: [build/commands/remote/register.ts](https://github.com/hermes-serverless/hermes/blob/v0.1.8/build/commands/remote/register.ts)_

## `hermes remote:unregister`

Unregister from a remote Hermes server

```
USAGE
  $ hermes remote:unregister

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  Show debug level logs
```

_See code: [build/commands/remote/unregister.ts](https://github.com/hermes-serverless/hermes/blob/v0.1.8/build/commands/remote/unregister.ts)_

## `hermes remote:whoami`

Check your login credentials

```
USAGE
  $ hermes remote:whoami

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  Show debug level logs
```

_See code: [build/commands/remote/whoami.ts](https://github.com/hermes-serverless/hermes/blob/v0.1.8/build/commands/remote/whoami.ts)_
