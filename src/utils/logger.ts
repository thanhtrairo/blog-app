export enum LOG_LEVELS {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export const logger = (level: LOG_LEVELS, message: string) => {
  if (process.env.NODE_ENV === 'production') {
    console.error(message)
  } else {
    switch (level) {
      case LOG_LEVELS.DEBUG:
        console.debug(message)
        break
      case LOG_LEVELS.INFO:
        console.info(message)
        break
      case LOG_LEVELS.WARN:
        console.warn(message)
        break
      case LOG_LEVELS.ERROR:
        console.error(message)
        break

      default:
        console.log(message)
        break
    }
  }
}
