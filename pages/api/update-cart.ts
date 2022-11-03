import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Cart } from '@prisma/client'

const prisma = new PrismaClient()

async function updateCart(item: Cart) {
  try {
    const response = await prisma.cart.update({
      where: { id: item.id },
      data: {
        quantity: item.quantity,
        amount: item.amount,
      },
    })
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
    const { item } = JSON.parse(req.body)
    const products = await updateCart(item)
    res.status(200).json({ items: products, message: `Success` })
  } catch (error) {
    res.status(400).json({ message: `Failed` })
  }
}
