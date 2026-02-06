import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import crypto from 'crypto'
export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { filename, data } = body as { filename: string; data: string }
    if (!filename || !data) return NextResponse.json({ error: 'missing' }, { status: 400 })

    // sanitize filename to avoid path traversal
    const safeFilename = path.basename(filename)
    // If Cloudinary is configured (prod), upload there. Otherwise fall back to local filesystem.
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    // Basic validation for base64 payload
    const isBase64 = typeof data === 'string' && /^[A-Za-z0-9+\/\r\n]+={0,2}$/.test(data.replace(/\s+/g, ''))
    if (!isBase64) return NextResponse.json({ error: 'invalid_data' }, { status: 400 })

    // Prefer signed upload (server-side) when API key + secret are available
    if (cloudName && apiKey && apiSecret) {
      try {
        const dataUri = `data:image/jpeg;base64,${data}`
        const timestamp = Math.floor(Date.now() / 1000)
        const stringToSign = `timestamp=${timestamp}`
        const signature = crypto.createHash('sha1').update(stringToSign + apiSecret).digest('hex')

        const form = new FormData()
        form.append('file', dataUri)
        form.append('api_key', apiKey)
        form.append('timestamp', String(timestamp))
        form.append('signature', signature)

        const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
        const resp = await fetch(url, { method: 'POST', body: form })
        if (!resp.ok) {
          const txt = await resp.text().catch(() => '')
          return NextResponse.json({ error: 'cloudinary_upload_failed', details: txt }, { status: 500 })
        }
        const json = await resp.json()
        return NextResponse.json({ url: json.secure_url })
      } catch (err) {
        // fall through to other strategies on unexpected error
        // eslint-disable-next-line no-console
        console.error('Signed Cloudinary upload failed:', err)
      }
    }

    // If an unsigned preset is configured, use that as a fallback
    if (cloudName && uploadPreset) {
      // Upload to Cloudinary using unsigned preset
      const dataUri = `data:image/jpeg;base64,${data}`
      const form = new FormData()
      form.append('file', dataUri)
      form.append('upload_preset', uploadPreset)

      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
      const resp = await fetch(url, { method: 'POST', body: form })
      if (!resp.ok) {
        const txt = await resp.text().catch(() => '')
        return NextResponse.json({ error: 'cloudinary_upload_failed', details: txt }, { status: 500 })
      }
      const json = await resp.json()
      // Cloudinary returns `secure_url` for the uploaded asset
      return NextResponse.json({ url: json.secure_url })
    }

    // Local fallback (development only). Note: on Vercel this will fail because filesystem is ephemeral/read-only.
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    await fs.mkdir(uploadsDir, { recursive: true })
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
