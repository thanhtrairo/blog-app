import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { isLogin } from './libs/session'

const authPaths = ['/login']
const privatePaths = ['/write']

export const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path))
  const isPrivatePath = privatePaths.some((path) => pathname.startsWith(path))
  const loggedIn = await isLogin()

  if (loggedIn && isAuthPath) {
    return NextResponse.redirect(new URL('/', request.url).toString())
  }

  if (!loggedIn && isPrivatePath) {
    return NextResponse.redirect(new URL('/login', request.url).toString())
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/write/:path*'],
}
