import { Category } from '@prisma/client'

import { getErrorMessage } from '~/utils/helpers'
import { httpRequest } from '~/utils/http-request'
import { LOG_LEVELS, logger } from '~/utils/logger'

export class CategoryService {
  static getAll = async (): Promise<Category[]> => {
    try {
      const categories = await httpRequest.get('/api/categories')
      return categories.data
    } catch (error) {
      logger(LOG_LEVELS.ERROR, getErrorMessage(error))
      return []
    }
  }
}
