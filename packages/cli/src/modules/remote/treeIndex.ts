export default {
  login: {
    description: 'Login into a remote Hermes server',
    handler: './remote/login',
    requiredArgs: ['username'],
  },
  logout: {
    description: 'Logout from an remote Hermes server',
    handler: './remote/logout',
  },
  register: {
    description: 'Register into a remote Hermes server',
    handler: './remote/register',
  },
  unregister: {
    description: 'Unregister from a remote Hermes server',
    handler: './remote/unregister',
  },
  whoami: {
    description: "Check the user you're logged on",
    handler: "./remote/whoami"
  }
}
