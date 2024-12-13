'use client'

import Image from 'next/image'
import React from 'react'

import { useThemeContext } from '~/contexts/theme-context'

export const ThemeSwitch = () => {
  const { toggleTheme } = useThemeContext()

  return (
    <div
      className="relative flex h-5 w-10 cursor-pointer items-center justify-between rounded-[50px] bg-black-c dark:bg-white"
      onClick={toggleTheme}
    >
      <Image src="/moon.webp" alt="moon" width={14} height={14} />
      <div className="absolute right-[1px] h-4 w-4 rounded-[50%] bg-white dark:left-[1px] dark:bg-black-c" />
      <Image src="/sun.webp" alt="sun" width={14} height={14} />
    </div>
  )
}
