import dynamic from 'next/dynamic'

import { EditorProps, EditorState } from 'react-draft-wysiwyg'
import { Dispatch, SetStateAction } from 'react'

import styled from '@emotion/styled'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import Button from './Button'

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  {
    ssr: false,
  },
)

export default function CustomEditor({
  editorState,
  readOnly = false,
  noPadding = false,
  onSave,
  onEditorStateChange,
}: {
  editorState: EditorState
  onEditorStateChange?: Dispatch<SetStateAction<EditorState | undefined>>
  onSave?: () => void
  readOnly?: boolean
  noPadding?: boolean
}) {
  return (
    <>
      <Wrapper readOnly={readOnly} noPadding={noPadding}>
        <Editor
          readOnly={readOnly}
          editorState={editorState}
          toolbarHidden={readOnly}
          toolbarClassName="wrapper-class"
          wrapperClassName="editorToolbar-hidden"
          editorClassName="editor-class"
          toolbar={{ options: ['inline', 'list', 'textAlign', 'link'] }}
          localization={{ locale: 'ko' }}
          onEditorStateChange={onEditorStateChange}
        />
        {!readOnly && (
          <Button label="Save" onClick={onSave} primary rounded size="medium" />
        )}
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div<{ readOnly: boolean; noPadding: boolean }>`
  ${(props) => (props.noPadding ? '' : 'padding: 16px;')}
  ${(props) =>
    props.readOnly ? '' : 'border: 1px solid black; border-radius: 8px;'}
`
