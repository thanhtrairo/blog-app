import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { isLogin } from './libs/session'

const authPaths = ['/sign-in']
const privatePaths = ['/write']

export const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname
  const isAuthPath = authPaths.some((path) => pathname.includes(path))
  const isprivatePath = privatePaths.some((path) => pathname.includes(path))
  const loggedIn = await isLogin()

  if (loggedIn && isAuthPath) {
    return NextResponse.redirect(new URL('/', request.url).toString())
  }

  if (!loggedIn && isprivatePath) {
    return NextResponse.redirect(new URL('/login', request.url).toString())
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
