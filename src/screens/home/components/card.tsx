import DOMPurify from 'isomorphic-dompurify'
import Image from 'next/image'
import Link from 'next/link'

import { CAT_SLUG, imgByCat } from '~/models/category'
import { TPost } from '~/models/post'

const NUMBER_OF_CHARACTERS = 160

export const Card = ({ imgUrl, createdAt, catSlug, title, slug, desc }: TPost) => {
  const inputString = DOMPurify.sanitize(desc)
  const startIndex = inputString.indexOf('<p')
  const croppedString = inputString.slice(startIndex, startIndex + NUMBER_OF_CHARACTERS)

  return (
    <div className="flex items-center gap-12">
      {imgUrl && (
        <Link href={`/blogs/${slug}`} className="relative h-64 flex-1 max-sm:hidden">
          <Image
            src={imgUrl}
            alt={title}
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-md object-cover object-center"
          />
        </Link>
      )}
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-c">{new Date(createdAt).toDateString()} - </span>
          <Image alt="catSlug" src={imgByCat[catSlug as CAT_SLUG]} width={32} height={32} />
        </div>
        <Link href={`/blogs/${slug}`}>
          <h1 className="text-lg">{title}</h1>
        </Link>
        <div
          className="tiptap reset-css-tailwind line-clamp-2 p-0 text-lg font-light text-gray-c"
          dangerouslySetInnerHTML={{ __html: croppedString }}
        />
        <Link href={`/blogs/${slug}`} className="border-b-solid w-max border-b-[1px] border-b-red-500 py-1">
          Đọc thêm
        </Link>
      </div>
    </div>
  )
}
