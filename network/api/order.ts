import { OrderItem } from '@prisma/client'
import instance from '../instance'

export const updateOrder = async (item: Omit<OrderItem, 'id'>[]) => {
  const response = await instance.post<{ items: undefined }>(
    '/api/add-order',
    item,
  )
  return response.data.items
}
