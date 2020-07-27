# Hermes/CLI [![npm version](https://badge.fury.io/js/%40hermes-serverless%2Fcli.svg)](https://badge.fury.io/js/%40hermes-serverless%2Fcli) [![GitHub Issues](https://img.shields.io/github/issues/hermes-serverless/cli.svg)](https://github.com/hermes-serverless/cli/issues) [![GitHub Pull Requests](https://img.shields.io/github/issues-pr/hermes-serverless/cli.svg)](https://github.com/hermes-serverless/cli/pulls)

## About <a name = "about"></a>

This is the CLI to use with Hermes systems. With this CLI you can build, deploy and run functions written in some predetermined languages (currently C++ and CUDA are supported). Hermes offers serverless delivery for your function executions, with the possibility to use the server's GPU.

## Getting Started <a name = "getting_started"></a>

These instructions will get you ready to start creating your own functions and running them in a Hermes server.

### Prerequisites

Besides `npm` or `yarn`, `docker` is also a prerequisite for running this CLI. This is because the function building is done on your computer. Everything else is done on the server side.

To install docker refer to: `https://docs.docker.com/install/`.

### Installing

After installing `docker`, you can run the following to install `hermes-cli`:

```bash
npm install -g @hermes-serverless/cli
```

Or, if you are using `yarn`:

```bash
yarn global add @hermes-serverless/cli
```

Make sure npm's or yarn's binaries path are in your system's environment variable PATH. After this you can run:

```bash
  hermes
```

And the output should be all commands available to use.

### Setting up

In order to use Hermes you'll have to own a Dockerhub account (https://hub.docker.com/). If you don't have one already, create one, it's simple and free. After that, you'll have to login to your account using `docker`, simply run:

```bash
  docker login
```

Now you can setup `hermes` for usage:

```bash
  hermes config dockerhub.username <yourDockerhubUsername>
```

After that, if you don't have an account on hermes, you can create one:

```bash
  hermes register
```

Or login:

```bash
  hermes login <username>
```

You can make sure you're logged in running:

```bash
  hermes me
```

### Deploying your first function

Some function examples are available on [Hermes-Examples](https://github.com/hermes-tcc/examples). We're going to deploy function `pi-montecarlo`, which calculates PI using Montecarlo's method. First clone [Hermes-Examples](https://github.com/hermes-tcc/examples) repository:

```bash
  git clone https://github.com/hermes-tcc/examples.git
```

Now you can deploy the function using:

```bash
  hermes deploy ./examples/cpp/pi-montecarlo
```

The function will be built and after successfuly deploying it on hermes you should expect something like this:

```bash
===== FUNCTION DEPLOYED ======
╔═════════════════════╤══════════╤════════╤═════════════╤═════════════════════════════════════════╗
║ Function            │ Language │ Scope  │ GPU Capable │ Watcher Image                           ║
╟─────────────────────┼──────────┼────────┼─────────────┼─────────────────────────────────────────╢
║ pi-montecarlo:1.0.0 │ cpp      │ PUBLIC │ false       │ tiagonapoli/watcher-pi-montecarlo:1.0.0 ║
╚═════════════════════╧══════════╧════════╧═════════════╧═════════════════════════════════════════╝
```

Now you can start a run using:

```bash
  hermes run <yourHermesUsername>/pi-montecarlo:1.0.0
```

A prompt for the input should appear. This function expects two integers, the first one is the number of iterations, the second the number of threads. In this example the input was:

```bash
  ? Input: 10000000 4
```

You'll receive something like this:

```bash
{ startTime: '2019-07-07T16:50:25.174Z', runID: '13' }
```

Now, to check the status of this run:

```bash
hermes run-status <runID>
```

The output will be similar to:

```bash
out:
Elapsed time: 70.270796000000 ms
PI: 3.143152000000
```

### Creating your first function

To create a function you can use:

```bash
  hermes init <path>
```

After answering some prompts, a folder with your function name will be availabe in the given path. Inside it you'll find `hermes.config.json`. This file is responsible for the project configuration, and it has a structure like this one:

```json
{
  "functionName": "char-printer",
  "language": "cpp",
  "gpuCapable": true,
  "scope": "public",
  "functionVersion": "1.0.0",
  "handler": "./main.out"
}
```

The `handler` is the path to the file that should be executed on your function runs. The `gpuCapable` property tells the server if the function should be able to use NVIDIA drivers. After deploying this function you'll refer to it using `<yourUsername>/<functionName>:<functionVersion>`.

Now you can create the source file for your function. After that you'll have to create a Makefile:

```makefile
main: charPrinter.cpp
	g++ charPrinter.cpp -o main.out

clean:
	-rm main.out
```

The instruction for creating the handler should be available through `main` recipe. You'll have to create a `clean` recipe too, and make sure it removes _all_ binaries and object files. If you don't do this, a object file may be copied from your system to the function container built and after the compilation inside the container some libraries incompatibilities may occur.

Make sure to insert a `-` before the `rm` command. If the files to be removed doesn't exist, the `clean` recipe will not fail.

After creating the Makefile for your project you can try to build it using:

```bash
  hermes build .
```

If there were no errors in the compilation, you can deploy your function using the instructions from the previous section.

## Commands <a name="usage"></a>

The commands availabe are the following (for every command you can use `--help` or `-h` to check the available options):

| Command                                                         | Description                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `register`                                                      | Create a username in Hermes server.                                                                                                                                                                                                                                                                                                                                               |
| `unregister`                                                    | Delete the logged account.                                                                                                                                                                                                                                                                                                                                                        |
| `login [options] <username>`                                    | Login to an existing account.                                                                                                                                                                                                                                                                                                                                                     |
| `logout`                                                        | Logout.                                                                                                                                                                                                                                                                                                                                                                           |
| `me`                                                            | Check the account logged.                                                                                                                                                                                                                                                                                                                                                         |
| `config [property][newvalue]`                                   | If no property and newValue are specified, all configurations are printed. If only a property is specified, its value is printed. If a property and a value are specified the property will have this new value.                                                                                                                                                                  |
| `init [path]`                                                   | Create a new project at the specified path. If no path is provided the project will be created in the current dir.                                                                                                                                                                                                                                                                |
| `build [dir]`                                                   | Build a project specified by dir.                                                                                                                                                                                                                                                                                                                                                 |
| `deploy [options][dir]`                                         | Deploy a project specified by dir. Use `-u` or `--update` to change the current version.                                                                                                                                                                                                                                                                                          |
| `delete <functionName> [functionVersion]`                       | Delete a function deployed.                                                                                                                                                                                                                                                                                                                                                       |
| `info <functionName> [functionVersion]`                         | Get information about a function. If no version is specified, all functions with that name will be presented.                                                                                                                                                                                                                                                                     |
| `list`                                                          | List all functions deployed.                                                                                                                                                                                                                                                                                                                                                      |
| `run [options] <functionOwner/fName:fVersion>`                  | Start a run. Use `-f` to specify a file to use as input.                                                                                                                                                                                                                                                                                                                          |
| `function-runs <functionOwner> [functionName][functionversion]` | Check all runs of a function. If no function name or version are specified, all runs referring to that functionOwner will be presented. If a function name is specified, all runs referring `<functionOwner>/<functionName>` will be presented. Finally, if functionVersion is specified, all runs referring to `<functionOwner>/<functionName>:<functionVersion>` will be shown. |
| `runs [runId]`                                                  | Check all runs done. If `runID` is given, that run info is shown.                                                                                                                                                                                                                                                                                                                 |
| `run-status <runID>`                                            | Check the status run with id `runID`.                                                                                                                                                                                                                                                                                                                                             |
