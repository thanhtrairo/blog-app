'use client'

import { useEffect } from 'react'

const TIME_RESET_COPY = 2000

export const useProcessedCode = (desc: string) => {
  useEffect(() => {
    const copyCode = async (event: Event) => {
      const button = event.target as HTMLButtonElement
      const codeElement = button.previousElementSibling as HTMLElement

      if (codeElement) {
        try {
          const codeText = codeElement.innerText
          await navigator.clipboard.writeText(codeText)

          button.textContent = '✔'
          button.style.color = 'green'
          setTimeout(() => {
            button.textContent = '⧉'
            button.style.color = '#f0f0f0'
          }, TIME_RESET_COPY)
        } catch (err) {
          console.error('Copy failed:', err)
        }
      }
    }

    const copyButtons = document.querySelectorAll('.tiptap .copy-btn')
    copyButtons.forEach((button) => {
      button.addEventListener('click', copyCode)
    })

    return () => {
      copyButtons.forEach((button) => {
        button.removeEventListener('click', copyCode)
      })
    }
  }, [])

  return {
    descProcessedCode: desc
      .replace(/<pre><code/g, '<div class="relative"><pre><code')
      .replace(
        /<\/code><\/pre>/g,
        '</code></pre><button class="copy-btn absolute top-0 right-0 m-2 leading-6 text-white-c border-[1px] w-6 h-6 border-white-c">⧉</button></div>',
      ),
  }
}
