import { BlogRelated } from './blog-related'

import { SectionHeading } from '~/components/widgets'

import { TPost } from '~/models/post'

type BlogsRelatedProps = {
  data: TPost[]
}

export const BlogsRelated = ({ data }: BlogsRelatedProps) => {
  return (
    <section>
      <SectionHeading>Bài viết liên quan</SectionHeading>
      <div className="mt-8 space-y-8">
        {data.map((item) => (
          <BlogRelated key={item.id} {...item} />
        ))}
      </div>
    </section>
  )
}
