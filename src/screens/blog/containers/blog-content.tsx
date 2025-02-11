'use client'

import DOMPurify from 'isomorphic-dompurify'

import { useMediumZoom, useProcessedCode } from '../hooks'

export const BlogContent = ({ desc }: { desc: string }) => {
  useMediumZoom()
  const { descProcessedCode } = useProcessedCode(desc)

  return (
    <div
      className="tiptap reset-css-tailwind p-0"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(descProcessedCode, { ADD_TAGS: ['iframe'] }) }}
    />
  )
}
