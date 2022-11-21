import { useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import Image from 'next/image'
import Head from '@components/Head'
import ProductSkeleton from '@components/Skeleton/ProductSkeleton'
import { Pagination, SegmentedControl } from '@mantine/core'

import useDebounce from 'hooks/useDebounce'
import { CATEGORY_MAP, FILTERS, TAKE } from 'constants/products'

import { categories, products } from '@prisma/client'
import Search from '@components/Search'
import Select from '@components/Select'

import styles from 'styles/pages/Index.module.scss'

export default function Home() {
  const router = useRouter()
  const [activePage, setPage] = useState(1)
  const [selectedCategory, setCategory] = useState<string>('-1')
  const [selectedFilter, setFilter] = useState<string>(FILTERS[0].value)
  const [search, setSearch] = useState<string>('')

  const debouncedKeyword = useDebounce<string>(search)

  const { data: categories } = useQuery<
    categories[],
    unknown,
    categories[],
    [string]
  >({
    queryKey: ['categories'],
    queryFn: () =>
      fetch('api/get-categories')
        .then((res) => res.json())
        .then((data) => data.items),
  })

  const { data: total } = useQuery<number>(
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

  const highlightedText = useCallback((text: string, query: string) => {
    if (query === '') return text
    if (query !== '') {
      const parts = text.split(new RegExp(`(${query})`, 'gi'))
      return (
        <>
          {parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
              <mark key={index}>{part}</mark>
            ) : (
              part
            ),
          )}
        </>
      )
    }
  }, [])

  return (
    <>
      <Head
        title="Next Commerce"
        desc="Next Commerce입니다."
        image={'/public/image/next.png'}
      />
      <div className={styles.main}>
        <div className={styles.main__search}>
          <Search
            value={search}
            setValue={setSearch}
            placeholder="Search Item You Want"
            leftIcon
            rightIcon
            width="100%"
          />
        </div>
        <div className={styles.main__toolbar}>
          {categories && (
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
          )}
          <Select value={selectedFilter} onChange={setFilter} data={FILTERS} />
        </div>
        {isLoading && (
          <div className={styles.main__item}>
            {Array.from({ length: 9 }).map((_, idx) => (
              <ProductSkeleton key={idx} />
            ))}
          </div>
        )}
        {products && (
          <div className={styles.main__item}>
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
                  <div className={styles.main__item_container}>
                    <span className={styles['main__item--title']}>
                      {highlightedText(item.name, debouncedKeyword)}
                    </span>
                    <span
                      className={styles['main__item--price']}
                    >{`${item.price.toLocaleString('ko-KR')}원`}</span>
                  </div>
                  <span className={styles['main__item--category']}>
                    {CATEGORY_MAP[item.category_id - 1]}
                  </span>
                </div>
              )
            })}
          </div>
        )}
        {products && !products.length && search && (
          <p className={styles['main__item--null']}>
            {`'${search}'`}에 대한 검색 결과가 존재하지 않습니다.
          </p>
        )}
        <div className={styles.main__pagination}>
          {!!total && (
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
