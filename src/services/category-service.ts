import { Category } from '@prisma/client'

import { getErrorMessage } from '~/utils/helpers'
import { httpRequest } from '~/utils/http-request'
import { LOG_LEVELS, logger } from '~/utils/logger'

const getCategories = async (): Promise<Category[] | null> => {
  try {
    const categories = await httpRequest.get('/api/categories')
    return categories.data
  } catch (error) {
    logger(LOG_LEVELS.ERROR, getErrorMessage(error))
    return null
  }
}

export { getCategories }
