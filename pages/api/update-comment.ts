import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { authOptions } from './auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'

const prisma = new PrismaClient()

async function updateComment({
  userId,
  orderItemId,
  rate,
  contents,
}: {
  userId: string
  orderItemId: number
  rate: number
  contents: string
}) {
  try {
    const userInfo = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    let response
    if (userInfo !== null) {
      response = await prisma.comment.upsert({
        where: {
          orderItemId,
        },
        update: {
          contents,
          rate,
          userName: userInfo.name,
          userImage: userInfo.image,
        },
        create: {
          userId,
          orderItemId,
          contents,
          rate,
          userName: userInfo.name,
          userImage: userInfo.image,
        },
      })
    } else {
      response = await prisma.comment.upsert({
        where: {
          orderItemId,
        },
        update: {
          contents,
          rate,
        },
        create: {
          userId,
          orderItemId,
          contents,
          rate,
        },
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
    const session = await unstable_getServerSession(req, res, authOptions)
    const { orderItemId, rate, contents } = JSON.parse(req.body)
    if (session == null) {
      res.status(400).json({ items: [], message: `no Session` })
    }
    const products = await updateComment({
      userId: String(session?.id),
      orderItemId: Number(orderItemId),
      rate,
      contents,
    })
    res.status(200).json({ items: products, message: `Success` })
  } catch (error) {
    res.status(400).json({ message: `Failed` })
  }
}
