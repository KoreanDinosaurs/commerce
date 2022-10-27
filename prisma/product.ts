import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const productData: Prisma.productsCreateInput[] = Array.apply(
  null,
  Array(100),
).map((_, index) => {
  return {
    name: `Dark Jean ${index + 1}`,
    contents: `{"blocks":[{"key":"67gub","text":"This is a Dark Jean ${
      index + 1
    }","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url: 'https://picsum.photos/id/1011/1000/600/',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  }
})

async function main() {
  await prisma.products.deleteMany({})
  for (const p of productData) {
    const product = await prisma.products.create({
      data: p,
    })
    console.log(`Created id: ${product.id}`)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.log(e)
    await prisma.$disconnect()
    process.exit(1)
  })
