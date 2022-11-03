import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { convertFromRaw } from 'draft-js'

import Editor from '@components/Editor'
import Carousel from 'nuka-carousel/lib/carousel'

import { EditorState } from 'draft-js'
import { GetServerSidePropsContext } from 'next'
import { Cart, OrderItem, products, Comment } from '@prisma/client'
import { format } from 'date-fns'
import { CATEGORY_MAP } from 'constants/products'
import { useSession } from 'next-auth/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from '@mantine/core'
import { IconHeartbeat, IconHeart, IconShoppingCart } from '@tabler/icons'
import { CountControl } from '@components/CountControl'
import { ORDER_QUERY_KEY } from 'pages/my'
import CommentItem from '@components/CommentItem'
import { server } from 'config'
import Head from 'next/head'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const product = await fetch(
    `${server}/api/get-product?id=${context.params?.id}`,
  )
    .then((res) => res.json())
    .then((data) => data.items)
  const comments = await fetch(
    `${server}/api/get-comments?productId=${context.params?.id}`,
  )
    .then((res) => res.json())
    .then((data) => data.items)
  return {
    props: {
      product: { ...product, images: [product.image_url, product.image_url] },
      comments,
    },
  }
}

export interface CommentItemType extends Comment, OrderItem {}

export default function Products(props: {
  product: products & { images: string[] }
  comments: CommentItemType[]
}) {
  const [index, setIndex] = useState(0)
  const [quantity, setQuantity] = useState<number | undefined>(1)
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
      onError: (_, __, context: any) => {
        queryClient.setQueryData(['wishList'], context.previous)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['wishList'])
      },
    },
  )
  const { mutate: addCart } = useMutation<
    unknown,
    unknown,
    Omit<Cart, 'id' | 'userId'>
  >(
    (item) =>
      fetch('/api/add-cart', {
        method: 'POST',
        body: JSON.stringify({ item }),
      })
        .then((data) => data.json())
        .then((data) => data.items),
    {
      onMutate: () => {
        queryClient.invalidateQueries(['/api/get-cart'])
      },
      onSuccess: () => {
        router.push('/cart')
      },
    },
  )
  const { mutate: addOrder } = useMutation<
    unknown,
    unknown,
    Omit<OrderItem, 'id'>[],
    any
  >(
    (items) =>
      fetch('/api/add-order', {
        method: 'POST',
        body: JSON.stringify({ items }),
      })
        .then((data) => data.json())
        .then((data) => data.items),
    {
      onMutate: () => {
        queryClient.invalidateQueries([ORDER_QUERY_KEY])
      },
      onSuccess: () => {
        router.push('/my')
      },
    },
  )
  const product = props.product
  const isWished = wishList ? wishList.includes(productId as string) : false
  const validate = (type: 'cart' | 'order') => {
    if (type == 'cart') {
      alert('장바구니로 이동')
      addCart({
        productId: product.id,
        quantity: quantity!,
        amount: product.price * quantity!,
      })
    }
    if (type == 'order') {
      addOrder([
        {
          productId: product.id,
          quantity: quantity!,
          amount: product.price * quantity!,
          price: product.price,
        },
      ])
    }
  }
  return (
    <>
      <Head>
        <title>{props.product.name}</title>
        <meta name="description" content={props.product.contents!} />
        <meta property="og:title" content={props.product.name} />
        <meta property="og:description" content={props.product.contents!} />
        <meta property="og:image" content={props.product.image_url!} />
      </Head>
      {product !== null && productId !== null ? (
        <div className="flex flex-row">
          <div style={{ maxWidth: 600, marginRight: 52 }}>
            <Carousel
              animation="fade"
              // autoplay
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
                  width={500}
                  height={500}
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
            <div className="flex gap-4 items-center">
              <span className="text-lg">수량</span>
              <CountControl value={quantity} setValue={setQuantity} />
            </div>
            <div className="flex gap-4">
              <Button
                leftIcon={<IconShoppingCart />}
                style={{ backgroundColor: 'black' }}
                radius="xl"
                size="md"
                styles={{ root: { paddingRight: 14, height: 40 } }}
                onClick={() => {
                  if (session == null) {
                    alert('로그인이 필요해요')
                    router.push('/auth/login')
                    return
                  }
                  validate('cart')
                }}
              >
                장바구니
              </Button>
              <Button
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
            </div>
            <Button
              style={{ backgroundColor: 'black' }}
              radius="xl"
              size="md"
              styles={{ root: { paddingRight: 14, height: 40 } }}
              onClick={() => {
                if (session == null) {
                  alert('로그인이 필요해요')
                  router.push('/auth/login')
                  return
                }
                validate('order')
              }}
            >
              구매하기
            </Button>
            <div className="text-sm  text-zinc-300">
              등록: {format(new Date(product.createdAt), 'yyyy년 M월 d일')}
            </div>
          </div>
        </div>
      ) : (
        <div>로딩중</div>
      )}
      <div>
        <p className="text-2xl font-semibold">후기</p>
        {props.comments &&
          props.comments.map((comment, idx) => (
            <CommentItem key={idx} item={comment} />
          ))}
      </div>
    </>
  )
}
