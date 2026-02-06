import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
export const runtime = 'nodejs'

export async function GET() {
  const items = await prisma.blog.findMany({ orderBy: { date: 'desc' } })
  return NextResponse.json(items)
}
