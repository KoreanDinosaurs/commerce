import Image from 'next/image'
import React from 'react'

import s from './Profile.module.scss'

interface ProfileProps {
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * What do you inserts image(url)
   */
  src: string
  /**
   * Do you want a circular shape?
   */
  rounded?: boolean
  /**
   * Optional click handler
   */
  onClick?: () => void
}

export default function Profile({
  size = 'medium',
  src = 'image/default-profile.jpeg',
  rounded = true,
  ...props
}: ProfileProps) {
  const shape = rounded ? 'storybook-image--rounded' : ''

  let imageSize
  switch (size) {
    case 'small':
      imageSize = 25
      break
    case 'medium':
      imageSize = 30
      break
    case 'large':
      imageSize = 40
      break
    default:
      imageSize = 30
      break
  }
  return (
    <>
      <Image
        src={src}
        className={s[shape]}
        alt="사용자 프로필 이미지"
        width={imageSize}
        height={imageSize}
        layout="fixed"
        {...props}
      />
    </>
  )
}
