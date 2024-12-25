const cache: Map<string, { data: unknown; expiration: number }> = new Map()
const CACHE_EXP = 86400 // every day

export const getFromCache = (key: string): unknown | null => {
  const entry = cache.get(key)

  if (entry && entry.expiration > Date.now()) {
    console.log(`Cache hit for key: ${key}`)
    return entry.data
  }

  if (entry) {
    console.log(`Cache expired for key: ${key}`)
    cache.delete(key)
  }

  return null
}

export const setCache = (key: string, data: unknown, ttl: number = CACHE_EXP): void => {
  cache.set(key, {
    data,
    expiration: Date.now() + ttl * 1000,
  })
  console.log(`Cached data for key: ${key}`)
}
