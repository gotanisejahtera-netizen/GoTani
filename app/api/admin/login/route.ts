import { NextResponse } from 'next/server'
export const runtime = 'nodejs'
import { signToken } from '@/lib/auth'

export async function POST(req: Request) {
  const { username, password } = await req.json().catch(() => ({}))
  const ADMIN_USER = process.env.ADMIN_USER || 'admin'
  const ADMIN_PASS = process.env.ADMIN_PASS || 'password'

  if (username !== ADMIN_USER || password !== ADMIN_PASS) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  const token = signToken({ user: username })
  const maxAge = 60 * 60 * 24 * 7 // 7 days

  const secure = process.env.NODE_ENV === 'production'

  const res = NextResponse.json({ ok: true })
  res.headers.append('Set-Cookie', `admin_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure ? '; Secure' : ''}`)
  return res
}
