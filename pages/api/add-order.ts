import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, OrderItem, Orders } from '@prisma/client'
import { authOptions } from './auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'

const prisma = new PrismaClient()

async function addOrder(
  userId: string,
  items: Omit<OrderItem, 'id'>[],
  orderInfo?: Pick<Orders, 'address' | 'phoneNumber' | 'receiver'>,
) {
  try {
    let orderItemIds: number[] = []
    for (const item of items) {
      const orderItem = await prisma.orderItem.create({
        data: item,
      })
      console.log(`Created id: ${orderItem.id}`)
      orderItemIds.push(orderItem.id)
    }
    const response = await prisma.orders.create({
      data: {
        userId,
        orderItems: orderItemIds.join(','),
        ...orderInfo,
        status: 0,
      },
    })
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
    const items = JSON.parse(req.body)
    if (session == null) {
      res.status(400).json({ items: [], message: `no Session` })
      return
    }
    const products = await addOrder(String(session?.id), items)
    res.status(200).json({ items: products, message: `Success` })
  } catch (error) {
    res.status(400).json({ message: `Failed` })
  }
}
