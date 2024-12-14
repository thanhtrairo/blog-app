import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { LOG_LEVELS, logger } from './logger'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const formatDateDefault = (value: Date) => {
  const date = new Date(value)
  if (isNaN(date.getTime())) {
    logger(LOG_LEVELS.ERROR, 'Invalid Date')
    return ''
  }
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' }
  return date.toLocaleDateString('vi-VN', options)
}
