import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { authOptions } from './auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'

const prisma = new PrismaClient()

async function updateWishList(productId: string, userId: string) {
  try {
    const wishList = await prisma.wishList.findUnique({
      where: {
        userId,
      },
    })
    const originWishList =
      wishList?.productIds != null && wishList?.productIds !== ''
        ? wishList.productIds.split(',')
        : []
    const isWished = originWishList.includes(productId)
    const updateWishList = isWished
      ? originWishList.filter((id) => id !== productId)
      : [...originWishList, productId]
    const response = await prisma.wishList.upsert({
      where: {
        userId,
      },
      update: {
        productIds: updateWishList.join(','),
      },
      create: {
        userId,
        productIds: updateWishList.join(','),
      },
    })
    return response?.productIds.split(',')
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
    const { productId } = JSON.parse(req.body)
    if (session == null) {
      res.status(400).json({ items: [], message: `no Session` })
    }
    const products = await updateWishList(
      String(productId),
      String(session?.id),
    )
    res.status(200).json({ items: products, message: `Success` })
  } catch (error) {
    res.status(400).json({ message: `Failed` })
  }
}
