export interface User {
  username: string
}

export interface UserForAuth extends User {
  password: string
}

export interface AuthObj {
  auth: boolean
  token: string
}

export interface UsernameExistenceObj {
  username: string
  exists: boolean
}
