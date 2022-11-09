import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import Image from 'next/image'
import { IconHeart, IconShoppingCart, IconUser } from '@tabler/icons'

import s from './Header.module.scss'

export default function Header() {
  const { data: session } = useSession()
  const router = useRouter()
  return (
    <div className={s.Container}>
      <Image
        src={'/image/brand-logo.png'}
        width={200}
        height={100}
        layout="fixed"
        alt="브랜드 로고 이미지"
        onClick={() => router.push('/')}
      />
      <div>
        <IconHeart onClick={() => router.push('/wishlist')} />
        <IconShoppingCart onClick={() => router.push('/cart')} />
        {session ? (
          <Image
            src={session.user?.image!}
            width={30}
            height={30}
            layout="fixed"
            style={{ borderRadius: '50%' }}
            alt="profile image"
            onClick={() => router.push('/my')}
          />
        ) : (
          <IconUser onClick={() => router.push('/auth/login')} />
        )}
      </div>
    </div>
  )
}
