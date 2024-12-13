'use client'

import Code from '@tiptap/extension-code'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import { EditorContent, EditorEvents, Extensions, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { createLowlight } from 'lowlight'
import { forwardRef, useEffect, useRef, useState } from 'react'
import ImageResize from 'tiptap-extension-resize-image'

import { Toolbar } from './components'
import { Heading, Video } from './extensions'

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

export const Tiptap = forwardRef<HTMLDivElement, TiptapProps>(({ disabled = false, content, onChange }, forwardRef) => {
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
    onChange(editor.view.dom.innerHTML)
  }

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: 'leading-7',
          },
        },
        codeBlock: false,
        heading: false,
      }),
      Heading,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Code,
      Video,
      Underline,
      Link.configure({
        HTMLAttributes: {
          class: 'underline hover:text-blue-600',
        },
      }),
      Placeholder.configure({
        placeholder: 'Tell your story...',
        emptyNodeClass:
          'first:before:text-gray-500 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none',
      }),
      ImageResize,
    ] as Extensions,
    content,
    editorProps: {
      attributes: {
        class: 'reset-css-tailwind min-h-60 ',
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
        alert('System error while deleting files')
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
        <div dangerouslySetInnerHTML={{ __html: content }} />
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
