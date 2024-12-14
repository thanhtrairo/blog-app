import { Metadata } from 'next'

import { BlogWriteContainer } from '~/screens/blog/containers'

export const metadata: Metadata = {
  title: 'Viết blog | thanhtrairo',
}

const WritePage = () => {
  return <BlogWriteContainer />
}

export default WritePage
