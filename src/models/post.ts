import { TCategory } from './category'

export type IPost = {
  id: string
  slug: string
  title: string
  desc: string
  img?: string
  views: number
  catSlug: string
  cat: TCategory
  createdAt: Date
}
