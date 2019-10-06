import pkg from '../../package.json'
import tree from './tree'
const { help } = require('findhelp')

interface Arguments {
  h?: boolean
  help?: boolean
  v?: boolean
  version?: boolean
}

export default async (opts: Arguments) => {
  if (opts.h || opts.help) {
    console.log(help(tree, pkg))
  } else if (opts.v || opts.version) {
    console.log(pkg.version)
  } else {
    console.log(help(tree, pkg))
  }

  return Promise.resolve()
}
