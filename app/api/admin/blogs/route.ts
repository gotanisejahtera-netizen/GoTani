import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
export const runtime = 'nodejs'

export async function GET() {
  const items = await prisma.blog.findMany({ orderBy: { date: 'desc' } })
  return NextResponse.json(items)
}

export async function POST(req: Request) {
  const body = await req.json()
  const item = await prisma.blog.create({ data: {
    title: body.title,
    slug: body.slug,
    excerpt: body.excerpt ?? null,
    content: body.content ?? null,
    image: body.image ?? null,
    images: body.images ?? [],
    category: body.category ?? null,
    author: body.author ?? null,
    authorBio: body.authorBio ?? null,
    date: body.date ? new Date(body.date) : undefined,
    readTime: body.readTime ?? null,
    featured: body.featured ?? false,
  }})
  return NextResponse.json(item, { status: 201 })
}

export async function PUT(req: Request) {
  const body = await req.json()
  try {
    const updated = await prisma.blog.update({ where: { id: body.id }, data: {
      title: body.title,
      slug: body.slug ?? undefined,
      excerpt: body.excerpt ?? undefined,
      content: body.content ?? undefined,
      image: body.image ?? null,
      images: body.images ?? [],
      category: body.category ?? undefined,
      author: body.author ?? undefined,
      authorBio: body.authorBio ?? undefined,
      date: body.date ? new Date(body.date) : undefined,
      readTime: body.readTime ?? undefined,
      featured: body.featured ?? undefined,
    } })
    return NextResponse.json(updated)
  } catch (e) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}

export async function DELETE(req: Request) {
  const url = new URL(req.url)
  const id = url.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  await prisma.blog.deleteMany({ where: { id } })
  return NextResponse.json({ ok: true })
}
