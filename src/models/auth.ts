export type TAccount = {
  id: string
  username: string
  password: string
  lastLogin: Date | string
  createdAt: Date | string
}

export type SignInInput = {
  username: string
  password: string
}
