import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getComments(productId: number) {
  try {
    const orderItems = await prisma.orderItem.findMany({
      where: {
        productId,
      },
    })

    let response = []

    for (const orderItem of orderItems) {
      const productInfo = await prisma.products.findUnique({
        where: {
          id: orderItem.productId,
        },
      })
      const res = await prisma.comment.findUnique({
        where: {
          orderItemId: orderItem.id,
        },
      })
      res &&
        response.push({
          quantity: orderItem.quantity,
          amount: orderItem.amount,
          price: orderItem.price,
          contents: res.contents,
          rate: res.rate,
          updatedAt: res.updatedAt,
          userName: res.userName,
          userImage: res.userImage,
          productImage: productInfo?.image_url,
          productName: productInfo?.name,
        })
    }
    console.log(response)
    return response
  } catch (error) {
    console.error(error)
  }
}

type Data = {
  message: string
  items?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const { productId } = req.query
    const wishList = await getComments(Number(productId))
    res.status(200).json({ items: wishList, message: `Success` })
  } catch (error) {
    res.status(400).json({ message: `Failed` })
  }
}
