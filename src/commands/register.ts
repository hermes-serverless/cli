import { Store } from './../store/index'
import { Auth } from './../lib/Auth'
import inquirer from 'inquirer'
import { CommanderStatic } from 'commander'

interface UsernamePromptAns {
  username: string
}

interface PasswordPromptAns {
  password1: string
  password2: string
}

const usernameValidation = async (username: string) => {
  if (!username) return "Username can't be empty"
  if (!/^[a-zA-Z0-9]*$/i.test(username)) return 'Use only letters and numbers'

  const { exists } = await Auth.usernameExists(username)
  if (exists) return 'Username already exists'
  return true
}

const passwordValidation = (password: string) => {
  if (!password) return "Password can't be empty"
  return true
}

export const registerCommand = (program: CommanderStatic) => {
  program.command('register').action(async cmd => {
    const ans: UsernamePromptAns = await inquirer.prompt([
      {
        message: 'Username? ',
        name: 'username',
        validate: usernameValidation,
      },
    ])

    let passwordMatch = false
    let password = ''
    while (passwordMatch == false) {
      const passwordAns: PasswordPromptAns = await inquirer.prompt([
        {
          type: 'password',
          message: 'Password: ',
          name: 'password1',
          validate: passwordValidation,
        },
        {
          type: 'password',
          message: 'Confirm password: ',
          name: 'password2',
        },
      ])
      passwordMatch = passwordAns.password1 === passwordAns.password2
      password = passwordAns.password1
      if (!passwordMatch) console.log("Passwords don't match. Type them again\n")
    }

    const { username } = ans

    try {
      const authObj = await Auth.register({
        username,
        password,
      })

      console.log(authObj)
      if (authObj.auth) Store.addToken(authObj.token)
    } catch (err) {
      if (err.response && err.response.data) console.log(err.response.data)
      else console.log(err)
      process.exit(1)
    }
  })
}
