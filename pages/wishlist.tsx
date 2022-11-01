import { products } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { CATEGORY_MAP } from 'constants/products'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Wishlist() {
  const router = useRouter()
  const { data: products } = useQuery<
    { items: products[] },
    unknown,
    products[]
  >(
    [`/api/get-wishlists/`],
    () => fetch(`/api/get-wishlists/`).then((res) => res.json()),
    {
      select: (data) => data.items,
    },
  )
  return (
    <div>
      <p className="text-xl font-semibold">내가 찜한 상품</p>
      {products && (
        <div className="grid grid-cols-3 gap-5 mt-4">
          {products.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => router.push(`/products/${item.id}`)}
              >
                <Image
                  className="rounded"
                  src={item.image_url ?? ''}
                  width={300}
                  height={300}
                  layout="responsive"
                  alt={item.name}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMUEhaqBwABLgC4ehE0xwAAAABJRU5ErkJggg=="
                />
                <div className="flex gap-4">
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.name}
                  </span>
                  <span className="ml-auto whitespace-nowrap">{`${item.price.toLocaleString(
                    'ko-KR',
                  )}원`}</span>
                </div>
                <span className="text-zinc-400">
                  {CATEGORY_MAP[item.category_id - 1]}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
