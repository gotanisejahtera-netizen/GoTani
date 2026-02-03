import crypto from 'crypto'

const ALGO = 'sha256'

function base64url(input: Buffer | string) {
  const b = typeof input === 'string' ? Buffer.from(input) : input
  return b.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

export function signToken(payload: Record<string, any>, expiresInSec = 60 * 60 * 24 * 7) {
  const secret = process.env.ADMIN_SECRET || 'dev-secret'
  const exp = Math.floor(Date.now() / 1000) + expiresInSec
  const body = { ...payload, exp }
  const data = base64url(JSON.stringify(body))
  const sig = crypto.createHmac(ALGO, secret).update(data).digest()
  return `${data}.${base64url(sig)}`
}

export function verifyToken(token: string | undefined) {
  if (!token) return null
  try {
    const [data, sig] = token.split('.')
    if (!data || !sig) return null
    const secret = process.env.ADMIN_SECRET || 'dev-secret'
    const expected = base64url(crypto.createHmac(ALGO, secret).update(data).digest())
    if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig))) return null
    const body = JSON.parse(Buffer.from(data, 'base64').toString('utf-8'))
    if (body.exp && Date.now() / 1000 > body.exp) return null
    return body
  } catch (e) {
    return null
  }
}
