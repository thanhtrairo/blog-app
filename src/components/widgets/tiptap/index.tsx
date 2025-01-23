'use client'

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Underline from '@tiptap/extension-underline'
import { EditorContent, EditorEvents, Extensions, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { createLowlight } from 'lowlight'
import { forwardRef, useEffect, useRef, useState } from 'react'

import { Toolbar } from './components'
import { Heading, Iframe, Image, Video } from './extensions'

import { FileService } from '~/services'

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
  const [filesSrcRemove, setFilesSrcRemove] = useState<string[]>([])
  const filesSrcRef = useRef<string[]>([])

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
    setFilesSrcRemove(filesSrcRemove)
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
      Table.configure({
        resizable: true,
      }),
      Iframe,
      TableRow,
      TableHeader,
      TableCell,
      Heading,
      CodeBlockLowlight.configure({
        lowlight,
      }),
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
      Image,
    ] as Extensions,
    content,
    editorProps: {
      attributes: {
        class: 'reset-css-tailwind min-h-60',
      },
    },
    immediatelyRender: false,
    onUpdate: handleUpdate,
  })

  useEffect(() => {
    ;(async () => {
      try {
        if (filesSrcRemove.length > 0) {
          editor?.setEditable(false)
          await Promise.all(
            filesSrcRemove.map(async (fileSrc) => {
              await FileService.delete(fileSrc)
            }),
          )
          editor?.setEditable(true)
        }
      } catch (error) {
        alert('System error while deleting files')
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filesSrcRemove)])

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
