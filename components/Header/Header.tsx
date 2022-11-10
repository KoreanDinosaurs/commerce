import { useRouter } from 'next/router'

import Image from 'next/image'
import { IconHeart, IconShoppingCart, IconUser } from '@tabler/icons'

import s from './Header.module.scss'
import Profile from '@components/Profile'

interface HeaderProps {
  session: any
}

export default function Header({ session }: HeaderProps) {
  const router = useRouter()
  return (
    <div className={s.Container}>
      <Image
        src={'/image/brand-logo.png'}
        width={150}
        height={75}
        layout="fixed"
        alt="브랜드 로고 이미지"
        onClick={() => router.push('/')}
      />
      <div>
        <IconHeart onClick={() => router.push('/wishlist')} />
        <IconShoppingCart onClick={() => router.push('/cart')} />
        {session ? (
          <Profile
            src={session.user?.image!}
            onClick={() => router.push('/my')}
            // layout="fixed"
            rounded
            // alt="profile image"
            size="small"
          />
        ) : (
          <IconUser onClick={() => router.push('/auth/login')} />
        )}
      </div>
    </div>
  )
}
