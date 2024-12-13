'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

type PaginationProps = {
  page: number
  hasPrev: boolean
  hasNext: boolean
}

export const Pagination = ({ page, hasPrev, hasNext }: PaginationProps) => {
  const router = useRouter()

  return (
    <div className="flex justify-between">
      <button
        className="w-24 cursor-pointer border-none bg-red-500 p-4 text-white disabled:cursor-default disabled:opacity-75"
        disabled={!hasPrev}
        onClick={() => router.push(`?page=${page - 1}`)}
      >
        Quay lại
      </button>
      <button
        disabled={!hasNext}
        className="cursor-pointer disabled:cursor-default disabled:opacity-75"
        onClick={() => router.push(`?page=${page + 1}`)}
      >
        Tiếp theo
      </button>
    </div>
  )
}
