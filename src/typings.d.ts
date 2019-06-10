export interface User {
  username: string
}

export interface UserForAuth extends User {
  password: string
}
