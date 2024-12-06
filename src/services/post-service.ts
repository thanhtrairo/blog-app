import { Post } from '@prisma/client'

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
}
