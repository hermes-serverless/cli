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
$ npm install -g @hermes-serverless/cli
```

Or, if you are using `yarn`:

```bash
$ yarn global add @hermes-serverless/cli
```

Make sure npm's or yarn's binaries path are in your system's environment variable PATH. After this you can run:

```bash
$ hermes
```

And the output should be all commands available to use.

### Setting up

In order to use Hermes you'll have to own a Dockerhub account (https://hub.docker.com/). If you don't have one already, create one, it's simple and free. After that, you'll have to login to your account using `docker`, simply run:

```bash
$ docker login
```

Now you can setup `hermes` for using this Docker username:

```bash
$ hermes config docker.username <yourDockerhubUsername>
```

The last setup step to start using hermes is setting the url of a remote hermes instance to be used, for example:

```bash
$ hermes config hermes.url http://ratel.ime.usp.br:9090
```

If you want you can run a hermes instance locally or in a server by following the instructions in [this](https://github.com/hermes-serverless/hermes-install) repository.

After that it's time to login into that instance. If you don't have an account there, you can create one:

```bash
$ hermes remote:register
```

Or login into an existent account:

```bash
$ hermes remote:login <username>
```

You check your credentials at any time by running:

```bash
$ hermes remote:whoami
```

### Deploying your first function

Some function examples are available on [Hermes-Examples](https://github.com/hermes-serverless/examples). We're going to deploy function `gpu-pi-montecarlo`, which calculates PI using the Montecarlo's method sending the workload to the GPU. First clone [Hermes-Examples](https://github.com/hermes-serverless/examples) repository:

```bash
$ git clone https://github.com/hermes-serverless/examples.git
```

Now you can deploy the function using:

```bash
$ cd ./examples/cuda/gpu-pi-montecarlo
$ hermes function:deploy
```

The function will be built and after successfuly deploying it on hermes you should expect the output to be somehting like this:

```bash
===== FUNCTION DEPLOYED ======
╔═════════════════════╤══════════╤════════╤═════════════╤═════════════════════════════════════════╗
║ Function            │ Language │ Scope  │ GPU Capable │ Watcher Image                           ║
╟─────────────────────┼──────────┼────────┼─────────────┼─────────────────────────────────────────╢
║ pi-montecarlo:1.0.0 │ cpp      │ PUBLIC │ false       │ tiagonapoli/watcher-pi-montecarlo:1.0.0 ║
╚═════════════════════╧══════════╧════════╧═════════════╧═════════════════════════════════════════╝
```

Now you can request a synchronous execution using:

```bash
$ hermes function:run <yourHermesUsername>/gpu-pi-montecarlo:1.0.0 --sync
```

A prompt for the input should appear. This function expects one integers - the number of iterations of the Montecarlo's algorithm, for example:

```bash
  ? Input: 1000000000
```

You'll receive something like this, which is the function output:

```bash
------CUDA Devices------
Device Number: 0
  Device name: GeForce MX150
  Memory Clock Rate (KHz): 3004000

Starting simulation with 64 blocks, 32 threads per block (warps), and a total of 1000001536 iterations
Approximated PI using 1000001536 random tests
PI ~= 3.141620254
```

This function just prints some information on the Hermes instance GPU and then approximates PI.

You can create async executions too, which are fire-and-forget executions:

```
$ hermes function:run <yourHermesUsername>/gpu-pi-montecarlo:1.0.0 --async
? Input: 100000000
{ startTime: '2020-07-27T02:49:33.576Z', runID: '3' }
```

You received an `runID` which can be used to inspect the execution:

```bash
$ hermes execution:inspect <runID>
```

The output will be similar to:

```bash
{
  status: 'success',
  startTime: '2020-07-27T02:49:33.576Z',
  runningTime: '00:00:00.615',
  endTime: '2020-07-27T02:49:34.191Z',
  out: '------CUDA Devices------\n' +
    'Device Number: 0\n' +
    '  Device name: GeForce MX150\n' +
    '  Memory Clock Rate (KHz): 3004000\n' +
    '\n' +
    'Starting simulation with 64 blocks, 32 threads per block (warps), and a total of 100001792 iterations\n' +
    'Approximated PI using 100001792 random tests\n' +
    'PI ~= 3.141545224\n'
}
```

Your previous sync or async executions can be listed and checked again at any time:

```bash
$ hermes execution:list
╔═══════╤═════════╤════════════════════╤════════════════════╤══════════════╤═════════════════════════════════════╗
║ RunID │ Status  │ Start              │ End                │ Elapsed      │ Function                            ║
╟───────┼─────────┼────────────────────┼────────────────────┼──────────────┼─────────────────────────────────────╢
║ 1     │ success │ 07/26 23:45:14.822 │ 07/26 23:45:15.710 │ 00:00:00.888 │ tiagonapoli/gpu-pi-montecarlo:1.0.0 ║
╟───────┼─────────┼────────────────────┼────────────────────┼──────────────┼─────────────────────────────────────╢
║ 2     │ success │ 07/26 23:45:23.978 │ 07/26 23:45:24.760 │ 00:00:00.782 │ tiagonapoli/gpu-pi-montecarlo:1.0.0 ║
╟───────┼─────────┼────────────────────┼────────────────────┼──────────────┼─────────────────────────────────────╢
║ 3     │ success │ 07/26 23:49:33.576 │ 07/26 23:49:34.191 │ 00:00:00.615 │ tiagonapoli/gpu-pi-montecarlo:1.0.0 ║
╚═══════╧═════════╧════════════════════╧════════════════════╧══════════════╧═════════════════════════════════════╝
$ hermes execution:inspect 1
{
  status: 'success',
  startTime: '2020-07-27T02:45:14.822Z',
  runningTime: '00:00:00.888',
  endTime: '2020-07-27T02:45:15.710Z',
  out: '------CUDA Devices------\n' +
    'Device Number: 0\n' +
    '  Device name: GeForce MX150\n' +
    '  Memory Clock Rate (KHz): 3004000\n' +
    '\n' +
    'Starting simulation with 64 blocks, 32 threads per block (warps), and a total of 1000001536 iterations\n' +
    'Approximated PI using 1000001536 random tests\n' +
    'PI ~= 3.141579903\n'
}
```

### Creating your first function

To create a function you can use:

```bash
$ hermes function:init [path]
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

The instruction for creating the handler should be available through the `main` recipe. You'll have to create a `clean` recipe too, and make sure it removes _all_ binaries and object files. If you don't do this, a object file may be copied from your system to the function container built and after the compilation inside the container some libraries incompatibilities may occur.

Make sure to insert a `-` before the `rm` command. If the files to be removed doesn't exist, the `clean` recipe will not fail.

After creating the Makefile for your project you can try to build it using:

```bash
$ hermes function:build
```

If there were no errors in the compilation, you can deploy your function using the instructions from the previous section.

## Commands <a name="usage"></a>

All commands usage are documented [here](https://github.com/hermes-serverless/hermes/tree/master/packages/cli/docs), make sure to check it out. Also every command has a `--help` flag showing its usage.