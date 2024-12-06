import Card from './card'

import Pagination from '~/components/pagination'
import SectionHeading from '~/components/section-heading'

import { PostService } from '~/services'

type CardsProps = {
  page?: number
  cat?: string
}

const POST_PER_PAGE = 2
const DEFAULT_PAGE = 1

const Cards = async ({ cat, page = DEFAULT_PAGE }: CardsProps) => {
  const data = await PostService.getAll({ cat, page })
  return null
  if (!data) {
    return null
  }

  const { count, posts } = data

  const hasPrev = POST_PER_PAGE * (page - 1) > 0
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count

  return (
    <div>
      <SectionHeading>Bài viết</SectionHeading>
      <div>{posts?.map((post) => <Card item={post} key={post.id} />)}</div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  )
}

export default Cards
