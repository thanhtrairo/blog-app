'use server'

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

type SessionPayload = {
  userId: string
  expiresAt: Date
}

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export const encrypt = (payload: SessionPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export const decrypt = async (session: string | undefined = '') => {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session')
  }
}

export const createSession = async (userId: string) => {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ userId, expiresAt })
  const cookieStore = await cookies()

  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    path: '/',
  })
}

export const deleteSession = async () => {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}

export const isLogin = async () => {
  const session = (await cookies()).get('session')?.value
  const payload = await decrypt(session)
  if (!session || !payload?.exp) {
    return false
  }

  return new Date() < new Date(payload.exp * 1000)
}
