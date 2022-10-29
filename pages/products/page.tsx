import { categories, products } from '@prisma/client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Input, Pagination, SegmentedControl, Select } from '@mantine/core'
import { CATEGORY_MAP, FILTERS, TAKE } from 'constants/products'
import { IconSearch } from '@tabler/icons'
import useDebounce from 'hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'

export default function Products() {
  const [activePage, setPage] = useState(1)
  const [selectedCategory, setCategory] = useState<string>('-1')
  const [selectedFilter, setFilter] = useState<string | null>(FILTERS[0].value)
  const [keyword, setKeyword] = useState<string>('')

  const debouncedKeyword = useDebounce<string>(keyword)

  const { data: categories } = useQuery<
    { items: categories[] },
    unknown,
    categories[]
  >(
    [`/api/get-categories`],
    () => fetch(`/api/get-categories`).then((res) => res.json()),
    {
      select: (data) => data.items,
    },
  )

  const { data: total } = useQuery(
    [
      `/api/get-products-count?category=${selectedCategory}&contains=${debouncedKeyword}`,
    ],
    () =>
      fetch(
        `/api/get-products-count?category=${selectedCategory}&contains=${debouncedKeyword}`,
      )
        .then((res) => res.json())
        .then((data) => Math.ceil(data.items / TAKE)),
  )

  const { data: products } = useQuery<
    { items: products[] },
    unknown,
    products[]
  >(
    [
      `/api/get-products?skip=${
        TAKE * (activePage - 1)
      }&take=${TAKE}&category=${selectedCategory}&orderBy=${selectedFilter}&contains=${debouncedKeyword}`,
    ],
    () =>
      fetch(
        `/api/get-products?skip=${
          TAKE * (activePage - 1)
        }&take=${TAKE}&category=${selectedCategory}&orderBy=${selectedFilter}&contains=${debouncedKeyword}`,
      ).then((res) => res.json()),
    {
      select: (data) => data.items,
    },
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  return (
    <div className="px-36 mt-36 mb-36">
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
      {products && (
        <div className="grid grid-cols-3 gap-5">
          {products.map((item) => {
            return (
              <div key={item.id}>
                <Image
                  className="rounded"
                  src={item.image_url ?? ''}
                  width={300}
                  height={300}
                  layout="responsive"
                  alt={item.name}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=="
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
  )
}
