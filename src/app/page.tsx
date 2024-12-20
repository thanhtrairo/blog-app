import { HomeContainer } from '~/screens/home/containers'

import { CAT_SLUG } from '~/models/category'

import { PostService } from '~/services'

const HomePage = async ({ searchParams: { page, cat } }: { searchParams: { page: string; cat: string } }) => {
  const newCat = Object.values(CAT_SLUG).includes(cat as CAT_SLUG) ? cat : undefined
  const { posts, count } = await PostService.getAll({ page, cat: newCat })

  return <HomeContainer page={Number(page)} count={count} posts={posts} />
}

export default HomePage
