import { spawn, ChildProcess } from 'child_process'
import { Readable, Writable } from 'stream'

interface SubprocessConstructor {
  path: string
  args: string[]
}

interface SubprocessIO {
  in?: Readable
  err?: Writable
  out?: Writable
}

export class Subprocess {
  private path: string
  private args: string[]
  private process: ChildProcess

  private returnCode: number
  private out: string
  private err: string

  private resolveFinish: any
  private finishPromise: Promise<void>

  constructor({ path, args }: SubprocessConstructor) {
    this.path = path
    this.args = args
    this.finishPromise = new Promise(resolve => {
      this.resolveFinish = resolve
    })
  }

  public start(io: SubprocessIO) {
    console.log('spawn process', this.path)
    console.log('args', this.args)

    this.process = spawn(this.path, this.args)

    this.process.on('close', (ret: number) => {
      this.resolveFinish()
      this.returnCode = ret
    })

    this.err = ''
    if (io.err) this.process.stderr.pipe(io.err)
    this.process.stderr.on('data', (data: any) => {
      this.err += data
    })

    this.out = ''
    if (io.out) this.process.stdout.pipe(io.out)
    this.process.stdout.on('data', (data: any) => {
      this.out += data
    })

    this.process.on('error', (err: any) => console.log('Error catch', err))

    if (io.in) io.in.pipe(this.process.stdin).on('error', (e: any) => console.log('Pipe error', e))
  }

  public getErr() {
    return this.err
  }

  public getOut() {
    return this.out
  }

  public exitCode() {
    return this.returnCode
  }

  public finish() {
    return this.finishPromise
  }
}
