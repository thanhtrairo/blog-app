import { useEffect, useRef, useState } from 'react'

export const useHeadsObserver = () => {
  const observer = useRef<IntersectionObserver>()
  const initialEntries = useRef<IntersectionObserverEntry[]>([])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      if (initialEntries.current.length < entries.length) {
        initialEntries.current = entries
      }
      initialEntries.current = initialEntries.current.map((entry) => {
        const newEntry = entries.find((entryChange) => {
          return entryChange.target.id === entry.target.id
        })
        return newEntry ?? entry
      })
      for (const entry of initialEntries.current) {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id)
          break
        }
      }
    }
    observer.current = new IntersectionObserver(handleObserver, {
      threshold: 0.5,
    })
    const elements = document.querySelectorAll('.tiptap h1, h2')
    elements.forEach((elem) => observer.current?.observe(elem))

    return () => observer.current?.disconnect()
  }, [])

  return { activeId }
}
