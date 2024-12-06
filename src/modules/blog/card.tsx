import { Post } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

type CardProps = {
  item: Post
}

const Card = ({ item }: CardProps) => {
  return (
    <div className="mb-12 flex items-center gap-12">
      {item.img && (
        <div className="relative h-[350px] flex-1">
          <Image src={item.img} alt="" fill className="object-cover object-center" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-8">
        <div className="">
          <span className="text-gray-c">{item.createdAt.toDateString()} - </span>
          <span className="font-medium text-red-600">{item.catSlug}</span>
        </div>
        <Link href={`/posts/${item.slug}`}>
          <h1>{item.title}</h1>
        </Link>
        {/* <p className={styles.desc}>{item.desc.substring(0, 60)}</p> */}
        <div
          className="text-lg font-light text-gray-c"
          dangerouslySetInnerHTML={{ __html: item?.desc.substring(0, 60) }}
        />
        <Link href={`/posts/${item.slug}`} className="w-max border-[1px] border-solid border-red-600 py-1">
          Read More
        </Link>
      </div>
    </div>
  )
}

export default Card
