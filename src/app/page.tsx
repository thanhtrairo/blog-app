import { HomeContainer } from '~/screens/home/containers'

import { CAT_SLUG } from '~/models/category'

import { DEFAULT_PAGE } from '~/libs/constants'

import { PostService } from '~/services'

const HomePage = async ({
  searchParams: { page = DEFAULT_PAGE, cat },
}: {
  searchParams: { page: string | number; cat: string }
}) => {
  const newCat = Object.values(CAT_SLUG).includes(cat as CAT_SLUG) ? cat : undefined
  const { posts, count } = await PostService.getAll({ page: Number(page), cat: newCat })

  return <HomeContainer page={Number(page)} count={count} posts={posts} />
}

export default HomePage
