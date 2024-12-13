'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { SectionHeading } from '~/components/widgets'

import { catOptionsForFilter } from '~/models/category'

export const Categories = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const params = new URLSearchParams(searchParams as unknown as URLSearchParams)
  const [active, setActive] = useState(params.get('cat') || 'all')

  const handleChangeCat = (value: string) => {
    if (value) {
      params.set('cat', value)
      setActive(value)
    } else {
      params.delete('cat')
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <section className="space-y-8">
      <SectionHeading>Danh mục</SectionHeading>
      <div className="flex flex-wrap gap-2 sm:gap-4">
        {catOptionsForFilter?.map((category) => (
          <span
            className={`cursor-pointer rounded-xl px-6 py-3 text-sm dark:text-black-c ${active === category.value ? 'bg-blue-300' : 'bg-blue-100'}`}
            key={category.value}
            onClick={() => handleChangeCat(category.value)}
          >
            {category.label}
          </span>
        ))}
      </div>
    </section>
  )
}
