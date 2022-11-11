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
   * Please fill it out in case the image cannot be displayed!
   */
  alt: string
  /**
   * How do you set the image layout?
   */
  layout?: 'fixed' | 'fill' | 'intrinsic' | 'responsive' | undefined
  /**
   * Optional click handler
   */
  onClick?: () => void
}

export default function Profile({
  size = 'medium',
  src = 'image/default-profile.jpeg',
  rounded = true,
  alt,
  layout = 'fixed',
  ...props
}: ProfileProps) {
  const shape = rounded ? 'c-profile__image--shape-rounded' : ''

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
        alt={alt}
        width={imageSize}
        height={imageSize}
        layout={layout}
        {...props}
      />
    </>
  )
}
