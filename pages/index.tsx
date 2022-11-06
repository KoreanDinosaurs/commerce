import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import Image from 'next/image'
import Head from '@components/Head'
import { IconSearch } from '@tabler/icons'
import { Input, Pagination, SegmentedControl, Select } from '@mantine/core'

import useDebounce from 'hooks/useDebounce'
import { CATEGORY_MAP, FILTERS, TAKE } from 'constants/products'

import { categories, products } from '@prisma/client'

import ProductSkeleton from '@components/Skeleton/ProductSkeleton'

export default function Home() {
  const router = useRouter()
  const [activePage, setPage] = useState(1)
  const [selectedCategory, setCategory] = useState<string>('-1')
  const [selectedFilter, setFilter] = useState<string | null>(FILTERS[0].value)
  const [keyword, setKeyword] = useState<string>('')

  const debouncedKeyword = useDebounce<string>(keyword)

  const { data: categories } = useQuery<categories[]>({
    queryKey: ['categories'],
    queryFn: () =>
      fetch('api/get-categories')
        .then((res) => res.json())
        .then((data) => data.items),
  })

  const { data: total } = useQuery(
    ['products-count', selectedCategory, debouncedKeyword],
    () =>
      fetch(
        `/api/get-products-count?category=${selectedCategory}&contains=${debouncedKeyword}`,
      )
        .then((res) => res.json())
        .then((data) => Math.ceil(data.items / TAKE)),
  )

  const { data: products, isLoading } = useQuery<products[]>(
    [
      'products',
      TAKE,
      activePage,
      selectedCategory,
      selectedFilter,
      debouncedKeyword,
    ],
    () =>
      fetch(
        `/api/get-products?skip=${
          TAKE * (activePage - 1)
        }&take=${TAKE}&category=${selectedCategory}&orderBy=${selectedFilter}&contains=${debouncedKeyword}`,
      )
        .then((res) => res.json())
        .then(async (data) => {
          return data.items
        }),
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  return (
    <>
      <Head
        title="Next Commerce"
        desc="Next Commerce입니다."
        image={'/public/image/next.png'}
      />

      <div className="mt-10 mb-36">
        <div className="mb-4">
          <Input
            icon={<IconSearch />}
            placeholder="Search Item You Want"
            value={keyword}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4 flex justify-between align-middle">
          {categories && (
            <div className="mb-4">
              <SegmentedControl
                value={selectedCategory}
                onChange={setCategory}
                onClick={() => setPage(1)}
                data={[
                  { label: 'ALL', value: '-1' },
                  ...categories.map((category) => {
                    return { label: category.name, value: String(category.id) }
                  }),
                ]}
                color="dark"
              />
            </div>
          )}
          <Select value={selectedFilter} onChange={setFilter} data={FILTERS} />
        </div>
        {isLoading && (
          <div className="grid grid-cols-3 gap-5">
            {Array.from({ length: 9 }).map((_, idx) => (
              <ProductSkeleton key={idx} />
            ))}
          </div>
        )}
        {products && (
          <div className="grid grid-cols-3 gap-5">
            {products.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => router.push(`/products/${item.id}`)}
                >
                  <Image
                    className="rounded"
                    src={item.image_url ?? ''}
                    width={40}
                    height={40}
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
        {products && !products.length && keyword && (
          <p className="mb-4">
            {`'${keyword}'`}에 대한 검색 결과가 존재하지 않습니다.
          </p>
        )}
        <div className="w-full flex mt-5">
          {total && (
            <Pagination
              className="m-auto"
              page={activePage}
              onChange={setPage}
              total={total}
              color="dark"
            />
          )}
        </div>
      </div>
    </>
  )
}
