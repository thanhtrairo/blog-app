import * as bcrypt from 'bcrypt'

const ROUNDS = 10

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, ROUNDS)
}

export const comparePassword = (orgPassword: string, encryptedPassword: string) => {
  return bcrypt.compareSync(orgPassword, encryptedPassword)
}
