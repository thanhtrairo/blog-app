import { notFound } from 'next/navigation'

import { BlogWriteContainer } from '~/screens/blog/containers'

import { PostService } from '~/services'

const WritePageDetail = async ({ params: { slug } }: { params: { slug: string } }) => {
  const { post } = await PostService.getDetail({ slug })
  if (!post) {
    notFound()
  }
  return <BlogWriteContainer initialData={post} />
}

export default WritePageDetail
