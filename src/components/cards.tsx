import Pagination from './pagination'
import SectionHeading from './section-heading'
import Card from './card'
import { getPosts } from '~/services/post-service'

type CardsProps = {
  page: number
  cat: string
}

const POST_PER_PAGE = 2

const Cards = async ({ cat, page }: CardsProps) => {
  const data = await getPosts({ page, cat })
  if (!data) {
    return null
  }

  const { count, posts } = data

  const hasPrev = POST_PER_PAGE * (page - 1) > 0
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count

  return (
    <div className="">
      <SectionHeading>Recent Posts</SectionHeading>
      <div className="">{posts?.map((post) => <Card item={post} key={post.id} />)}</div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  )
}

export default Cards
