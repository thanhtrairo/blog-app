import { AxiosError } from 'axios'

import { PostCreate, PostUpdate, TPost } from '~/models/post'

import { DEFAULT_PAGE } from '~/libs/constants'
import { getErrorMessage } from '~/libs/helpers'
import { httpRequest } from '~/libs/http-request'
import { LOG_LEVELS, logger } from '~/libs/logger'

export class PostService {
  static getAll = async ({
    page = DEFAULT_PAGE,
    cat = '',
  }: {
    page?: number | string
    cat?: string
  }): Promise<{
    posts: TPost[]
    totalPage: number
  }> => {
    try {
      const posts = await httpRequest.get(`/api/posts`, {
        params: {
          page,
          cat,
        },
      })
      return posts.data
    } catch (error) {
      logger(LOG_LEVELS.ERROR, getErrorMessage(error))
      return {
        posts: [],
        totalPage: 0,
      }
    }
  }

  static create = async (args: PostCreate): Promise<TPost> => {
    try {
      const post = await httpRequest.post(`/api/posts`, args)
      return post.data
    } catch (error) {
      logger(LOG_LEVELS.ERROR, getErrorMessage(error))
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message)
      }
      throw error
    }
  }

  static update = async (args: PostUpdate): Promise<TPost> => {
    try {
      const post = await httpRequest.patch(`/api/posts`, args)
      return post.data
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
      const post = await httpRequest.get(`/api/posts/${slug}`)
      return post.data
    } catch (error) {
      logger(LOG_LEVELS.ERROR, getErrorMessage(error))
      return {
        post: null,
        postsRelated: [],
      }
    }
  }
}
