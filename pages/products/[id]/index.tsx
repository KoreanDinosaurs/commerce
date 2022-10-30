import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { convertFromRaw } from 'draft-js'

import Editor from '@components/Editor'
import Carousel from 'nuka-carousel/lib/carousel'

import { EditorState } from 'draft-js'
import { GetServerSidePropsContext } from 'next'
import { products } from '@prisma/client'
import { format } from 'date-fns'
import { CATEGORY_MAP } from 'constants/products'
import { useSession } from 'next-auth/react'
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { Button } from '@mantine/core'
import { IconHeartbeat, IconHeart } from '@tabler/icons'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const product = await fetch(
    `http://localhost:3000/api/get-product?id=${context.params?.id}`,
  )
    .then((res) => res.json())
    .then((data) => data.items)
  return {
    props: {
      product: { ...product, images: [product.image_url, product.image_url] },
    },
  }
}
export default function Products(props: {
  product: products & { images: string[] }
}) {
  const [index, setIndex] = useState(0)
  const { data: session } = useSession()
  const router = useRouter()
  const { id: productId } = router.query
  const queryClient = useQueryClient()
  const [editorState] = useState<EditorState | undefined>(() =>
    props.product.contents
      ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(props.product.contents)),
        )
      : EditorState.createEmpty(),
  )
  const { data: wishList }: { data: string[] | undefined } = useQuery(
    ['wishList'],
    () =>
      fetch('/api/get-wishlist')
        .then((res) => res.json())
        .then((data) => data.items),
  )
  const { mutate } = useMutation<string, unknown, string>(
    (productId) =>
      fetch('/api/update-wishlist', {
        method: 'POST',
        body: JSON.stringify({ productId }),
      })
        .then((data) => data.json())
        .then((data) => data.items),
    {
      onMutate: async (productId) => {
        await queryClient.cancelQueries(['wishList'])

        // Snapshot the previous value
        const previous = queryClient.getQueryData(['wishList'])

        // Optimistically update to the new value
        queryClient.setQueryData<string[]>(['wishList'], (old) =>
          old
            ? old.includes(String(productId))
              ? old.filter((id) => id !== String(productId))
              : old.concat(String(productId))
            : [],
        )

        // Return a context object with the snapshotted value
        return { previous }
      },
      onError: (error, _, context: any) => {
        queryClient.setQueryData(['wishList'], context.previous)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['wishList'])
      },
    },
  )
  const product = props.product
  const isWished = wishList ? wishList.includes(productId as string) : false

  return (
    <>
      {product !== null && productId !== null ? (
        <div className="p-24 flex flex-row">
          <div style={{ maxWidth: 600, marginRight: 52 }}>
            <Carousel
              animation="fade"
              autoplay
              withoutControls={true}
              wrapAround
              speed={10}
              slideIndex={index}
            >
              {product.images.map((url, idx) => (
                <Image
                  key={`${url}-carousel-${idx}`}
                  src={url}
                  alt="image"
                  width={600}
                  height={600}
                  // layout="responsive"
                />
              ))}
            </Carousel>
            <div className="flex space-x-3 mt-2">
              {product.images.map((url, idx) => {
                return (
                  <div
                    key={`${url}-thumb-${idx}`}
                    onClick={() => setIndex(idx)}
                  >
                    <Image src={url} alt="image" width={100} height={100} />
                  </div>
                )
              })}
            </div>
            {editorState && <Editor editorState={editorState} readOnly />}
          </div>
          <div style={{ maxWidth: 600 }} className="flex flex-col space-y-6">
            <div className="text-lg text-zinc-400">
              {CATEGORY_MAP[product.category_id - 1]}
            </div>
            <div className="text-4xl font-semibold"> {product.name}</div>
            <div className="text-lg">
              {product.price.toLocaleString('ko-kr')}원
            </div>

            <Button
              // loading={isLoading}
              disabled={wishList == null}
              leftIcon={
                isWished ? (
                  <IconHeart size={20} stroke={1.5} />
                ) : (
                  <IconHeartbeat size={20} stroke={1.5} />
                )
              }
              style={{ backgroundColor: isWished ? 'red' : 'grey' }}
              radius="xl"
              size="md"
              styles={{ root: { paddingRight: 14, height: 40 } }}
              onClick={() => {
                if (session == null) {
                  alert('로그인이 필요해요')
                  router.push('/auth/login')
                  return
                }
                mutate(productId as string)
              }}
            >
              찜하기
            </Button>
            <div className="text-sm  text-zinc-300">
              등록: {format(new Date(product.createdAt), 'yyyy년 M월 d일')}
            </div>
          </div>
        </div>
      ) : (
        <div>로딩중</div>
      )}
    </>
  )
}
