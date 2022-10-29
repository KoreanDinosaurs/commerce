export const CATEGORY_MAP = ['Sneakers', 'T-shirt', 'Pants', 'Cap', 'Hoodie']

export const TAKE = 9

export const FILTERS = [
  { label: '최신순', value: 'latest' },
  { label: '가격 높은 순', value: 'expensive' },
  { label: '가격 낮은 순', value: 'cheap' },
]

export const getOrderBy = (orderBy: string) => {
  let orderByCondition
  switch (orderBy) {
    case 'cheap':
      orderByCondition = { orderBy: { price: 'asc' } }
      break
    case 'expensive':
      orderByCondition = { orderBy: { price: 'desc' } }
      break
    default:
      orderByCondition = { orderBy: { createdAt: 'desc' } }
      break
  }
  return orderBy ? orderByCondition : null
}
