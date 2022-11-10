import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { convertFromRaw } from 'draft-js'

import Head from 'components/Head'
import Editor from '@components/Editor'
import Carousel from 'nuka-carousel/lib/carousel'
import Button from '@components/Button/Button'
import { CommentProps, Comment as CommentItem } from '@components/Comment'

import { EditorState } from 'draft-js'
import { GetServerSidePropsContext } from 'next'
import { Cart, OrderItem, products } from '@prisma/client'
import { format } from 'date-fns'
import { CATEGORY_MAP } from 'constants/products'
import { useSession } from 'next-auth/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { IconHeartbeat, IconHeart, IconShoppingCart } from '@tabler/icons'
import { CountControl } from '@components/CountControl'
import { ORDER_QUERY_KEY } from 'pages/my'
import { server } from 'config'

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

export default function Products(props: {
  product: products & { images: string[] }
  comments: CommentProps[]
}) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { id: productId } = router.query
  const { data: session } = useSession()

  const [index, setIndex] = useState(0)
  const [quantity, setQuantity] = useState<number | undefined>(1)
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

        const previous = queryClient.getQueryData(['wishList'])

        queryClient.setQueryData<string[]>(['wishList'], (old) =>
          old
            ? old.includes(String(productId))
              ? old.filter((id) => id !== String(productId))
              : old.concat(String(productId))
            : [],
        )
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
      <Head
        title={props.product.name}
        desc={props.product.contents!}
        image={props.product.image_url!}
      />
      {product !== null && productId !== null ? (
        <div className="flex flex-row px-60">
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
          <div className="flex flex-col space-y-6">
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
                label="장바구니"
                leftIcon={<IconShoppingCart width={20} height={20} />}
                onClick={() => {
                  if (session == null) {
                    alert('로그인이 필요해요')
                    router.push('/auth/login')
                    return
                  }
                  validate('cart')
                }}
                primary
                rounded
                size="medium"
              />
              <Button
                disabled={wishList == null}
                label="찜하기"
                leftIcon={
                  isWished ? (
                    <IconHeart size={20} stroke={1.5} />
                  ) : (
                    <IconHeartbeat size={20} stroke={1.5} />
                  )
                }
                backgroundColor={isWished ? 'red' : 'grey'}
                onClick={() => {
                  if (session == null) {
                    alert('로그인이 필요해요')
                    router.push('/auth/login')
                    return
                  }
                  mutate(productId as string)
                }}
                primary
                rounded
                size="medium"
              />
            </div>
            <Button
              label="구매하기"
              onClick={() => {
                if (session == null) {
                  alert('로그인이 필요해요')
                  router.push('/auth/login')
                  return
                }
                validate('order')
              }}
              backgroundColor="black"
              primary
              rounded
              size="medium"
            />
            <div className="text-sm  text-zinc-300">
              등록: {format(new Date(product.createdAt), 'yyyy년 M월 d일')}
            </div>
          </div>
        </div>
      ) : (
        <div>로딩중</div>
      )}
      {!!props.comments.length && (
        <div className="px-60">
          <p className="text-xl font-semibold mb-4">구매후기</p>
          {props.comments &&
            props.comments.map((comment, idx) => (
              <CommentItem key={idx} item={comment} />
            ))}
        </div>
      )}
    </>
  )
}
