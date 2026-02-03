import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { nextUrl, headers } = req
  const pathname = nextUrl.pathname

  // Only protect admin UI pages (not api/admin login/logout or the login page)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login' && !pathname.startsWith('/api/admin')) {
    const cookie = headers.get('cookie') || ''
    const has = cookie.split(';').some(s => s.trim().startsWith('admin_token='))
    if (!has) {
      const url = new URL('/admin/login', req.url)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
