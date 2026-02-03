import { NextResponse } from 'next/server'
export const runtime = 'nodejs'

export async function POST() {
  const res = NextResponse.json({ ok: true })
  res.headers.append('Set-Cookie', `admin_token=deleted; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`)
  return res
}
