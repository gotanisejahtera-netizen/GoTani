import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const items = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(items)
}

export async function POST(req: Request) {
  const body = await req.json()
  const item = await prisma.product.create({ data: {
    name: body.name,
    slug: body.slug,
    sku: body.sku ?? null,
    image: body.image ?? null,
    images: body.images ?? null,
    price: body.price ?? null,
    region: body.region ?? null,
  }})
  return NextResponse.json(item, { status: 201 })
}

export async function PUT(req: Request) {
  const body = await req.json()
  try {
    const updated = await prisma.product.update({ where: { id: body.id }, data: {
      name: body.name,
      sku: body.sku ?? null,
      image: body.image ?? null,
      images: body.images ?? null,
      price: body.price ?? null,
      region: body.region ?? null,
      slug: body.slug ?? undefined,
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
  await prisma.product.deleteMany({ where: { id } })
  return NextResponse.json({ ok: true })
}
