import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

const prisma = new PrismaClient()

async function getComment(userId: string, orderItemId: number) {
  try {
    const response = await prisma.comment.findUnique({
      where: {
        orderItemId,
      },
    })
    console.log(response)
    if (response?.userId === userId) {
      return response
    }
    return { message: 'userId is not matched' }
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
    const { orderItemId } = req.query
    const session = await unstable_getServerSession(req, res, authOptions)
    if (session == null) {
      res.status(200).json({ items: [], message: `no Session` })
      return
    }
    if (orderItemId == null) {
      res.status(200).json({ items: [], message: `no orderItemID` })
      return
    }
    const wishList = await getComment(String(session.id), Number(orderItemId))
    res.status(200).json({ items: wishList, message: `Success` })
  } catch (error) {
    res.status(400).json({ message: `Failed` })
  }
}
