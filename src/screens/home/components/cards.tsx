import { Card } from './card'

import { PaginationCustom as Pagination } from '~/components/widgets'

import { CAT_SLUG } from '~/models/category'

import { PostService } from '~/services'

type CardsProps = {
  page?: string
  cat?: string
}

export const Cards = async ({ page, cat }: CardsProps) => {
  const newCat = Object.values(CAT_SLUG).includes(cat as CAT_SLUG) ? cat : undefined
  const { posts, totalPage } = await PostService.getAll({ page, cat: newCat })
  if (posts.length === 0) {
    return <p>Không tìm thấy bài viết nào</p>
  }

  return (
    <>
      <div className="space-y-6">
        {posts.map((post) => (
          <Card {...post} key={post.id} />
        ))}
      </div>
      {totalPage > 0 ? <Pagination totalPage={totalPage} className="justify-center px-12 py-4" /> : null}
    </>
  )
}
