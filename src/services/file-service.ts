import { AxiosError } from 'axios'

import { CreateFileRes } from '~/models/file'

import { getErrorMessage } from '~/libs/helpers'
import { httpRequest } from '~/libs/http-request'
import { LOG_LEVELS, logger } from '~/libs/logger'

export class FileService {
  static create = async (formData: FormData, resource_type: 'video' | 'image' = 'image'): Promise<CreateFileRes> => {
    try {
      const posts = await httpRequest.post(`/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: {
          resource_type,
        },
      })
      return posts.data
    } catch (error) {
      logger(LOG_LEVELS.ERROR, getErrorMessage(error))
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message)
      }
      throw error
    }
  }

  static delete = async (imgUrl: string) => {
    try {
      const posts = await httpRequest.delete(`/api/upload?url=${imgUrl}`)
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
