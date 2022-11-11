import { format } from 'date-fns'
import { convertFromRaw, EditorState } from 'draft-js'

import Image from 'next/image'
import { IconStar } from '@tabler/icons'
import CustomEditor from '@components/Editor'
import Profile from '@components/Profile'

import styles from './Comment.module.scss'

export interface CommentProps {
  amount: number

  contents: string

  price: number

  quantity: number

  rate: number

  updatedAt: string | Date

  userName: string

  userImage: string

  productImage: string

  productName: string
}

export function Comment({ item }: { item: CommentProps }) {
  return (
    <div className={styles['c-comment']}>
      <Profile src={item.userImage} rounded alt="프로필 이미지" />
      <div className={styles['l-container']}>
        <div>
          <span className={styles['c-comment__text--username']}>
            {item.userName}
          </span>
        </div>
        <div className={styles['l-wrap']}>
          <Image
            alt="상품 이미지"
            src={item.productImage}
            width={40}
            height={40}
            layout="fixed"
          />
          <div className={styles['l-product']}>
            <span className={styles['c-comment__text-product-name']}>
              {item.productName}
            </span>
            <span>{item.quantity}개 구입</span>
          </div>
        </div>
        <div className={styles['l-rate']}>
          {Array.from({ length: 5 }).map((_, idx) => (
            <IconStar
              key={idx}
              fill={idx < item.rate ? 'orange' : 'lightgrey'}
              stroke={0}
            />
          ))}
        </div>
        <CustomEditor
          editorState={EditorState.createWithContent(
            convertFromRaw(JSON.parse(item.contents ?? '')),
          )}
          readOnly
          noPadding
        />
      </div>
      <div className={styles['comment__text--date']}>
        {format(new Date(item.updatedAt), 'yyyy년 M월 d일')}
      </div>
    </div>
  )
}
