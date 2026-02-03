import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { filename, data } = body as { filename: string; data: string }
    if (!filename || !data) return NextResponse.json({ error: 'missing' }, { status: 400 })

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    await fs.mkdir(uploadsDir, { recursive: true })

    // data expected as base64 without data: prefix
    const buffer = Buffer.from(data, 'base64')
    const filepath = path.join(uploadsDir, filename)
    await fs.writeFile(filepath, buffer)

    const url = `/uploads/${filename}`
    return NextResponse.json({ url })
  } catch (e) {
    return NextResponse.json({ error: 'server' }, { status: 500 })
  }
}
