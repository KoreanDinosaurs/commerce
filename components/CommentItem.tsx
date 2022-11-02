import styled from '@emotion/styled'
import { IconStar } from '@tabler/icons'
import { CommentItemType } from 'pages/products/[id]'
import { format } from 'date-fns'
import CustomEditor from './Editor'
import { convertFromRaw, EditorState } from 'draft-js'

export default function CommentItem({ item }: { item: CommentItemType }) {
  return (
    <Wrapper>
      <div className="flex">
        <div className="flex flex-col">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, idx) => (
              <IconStar
                key={idx}
                fill={idx < item.rate ? 'red' : 'none'}
                stroke={idx < item.rate ? 0 : 1}
              />
            ))}
          </div>
          <span className="text-zinc-300 text-xs">
            {item.price.toLocaleString('ko-kr')} 원 * {item.quantity} 개 ={' '}
            {item.amount.toLocaleString('ko-kr')} 원
          </span>
        </div>
        <p className="text-zinc-300 ml-auto">
          {format(new Date(item.updatedAt), 'yyyy년 M월 d일')}
        </p>
      </div>
      <CustomEditor
        editorState={EditorState.createWithContent(
          convertFromRaw(JSON.parse(item.contents ?? '')),
        )}
        readOnly
        noPadding
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border: 1px solid black;
  border-radius: 8px;
  padding: 8px;
`
