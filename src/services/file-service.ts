import { AxiosError } from 'axios'

import { CreateFileRes } from '~/models/file'

import { getErrorMessage } from '~/utils/helpers'
import { httpRequest } from '~/utils/http-request'
import { LOG_LEVELS, logger } from '~/utils/logger'

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
}
