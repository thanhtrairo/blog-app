import { CAT_SLUG } from './category'

export type TPost = {
  id: string
  slug: string
  title: string
  desc: string
  imgUrl?: string
  views: number
  catSlug: CAT_SLUG | string
  createdAt: Date
}

export type PostCreate = Omit<TPost, 'id' | 'views' | 'createdAt' | 'cat'>

export type PostUpdate = Partial<PostCreate> & {
  id: string
}
