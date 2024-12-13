import { Card } from './card'

import { Pagination, SectionHeading } from '~/components/widgets'

import { TPost } from '~/models/post'

import { POST_PER_PAGE } from '~/libs/constants'

type CardsProps = {
  data: TPost[]
  page: number
  count: number
}

export const Cards = ({ data, page, count }: CardsProps) => {
  const hasPrev = POST_PER_PAGE * (page - 1) > 0
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count

  return (
    <section className="space-y-8">
      <SectionHeading>Bài viết</SectionHeading>
      <div className="space-y-6">
        {data.map((post) => (
          <Card {...post} key={post.id} />
        ))}
      </div>
      {data.length > 0 ? <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} /> : null}
    </section>
  )
}
