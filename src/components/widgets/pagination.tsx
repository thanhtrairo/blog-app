'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination'

import { DEFAULT_PAGE } from '~/libs/constants'

type PaginationProps = {
  totalPage: number
  className?: string
}

export const PaginationCustom = ({ totalPage, className }: PaginationProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const currentPage = Number(searchParams.get('page')) || DEFAULT_PAGE
  const disablePrevPage = currentPage <= 1
  const disableNextPage = currentPage >= totalPage
  const arrayPages = Array.from({ length: totalPage }, (_, i) => i + 1)

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams as unknown as URLSearchParams)
    params.set('page', pageNumber.toString())
    router.replace(`${pathname}?${params.toString()}`)
  }

  const handlePrevPage = () => {
    if (disablePrevPage) {
      return
    }
    createPageURL(currentPage - 1)
  }

  const handleNextPage = () => {
    if (disableNextPage) {
      return
    }
    createPageURL(currentPage + 1)
  }

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`${disablePrevPage ? '!opacity-50 hover:bg-white' : 'cursor-pointer opacity-100'} !text-black`}
            onClick={handlePrevPage}
          />
        </PaginationItem>
        {arrayPages.map((item) => (
          <PaginationItem key={item}>
            <PaginationLink
              isActive={item === currentPage}
              onClick={() => createPageURL(item)}
              className={`!w-10 cursor-pointer ${item === currentPage && 'border-4'}`}
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            className={`${disableNextPage ? '!opacity-50 hover:bg-white' : 'cursor-pointer opacity-100'} !text-black`}
            onClick={handleNextPage}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
