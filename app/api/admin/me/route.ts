import { NextResponse } from 'next/server'
export const runtime = 'nodejs'
import { verifyToken } from '@/lib/auth'

export async function GET(req: Request) {
  const cookie = req.headers.get('cookie') || ''
  const match = cookie.split(';').map(s=>s.trim()).find(s=>s.startsWith('admin_token='))
  const token = match ? match.split('=')[1] : undefined
  const payload = verifyToken(token)
  if (!payload) return NextResponse.json({ ok: false }, { status: 401 })
  return NextResponse.json({ ok: true, user: payload.user || null })
}
