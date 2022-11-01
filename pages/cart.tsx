import { CountControl } from '@components/CountControl'
import styled from '@emotion/styled'
import { Button } from '@mantine/core'
import { Cart, OrderItem, products } from '@prisma/client'
import { IconRefresh, IconX } from '@tabler/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CATEGORY_MAP } from 'constants/products'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { ORDER_QUERY_KEY } from './my'

interface CartItem extends Cart {
  name: string
  price: number
  image_url: string
}

export default function CartPage() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data } = useQuery<{ items: CartItem[] }, unknown, CartItem[]>(
    [`/api/get-cart`],
    () =>
      fetch(`/api/get-cart`)
        .then((res) => res.json())
        .then((data) => data.items),
  )

  const amount = useMemo(() => {
    if (data == null) {
      return 0
    }
    return data
      .map((item) => item.amount)
      .reduce((prev, curr) => prev + curr, 0)
  }, [data])
  const dilveryAmount = data && data.length > 0 ? 5000 : 0
  const discountAmount = 0

  const { data: products } = useQuery<
    { items: products[] },
    unknown,
    products[]
  >(
    [`/api/get-products?skip=0&take=3`],
    () => fetch(`/api/get-products?skip=0&take=3`).then((res) => res.json()),
    {
      select: (data) => data.items,
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

  const handleOrder = () => {
    if (data == null) {
      return
    }
    addOrder(
      data?.map((cart) => {
        return {
          productId: cart.productId,
          price: cart.price,
          amount: cart.amount,
          quantity: cart.quantity,
        }
      }),
    )
    alert(`장바구니에 담긴 것들 주문하기`)
  }

  return (
    <>
      <span className="text-2xl mb-3">Cart ({data ? data.length : 0})</span>
      <div className="flex flex-col">
        <div className="flex gap-10">
          <div className="flex flex-col flex-1 gap-4">
            {data ? (
              data.length > 0 ? (
                data.map((item, idx) => {
                  return <Item key={idx} {...item} />
                })
              ) : (
                <div>장바구니에 상품이 없습니다.</div>
              )
            ) : (
              <div>...불러오는 중</div>
            )}
          </div>
          <div
            className="flex flex-col p-4 space-y-4"
            style={{
              minWidth: 300,
              height: 'fit-content',
              border: '1px solid grey',
            }}
          >
            <div>Info</div>
            <Row>
              <span>금액</span>
              <span>{amount.toLocaleString('ko-kr')} 원</span>
            </Row>
            <Row>
              <span>배송비</span>
              <span>{dilveryAmount.toLocaleString('ko-kr')} 원</span>
            </Row>
            <Row>
              <span>할인 금액</span>
              <span>{discountAmount.toLocaleString('ko-kr')} 원</span>
            </Row>
            <Row>
              <span className="font-semibold">결제 금액</span>
              <span className="font-semibold text-red-500">
                {(amount - discountAmount - dilveryAmount).toLocaleString(
                  'ko-kr',
                )}{' '}
                원
              </span>
            </Row>
            <Button
              style={{ backgroundColor: 'black' }}
              radius="xl"
              size="md"
              styles={{ root: { height: 40 } }}
              onClick={handleOrder}
            >
              구매하기
            </Button>
          </div>
        </div>
        <div className="mt-16">
          <p className="font-semibold mb-4">추천상품</p>
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
      </div>
    </>
  )
}

const Item = (props: CartItem) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [quantity, setQuantity] = useState<number | undefined>(props.quantity)
  const amount = useMemo(() => {
    return quantity! * props.price
  }, [quantity, props.price])
  const { mutate: updateCart } = useMutation<string, unknown, Cart, any>(
    (item) =>
      fetch('/api/update-cart', {
        method: 'POST',
        body: JSON.stringify({ item }),
      })
        .then((data) => data.json())
        .then((data) => data.items),
    {
      onMutate: async (item) => {
        await queryClient.cancelQueries(['/api/get-cart'])

        // Snapshot the previous value
        const previous = queryClient.getQueryData(['/api/get-cart'])

        // Optimistically update to the new value
        queryClient.setQueryData<Cart[]>(['/api/get-cart'], (old) =>
          old?.filter((c) => c.id !== item.id).concat(item),
        )

        // Return a context object with the snapshotted value
        return { previous }
      },
      onError: (error, _, context: any) => {
        queryClient.setQueryData(['/api/get-cart'], context.previous)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['/api/get-cart'])
      },
    },
  )
  const { mutate: deleteCart } = useMutation<unknown, unknown, number, any>(
    (id) =>
      fetch('/api/delete-cart', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      })
        .then((res) => res.json())
        .then((data) => data.items),
    {
      onMutate: async (id) => {
        await queryClient.cancelQueries([`/api/get-cart`])

        // Snapshot the previous value
        const previous = queryClient.getQueryData([`/api/get-cart`])

        // Optimistically update to the new value
        queryClient.setQueryData<Cart[]>([`/api/get-cart`], (old) =>
          old?.filter((c) => c.id !== id),
        )

        // Return a context object with the snapshotted value
        return { previous }
      },
      onError: (error, _, context: any) => {
        queryClient.setQueryData(['/api/get-cart'], context.previous)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['/api/get-cart'])
      },
    },
  )
  const handleUpdate = () => {
    if (quantity == null) {
      alert('최소 수량을 선택하세요.')
      return
    }
    updateCart({ ...props, quantity, amount: props.price * quantity })
  }
  const handleDelete = async () => {
    await deleteCart(props.id)
    alert(`장바구니에서 ${props.name} 삭제`)
  }
  return (
    <div className="w-full flex p-4" style={{ borderBottom: '1px solid grey' }}>
      <div className="flex gap-4">
        <Image
          src={props.image_url}
          width={155}
          height={155}
          alt={props.name}
          onClick={() => router.push(`/products/${props.productId}`)}
        />
        <div className="flex flex-col ml-4">
          <span className="font-semibold mb-2">{props.name}</span>
          <span>가격: {props.price.toLocaleString('ko-kr')} 원</span>
          <div className="flex items-center space-x-4 mt-auto">
            <CountControl value={quantity} setValue={setQuantity} max={20} />
            <IconRefresh onClick={handleUpdate} />
          </div>
        </div>
      </div>
      <div className="flex gap-2 ml-auto">
        <span>{amount.toLocaleString('ko-kr')} 원</span>
        <IconX onClick={handleDelete} />
      </div>
    </div>
  )
}

const Row = styled.div`
  display: flex;
  * ~ * {
    margin-left: auto;
  }
`
