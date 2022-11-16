import instance from '../instance'

export const getWishlist = async () => {
  const response = await instance.get<{ items: string[] }>('/api/get-wishlist')
  return response.data.items
}

export const updateWishlist = async (productId: string) => {
  const response = await instance.post<{ items: string }>(
    '/api/update-wishlist',
    productId,
  )
  return response.data.items
}
