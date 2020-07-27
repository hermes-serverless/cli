import OclifCommand, { flags as oclifFlags } from '@oclif/command'

export abstract class CustomCommand extends OclifCommand {
  public static globalFlags = {
    verbose: oclifFlags.boolean({
      char: 'v',
      description: 'Show debug level logs',
      default: false,
    }),
    help: oclifFlags.help({ char: 'h' }),
  }
}
