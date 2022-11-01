import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

const prisma = new PrismaClient()

async function getWishList(userId: string) {
  try {
    const wishList = await prisma.wishList.findUnique({
      where: {
        userId: userId,
      },
    })
    const productsId = wishList?.productIds.split(',').map((id) => Number(id))
    if (productsId && productsId.length > 0) {
      const response = await prisma.products.findMany({
        where: {
          id: {
            in: productsId,
          },
        },
      })
      return response
    }

    return []
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
    if (session == null) {
      res.status(200).json({ items: [], message: `no Session` })
      return
    }
    const wishList = await getWishList(String(session.id))
    res.status(200).json({ items: wishList, message: `Success` })
  } catch (error) {
    res.status(400).json({ message: `Failed` })
  }
}
