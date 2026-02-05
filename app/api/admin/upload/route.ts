import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { filename, data } = body as { filename: string; data: string }
    if (!filename || !data) return NextResponse.json({ error: 'missing' }, { status: 400 })

    // sanitize filename to avoid path traversal
    const safeFilename = path.basename(filename)

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    await fs.mkdir(uploadsDir, { recursive: true })

    // data expected as base64 without data: prefix
    // validate basic base64 shape to avoid throwing in Buffer.from
    const isBase64 = typeof data === 'string' && /^[A-Za-z0-9+\/\r\n]+={0,2}$/.test(data.replace(/\s+/g, ''))
    if (!isBase64) return NextResponse.json({ error: 'invalid_data' }, { status: 400 })

    const buffer = Buffer.from(data, 'base64')
    const filepath = path.join(uploadsDir, safeFilename)
    await fs.writeFile(filepath, buffer)

    const url = `/uploads/${safeFilename}`
    return NextResponse.json({ url })
  } catch (e) {
    // log error for debugging
    // eslint-disable-next-line no-console
    console.error('Upload error:', e)
    // surface error message in dev to aid debugging
    const msg = (e as any)?.message ?? 'server'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
