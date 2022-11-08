import { format } from 'date-fns'
import { convertFromRaw, EditorState } from 'draft-js'

import Image from 'next/image'
import { IconStar } from '@tabler/icons'
import CustomEditor from '@components/Editor'
import Profile from '@components/Profile'

import s from './Comment.module.scss'

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
    <div className={s.Container}>
      <Profile src={item.userImage} rounded />
      <div className={s.Wrap}>
        <div>
          <span>{item.userName}</span>
        </div>
        <div>
          <Image
            alt="상품 이미지"
            src={item.productImage}
            width={40}
            height={40}
            layout="fixed"
          />
          <div>
            <span>{item.productName}</span>
            <span>{item.quantity}개 구입</span>
          </div>
        </div>
        <div>
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
      <div className={s.Date}>
        {format(new Date(item.updatedAt), 'yyyy년 M월 d일')}
      </div>
    </div>
  )
}
