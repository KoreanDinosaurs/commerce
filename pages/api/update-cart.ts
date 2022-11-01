import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Cart } from '@prisma/client'
import { authOptions } from './auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'

const prisma = new PrismaClient()

async function updateCart(userId: string, item: Cart) {
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
    const session = await unstable_getServerSession(req, res, authOptions)
    const { item } = JSON.parse(req.body)
    if (session == null) {
      res.status(400).json({ items: [], message: `no Session` })
    }
    const products = await updateCart(String(session?.id), item)
    res.status(200).json({ items: products, message: `Success` })
  } catch (error) {
    res.status(400).json({ message: `Failed` })
  }
}
