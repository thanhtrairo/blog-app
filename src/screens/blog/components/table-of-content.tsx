'use client'

import { useEffect, useState } from 'react'

import { useHeadsObserver } from '../hooks'

import { SectionHeading } from '~/components/widgets'
import { LEVELS_HEADING } from '~/components/widgets/tiptap/extensions'

export const TableOfContent = () => {
  const [headings, setHeadings] = useState<
    {
      id: string
      text: string
      level: number
    }[]
  >([])
  const { activeId } = useHeadsObserver()

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.tiptap h1, h2')).map((elem) => {
      const htmlElem = elem as HTMLElement
      return {
        id: htmlElem.id,
        text: htmlElem.innerText,
        level: Number(htmlElem.nodeName.charAt(1)),
      }
    })
    setHeadings(elements)
  }, [])

  const getClassName = (level: LEVELS_HEADING) => {
    switch (level) {
      case LEVELS_HEADING.LEVEL1:
        return 'pl-0'
      case LEVELS_HEADING.LEVEL2:
        return 'pl-4'
      default:
        return ''
    }
  }

  return (
    <nav className="sticky top-12 mt-40 max-h-[calc(100vh-70px)] self-start overflow-auto">
      <SectionHeading className="mb-4">Mục lục</SectionHeading>
      <ul>
        {headings.map((heading) => (
          <li key={heading.id} className={`mb-4 ${getClassName(heading.level)}`}>
            <a
              href={`#${heading.id}`}
              style={{
                fontWeight: activeId === heading.id ? 'bold' : 'normal',
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
