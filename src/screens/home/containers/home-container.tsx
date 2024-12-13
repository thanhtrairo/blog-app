import { Cards, Categories } from '../components'

import { TPost } from '~/models/post'

type HomeContainerProps = {
  page: number
  count: number
  posts: TPost[]
}

export const HomeContainer = ({ page, count, posts }: HomeContainerProps) => {
  return (
    <div className="flex gap-12 max-lg:flex-col">
      <div className="basis-4/5">
        <Cards data={posts} page={page} count={count} />
      </div>
      <div className="basis-1/5">
        <Categories />
      </div>
    </div>
  )
}
