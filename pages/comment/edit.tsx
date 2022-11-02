import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'

import CustomEditor from '@components/Editor'
import { Slider } from '@mantine/core'

export default function Edit() {
  const router = useRouter()
  const { orderItemId } = router.query
  const [rate, setRate] = useState(5)
  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined,
  )

  useEffect(() => {
    if (!orderItemId) return
    fetch(`/api/get-comment?orderItems=${orderItemId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.items.contents) {
          setEditorState(
            EditorState.createWithContent(
              convertFromRaw(JSON.parse(data.items.contents)),
            ),
          )
          setRate(data.items.rate)
        } else {
          setEditorState(EditorState.createEmpty())
        }
      })
  }, [orderItemId])

  const handleSave = () => {
    if (editorState) {
      fetch(`/api/update-comment`, {
        method: 'POST',
        body: JSON.stringify({
          orderItemId: Number(orderItemId),
          rate,
          contents: JSON.stringify(
            convertToRaw(editorState.getCurrentContent()),
          ),
          images: [],
        }),
      })
        .then((res) => res.json())
        .then(() => {
          alert('Success')
          router.back()
        })
    }
  }

  return (
    <div>
      {editorState && (
        <CustomEditor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          onSave={handleSave}
        />
      )}
      <Slider
        defaultValue={5}
        min={1}
        max={5}
        step={1}
        onChange={setRate}
        marks={[
          { value: 1 },
          { value: 2 },
          { value: 3 },
          { value: 4 },
          { value: 5 },
        ]}
      />
    </div>
  )
}
