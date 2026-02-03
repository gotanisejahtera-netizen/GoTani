#!/usr/bin/env node
/**
 * Simple migration script to import `data/products.json` into the Prisma Product table.
 * Usage:
 *   1. Install dependencies: `npm install prisma @prisma/client dotenv`
 *   2. Set DATABASE_URL in `.env.local` (copy from `.env.example`).
 *   3. Run `npx prisma generate` and `npx prisma db push`.
 *   4. Run this script: `node scripts/migrate-products-to-db.js`
 */

require('dotenv').config()
const fs = require('fs')
const path = require('path')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function run() {
  const file = path.join(process.cwd(), 'data', 'products.json')
  if (!fs.existsSync(file)) {
    console.error('data/products.json not found')
    process.exit(1)
  }

  const raw = fs.readFileSync(file, 'utf8')
  const items = JSON.parse(raw)

  for (const it of items) {
    const slug = it.slug || (it.name || '').toLowerCase().replace(/\s+/g, '-')
    try {
      await prisma.product.upsert({
        where: { slug },
        update: {
          name: it.name,
          sku: it.sku ?? null,
          image: it.image ?? null,
          images: it.images ?? (it.image ? [it.image] : null),
        },
        create: {
          slug,
          name: it.name,
          sku: it.sku ?? null,
          image: it.image ?? null,
          images: it.images ?? (it.image ? [it.image] : null),
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
