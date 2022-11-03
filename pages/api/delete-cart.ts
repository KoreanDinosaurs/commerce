import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function deleteCart(id: number) {
  try {
    const response = await prisma.cart.delete({
      where: {
        id,
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
    const { id } = JSON.parse(req.body)
    const products = await deleteCart(Number(id))
    res.status(200).json({ items: products, message: `Success` })
  } catch (error) {
    res.status(400).json({ message: `Failed` })
  }
}
