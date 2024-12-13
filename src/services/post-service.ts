import { AxiosError } from 'axios'

import { PostCreate, TPost } from '~/models/post'

import { getErrorMessage } from '~/utils/helpers'
import { httpRequest } from '~/utils/http-request'
import { LOG_LEVELS, logger } from '~/utils/logger'

export class PostService {
  static getAll = async ({
    page,
    cat,
  }: {
    page?: number
    cat?: string
  }): Promise<{
    posts: TPost[]
    count: number
  }> => {
    try {
      const posts = await httpRequest.get(`/api/posts`, {
        params: { page, cat },
      })
      return posts.data
    } catch (error) {
      logger(LOG_LEVELS.ERROR, getErrorMessage(error))
      return {
        posts: [],
        count: 0,
      }
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

  static getDetail = async ({
    slug,
  }: {
    slug: string
  }): Promise<{
    post: TPost | null
    postsRelated: TPost[]
  }> => {
    try {
      const posts = await httpRequest.get(`/api/posts/${slug}`)
      return posts.data
    } catch (error) {
      logger(LOG_LEVELS.ERROR, getErrorMessage(error))
      return {
        post: null,
        postsRelated: [],
      }
    }
  }
}
