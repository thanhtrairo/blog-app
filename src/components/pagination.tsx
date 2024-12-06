'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

type PaginationProps = {
  page: number
  hasPrev: boolean
  hasNext: boolean
}

const Pagination = ({ page, hasPrev, hasNext }: PaginationProps) => {
  const router = useRouter()

  return (
    <div className="flex justify-between">
      <button
        className="w-24 cursor-pointer border-none bg-red-600 p-4 text-white"
        disabled={!hasPrev}
        onClick={() => router.push(`?page=${page - 1}`)}
      >
        Previous
      </button>
      <button
        disabled={!hasNext}
        className="cursor-not-allowed disabled:opacity-75"
        onClick={() => router.push(`?page=${page + 1}`)}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
