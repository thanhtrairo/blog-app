import { Post } from '@prisma/client'

import { getErrorMessage } from '~/utils/helpers'
import { httpRequest } from '~/utils/http-request'
import { LOG_LEVELS, logger } from '~/utils/logger'

const getPosts = async ({
  page,
  cat = '',
}: {
  page: number
  cat: string
}): Promise<{ posts: Post[]; count: number } | null> => {
  try {
    const posts = await httpRequest.get(`/api/posts?page=${page}&cat=${cat}`)
    return posts.data
  } catch (error) {
    logger(LOG_LEVELS.ERROR, getErrorMessage(error))
    return null
  }
}

export { getPosts }
