import { AxiosError } from 'axios'

import { SignInInput, TAccount } from '~/models/auth'

import { getErrorMessage } from '~/libs/helpers'
import { httpRequest } from '~/libs/http-request'
import { LOG_LEVELS, logger } from '~/libs/logger'

export class AuthService {
  static SignIn = async (args: SignInInput): Promise<TAccount> => {
    try {
      const posts = await httpRequest.post(`/api/auth/sign-in`, args)
      return posts.data
    } catch (error) {
      logger(LOG_LEVELS.ERROR, getErrorMessage(error))
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message)
      }
      throw error
    }
  }
}
