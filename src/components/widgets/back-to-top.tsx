'use client'

import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

const SCROLL_THRESHOLD = 500

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD)
    }
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      className={`fixed bottom-5 right-5 rounded-full bg-gray-800 p-3 text-white shadow-lg transition-all hover:bg-gray-700 ${isVisible ? 'opacity-100' : 'opacity-0'} duration-300 ease-in-out`}
      onClick={scrollToTop}
    >
      <ArrowUp className="h-6 w-6" />
    </button>
  )
}
