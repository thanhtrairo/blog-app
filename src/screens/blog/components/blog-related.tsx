import Image from 'next/image'
import Link from 'next/link'

import { CAT_SLUG, imgByCat } from '~/models/category'
import { TPost } from '~/models/post'

export const BlogRelated = ({ catSlug, createdAt, slug, title }: TPost) => {
  return (
    <Link href={slug} className="flex flex-col gap-8">
      <div className="flex gap-1">
        <div className="flex flex-col gap-1">
          <Image alt="catSlug" src={imgByCat[catSlug as CAT_SLUG]} width={24} height={24} />
          <h3 className="text-lg font-medium">{title}</h3>
          <div className="text-xs">
            <span>Thanhtrairo</span>
            <span className="text-gray-500"> - {new Date(createdAt).toDateString()}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
