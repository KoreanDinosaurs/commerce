import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { convertFromRaw, convertToRaw } from 'draft-js'

import Editor from '@components/Editor'
import Carousel from 'nuka-carousel/lib/carousel'

import { EditorState } from 'draft-js'

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1016/1000/600/',
    thumbnail: 'https://picsum.photos/id/1016/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1013/1000/600/',
    thumbnail: 'https://picsum.photos/id/1013/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1012/1000/600/',
    thumbnail: 'https://picsum.photos/id/1012/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1011/1000/600/',
    thumbnail: 'https://picsum.photos/id/1011/250/150/',
  },
]

export default function Products() {
  const [index, setIndex] = useState(0)

  const router = useRouter()
  const { id: productId } = router.query
  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined,
  )

  useEffect(() => {
    if (!productId) return
    fetch(`/api/get-product?id=${productId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.items.contents) {
          setEditorState(
            EditorState.createWithContent(
              convertFromRaw(JSON.parse(data.items.contents)),
            ),
          )
        } else {
          setEditorState(EditorState.createEmpty())
        }
      })
  }, [productId])

  const handleSave = () => {
    if (editorState) {
      fetch(`/api/update-product`, {
        method: 'POST',
        body: JSON.stringify({
          id: productId,
          contents: JSON.stringify(
            convertToRaw(editorState.getCurrentContent()),
          ),
        }),
      })
        .then((res) => res.json())
        .then(() => {
          alert('Success')
        })
    }
    alert('save')
  }

  return (
    <>
      <Carousel
        animation="fade"
        autoplay
        withoutControls={true}
        wrapAround
        speed={10}
        slideIndex={index}
      >
        {images.map((image, idx) => (
          <Image
            key={idx}
            src={image.original}
            alt="image"
            width={100}
            height={60}
            layout="responsive"
          />
        ))}
      </Carousel>
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          gap: '10px',
          marginTop: '10px',
        }}
      >
        {images.map((item, idx) => {
          return (
            <div key={idx} onClick={() => setIndex(idx)}>
              <Image src={item.original} alt="image" width={100} height={60} />
            </div>
          )
        })}
      </div>
      {editorState && (
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          onSave={handleSave}
        />
      )}
    </>
  )
}
