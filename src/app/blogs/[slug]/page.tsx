import { notFound } from 'next/navigation'

import { BlogContainer } from '~/screens/blog/containers'

import { PostService } from '~/services'

const BlogDetailPage = async ({ params: { slug } }: { params: { slug: string } }) => {
  const { post, postsRelated } = await PostService.getDetail({ slug })
  if (!post) {
    notFound()
  }
  return <BlogContainer post={post} postsRelated={postsRelated} />
}

export default BlogDetailPage
