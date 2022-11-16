import { Cart } from '@prisma/client'
import instance from '../instance'

export const updateCart = async (item: Omit<Cart, 'id' | 'userId'>) => {
  const response = await instance.post<{ items: undefined }>(
    '/api/add-cart',
    item,
  )
  return response.data.items
}
