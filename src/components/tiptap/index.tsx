'use client'

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import { EditorContent, EditorEvents, Extensions, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import DOMPurify from 'isomorphic-dompurify'
import { createLowlight } from 'lowlight'
import { forwardRef, useEffect, useRef, useState } from 'react'

import { Toolbar } from './components'
import { Video } from './extensions'

import css from 'highlight.js/lib/languages/css'

const lowlight = createLowlight()
lowlight.register('js', js)
lowlight.register('ts', ts)
lowlight.register('html', html)
lowlight.register('css', css)

type TiptapProps = {
  disabled?: boolean
  content: string
  onChange: (content: string) => void
}

const Tiptap = forwardRef<HTMLDivElement, TiptapProps>(({ disabled = false, content, onChange }, forwardRef) => {
  const [filesSrc, setFilesSrc] = useState<string[]>([])
  const [fileIds, setFileIds] = useState<string[]>([])
  const filesSrcRef = useRef<string[]>([])

  const extractId = (url: string) => {
    const lastSlashIndex = url.lastIndexOf('/')
    const filename = url.substring(lastSlashIndex + 1)
    const uuid = filename.split('.')[0]
    return uuid
  }

  const extractIdsFromArray = (urls: string[]) => {
    return urls.map((url) => extractId(url))
  }

  const handleUpdate = ({ editor }: EditorEvents['update']) => {
    if (!editor) {
      return
    }
    const images = editor.$nodes('image')
    const videos = editor.$nodes('video')
    const imagesSrc = images?.map((image) => image.attributes.src) || []
    const videoSrc = videos?.map((video) => video.attributes.src) || []
    const filesSrc = [...imagesSrc, ...videoSrc]
    const filesSrcRemove = filesSrcRef.current.filter((src) => !filesSrc.includes(src))
    const fileIds = extractIdsFromArray(filesSrcRemove)
    setFileIds(fileIds)
    setFilesSrc(filesSrc)
    console.log('images', images)
    onChange(editor.getHTML())
  }

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: 'leading-6 min-h-6',
          },
        },
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: '',
        },
        defaultLanguage: 'js',
      }),
      Video,
      Underline,
      Link.configure({
        HTMLAttributes: {
          class: 'underline hover:text-blue-600',
        },
      }),
      Placeholder.configure({
        placeholder: 'Viết mô tả ...',
        emptyNodeClass:
          'first:before:text-gray-500 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none',
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'w-full max-h-[420px] object-left object-cover',
        },
      }),
    ] as Extensions,
    content,
    editorProps: {
      attributes: {
        class:
          'prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc [&_*]:m-0 [&_*]:p-0 [&_h1]:text-3xl [&_h2]:text-2xl py-4 px-6 min-h-60',
      },
    },
    immediatelyRender: false,
    onUpdate: handleUpdate,
  })

  useEffect(() => {
    ;(async () => {
      try {
        if (fileIds.length > 0) {
          editor?.setEditable(false)
          // await FileService.removeMulti(fileIds)
          editor?.setEditable(true)
        }
      } catch (error) {
        alert('Lỗi hệ thống khi xóa files')
      }
    })()
  }, [editor, fileIds])

  useEffect(() => {
    filesSrcRef.current = filesSrc
  }, [filesSrc])

  useEffect(() => {
    if (!editor) {
      return
    }
    const images = editor.$nodes('image')
    const videos = editor.$nodes('video')
    const imagesSrc = images?.map((image) => image.attributes.src) || []
    const videoSrc = videos?.map((video) => video.attributes.src) || []
    const filesSrc = [...imagesSrc, ...videoSrc]
    setFilesSrc(filesSrc)
  }, [editor])

  return (
    <div className="max-h-[90dvh] w-full overflow-auto">
      {disabled ? (
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
      ) : (
        <>
          <Toolbar editor={editor} />
          <EditorContent
            className="max-h-[80dvh] overflow-auto whitespace-pre-line border border-input"
            editor={editor}
            ref={forwardRef}
          />
        </>
      )}
    </div>
  )
})
Tiptap.displayName = 'Tiptap'

export default Tiptap
