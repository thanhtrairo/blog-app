import { Post } from '@prisma/client'
import { AxiosError } from 'axios'
import { PostCreate, TPost } from '~/models/post'

import { getErrorMessage } from '~/utils/helpers'
import { httpRequest } from '~/utils/http-request'
import { LOG_LEVELS, logger } from '~/utils/logger'

export class PostService {
  static getAll = async ({ page, cat = '' }: { page?: number; cat?: string }): Promise<Post[]> => {
    try {
      const posts = await httpRequest.get(`/api/posts?page=${page}&cat=${cat}`)
      return posts.data
    } catch (error) {
      logger(LOG_LEVELS.ERROR, getErrorMessage(error))
      return []
    }
  }

  static create = async (args: PostCreate): Promise<TPost> => {
    try {
      const posts = await httpRequest.post(`/api/posts`, args)
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
