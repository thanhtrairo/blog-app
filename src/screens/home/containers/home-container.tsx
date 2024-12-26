import { Suspense } from 'react'

import { Cards, CardsLoading, Categories } from '../components'

import { SectionHeading } from '~/components/widgets'

type HomeContainerProps = {
  page?: string
  cat?: string
}

export const HomeContainer = ({ cat, page }: HomeContainerProps) => {
  return (
    <div className="flex gap-12 max-lg:flex-col">
      <div className="basis-4/5">
        <section className="space-y-8">
          <SectionHeading>Bài viết</SectionHeading>
          <Suspense key={`page=${page}&cat=${cat}`} fallback={<CardsLoading />}>
            <Cards cat={cat} page={page} />
          </Suspense>
        </section>
      </div>
      <div className="basis-1/5">
        <Categories />
      </div>
    </div>
  )
}
