require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
;(async ()=>{
  try{
    const prisma = new PrismaClient()
    const items = await prisma.product.findMany({ select: { id: true, name: true, image: true, images: true }, orderBy: { createdAt: 'desc' }, take: 20 })
    console.log(JSON.stringify(items, null, 2))
    await prisma.$disconnect()
  }catch(e){
    console.error('Error', e)
    process.exit(1)
  }
})()
