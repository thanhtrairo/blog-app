'use client'

import { type Editor } from '@tiptap/react'
import {
  Bold,
  ChevronLeft,
  Code,
  Film,
  Heading1,
  Heading2,
  ImageIcon,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Underline,
  Undo,
} from 'lucide-react'

import { Bulkhead } from './bulkhead'
import { Hyperlink } from './hyperlink'
import { Table } from './table'

import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

import { FileService } from '~/services'

type ToolbarProps = {
  editor: Editor | null
}

export const Toolbar = ({ editor }: ToolbarProps) => {
  if (!editor) {
    return null
  }

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files && e.target.files[0]
      if (!file) {
        return
      }
      const fileType = file.type.includes('video') ? 'video' : 'image'
      const formData = new FormData()
      formData.append('file', file)
      editor.setEditable(false)
      const {
        uploadedImageData: { url, resource_type },
      } = await FileService.create(formData, fileType)
      editor.setEditable(true)

      if (resource_type.includes('image')) {
        editor.chain().focus().setImage({ src: url }).run()
      }
      if (resource_type.includes('video')) {
        editor.chain().focus().insertContent(`<video src="${url}#t=1" />`).run()
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert('System error')
      }
    }

    e.target.value = ''
  }

  return (
    <div className="w-full rounded-tl-md rounded-tr-md border border-input px-4 py-2">
      <div className="flex w-full flex-wrap items-center justify-start gap-2">
        <button
          type="button"
          onClick={() => {
            editor.chain().focus().toggleBold().run()
          }}
          className={`${editor.isActive('bold') ? 'bg-theme rounded-lg dark:text-white' : 'text-gray-500'} p-2`}
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => {
            editor.chain().focus().toggleItalic().run()
          }}
          className={`${editor.isActive('italic') ? 'bg-theme rounded-lg dark:text-white' : 'text-gray-500'} p-2`}
        >
          <Italic className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => {
            editor.chain().focus().toggleUnderline().run()
          }}
          className={`${editor.isActive('underline') ? 'bg-theme rounded-lg dark:text-white' : 'text-gray-500'} p-2`}
        >
          <Underline className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => {
            editor.chain().focus().toggleStrike().run()
          }}
          className={`${editor.isActive('strike') ? 'bg-theme rounded-lg dark:text-white' : 'text-gray-500'} p-2`}
        >
          <Strikethrough className="h-4 w-4" />
        </button>
        <Bulkhead />
        <button
          type="button"
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }}
          className={`${editor.isActive('heading', { level: 1 }) ? 'bg-theme rounded-lg dark:text-white' : 'text-gray-500'} p-2`}
        >
          <Heading1 className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }}
          className={`${editor.isActive('heading', { level: 2 }) ? 'bg-theme rounded-lg dark:text-white' : 'text-gray-500'} p-2`}
        >
          <Heading2 className="h-4 w-4" />
        </button>
        <Bulkhead />
        <Table editor={editor} />
        <Bulkhead />
        <Hyperlink editor={editor} />
        <Bulkhead />
        <button
          type="button"
          onClick={() => {
            editor.chain().focus().toggleCode().run()
          }}
          className={`${editor.isActive('code') ? 'bg-theme rounded-lg dark:text-white' : 'text-gray-500'} p-2`}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => {
            editor.chain().focus().toggleCodeBlock().run()
          }}
          className={`${editor.isActive('codeBlock') ? 'bg-theme rounded-lg dark:text-white' : 'text-gray-500'} p-2`}
        >
          <Code className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => {
            editor.chain().focus().toggleBlockquote().run()
          }}
          className={`${editor.isActive('blockquote') ? 'bg-theme rounded-lg dark:text-white' : 'text-gray-500'} p-2`}
        >
          <Quote className="h-4 w-4" />
        </button>
        <Bulkhead />
        <button
          type="button"
          onClick={() => {
            editor.chain().focus().toggleBulletList().run()
          }}
          className={`${editor.isActive('bulletList') ? 'bg-theme rounded-lg dark:text-white' : 'text-gray-500'} p-2`}
        >
          <List className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => {
            editor.chain().focus().toggleOrderedList().run()
          }}
          className={`${editor.isActive('orderedList') ? 'bg-theme rounded-lg dark:text-white' : 'text-gray-500'} p-2`}
        >
          <ListOrdered className="h-4 w-4" />
        </button>
        <Bulkhead />
        <div>
          <Label htmlFor="tiptap-image-upload">
            <ImageIcon className="h-4 w-4" />
          </Label>
          <Input type="file" accept="image/*" id="tiptap-image-upload" className="hidden" onChange={handleChangeFile} />
        </div>
        <Bulkhead />
        <div>
          <Label htmlFor="tiptap-video-upload">
            <Film className="h-4 w-4" />
          </Label>
          <Input
            type="file"
            accept="video/mp4,video/x-m4v,video/*"
            id="tiptap-video-upload"
            className="hidden"
            onChange={handleChangeFile}
          />
        </div>
        <Bulkhead />
        <button
          type="button"
          onClick={() => {
            editor.chain().focus().undo().run()
          }}
          className={`${editor.isActive('undo') ? 'bg-theme rounded-lg dark:text-white' : 'text-gray-500'} p-2`}
        >
          <Undo className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => {
            editor.chain().focus().redo().run()
          }}
          className={`${editor.isActive('redo') ? 'bg-theme rounded-lg dark:text-white' : 'text-gray-500'} p-2`}
        >
          <Redo className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
