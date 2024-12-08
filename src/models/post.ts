import { TCategory } from './category'

export type TPost = {
  id: string
  slug: string
  title: string
  desc: string
  imgUrl?: string
  views: number
  catSlug: string
  cat: TCategory
  createdAt: Date
}

export type PostCreate = Omit<TPost, 'id' | 'views' | 'createdAt' | 'cat'>
