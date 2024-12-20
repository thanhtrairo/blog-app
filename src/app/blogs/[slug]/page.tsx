import { notFound } from 'next/navigation'

import { BlogContainer } from '~/screens/blog/containers'

import { PostService } from '~/services'

export const dynamic = 'force-static'
export const revalidate = 86400 // every day

export async function generateMetadata({ params }: { params: { slug: string } }) {
  return {
    title: `${params.slug} | thanhtrairo`,
  }
}

const BlogDetailPage = async ({ params: { slug } }: { params: { slug: string } }) => {
  const { post, postsRelated } = await PostService.getDetail({ slug })
  if (!post) {
    notFound()
  }
  return <BlogContainer post={post} postsRelated={postsRelated} />
}

export default BlogDetailPage
