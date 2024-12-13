import DOMPurify from 'isomorphic-dompurify'
import Image from 'next/image'

import { BlogsRelated, TableOfContent } from '../components'

import { SectionHeading } from '~/components/widgets'

import { TPost } from '~/models/post'

type BlogContainerProps = {
  post: TPost
  postsRelated: TPost[]
}

export const BlogContainer = ({ post, postsRelated }: BlogContainerProps) => {
  return (
    <section className="lg:-mr-16 2xl:mr-0">
      <article className="mb-20 flex gap-8">
        <div className="space-y-8 lg:basis-4/5">
          <div className="space-y-4">
            <SectionHeading className="whitespace-pre-line text-xl sm:text-2xl lg:text-3xl">
              {post.title}
            </SectionHeading>
            <div className="flex items-center gap-5">
              <Image
                src="/avatar.webp"
                alt="avatar"
                width={50}
                height={50}
                className="rounded-full border-[1px] border-white-c"
              />
              <div className="flex flex-col gap-1">
                <span className="text-lg font-medium">Thanhtrairo</span>
                <span className="text-sm">{new Date(post.createdAt).toDateString()}</span>
              </div>
            </div>
          </div>
          {post?.imgUrl && (
            <div className="relative h-[350px] w-full">
              <Image
                src={post.imgUrl}
                alt={post.title}
                fill={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-left"
              />
            </div>
          )}
          <div
            className="tiptap reset-css-tailwind p-0"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post?.desc) }}
          />
        </div>
        <div className="basis-1/5 max-lg:hidden">
          <TableOfContent />
        </div>
      </article>
      <BlogsRelated data={postsRelated} />
    </section>
  )
}
