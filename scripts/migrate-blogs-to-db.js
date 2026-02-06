#!/usr/bin/env node
/**
 * Simple migration script to import `app/blog/blog-data.json` into the Prisma Blog table.
 * Usage:
 *   1. Install dependencies: `npm install prisma @prisma/client dotenv`
 *   2. Set DATABASE_URL in `.env.local`.
 *   3. Run `npx prisma generate` and `npx prisma db push`.
 *   4. Run this script: `node scripts/migrate-blogs-to-db.js`
 */

require('dotenv').config()
const fs = require('fs')
const path = require('path')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function run() {
  const file = path.join(process.cwd(), 'app', 'blog', 'blog-data.json')
  if (!fs.existsSync(file)) {
    console.error('app/blog/blog-data.json not found')
    process.exit(1)
  }

  const raw = fs.readFileSync(file, 'utf8')
  const data = JSON.parse(raw)
  const items = []
  if (data.featured) {
    const f = data.featured
    f.featured = true
    items.push(f)
  }
  if (Array.isArray(data.posts)) items.push(...data.posts)

  for (const it of items) {
    const slug = it.slug || (it.title || '').toLowerCase().replace(/\s+/g, '-')
    try {
      await prisma.blog.upsert({
        where: { slug },
        update: {
          title: it.title,
          excerpt: it.excerpt ?? null,
          content: it.content ?? null,
          image: it.image ?? null,
          images: it.images ?? (it.image ? [it.image] : []),
          category: it.category ?? null,
          author: it.author ?? null,
          date: it.date ? new Date(it.date) : undefined,
          readTime: it.readTime ?? null,
          featured: !!it.featured,
        },
        create: {
          slug,
          title: it.title,
          excerpt: it.excerpt ?? null,
          content: it.content ?? null,
          image: it.image ?? null,
          images: it.images ?? (it.image ? [it.image] : []),
          category: it.category ?? null,
          author: it.author ?? null,
          date: it.date ? new Date(it.date) : undefined,
          readTime: it.readTime ?? null,
          featured: !!it.featured,
        },
      })
      console.log('Upserted', slug)
    } catch (e) {
      console.error('Failed for', slug, e.message || e)
    }
  }

  await prisma.$disconnect()
  console.log('Done')
}

run().catch((e) => { console.error(e); process.exit(1) })
