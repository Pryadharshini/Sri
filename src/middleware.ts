import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Let the login page and the login API route through
  const isPublicAdminPath =
    pathname === '/admin/login' || pathname === '/api/admin/login'

  const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/api/admin')

  if (isAdminRoute && !isPublicAdminPath) {
    const session = request.cookies.get('admin_session')

    if (!session || session.value !== process.env.ADMIN_SESSION_SECRET) {
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
