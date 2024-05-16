import Link from 'next/link'

import { getCategories } from '~/services/category-service'
import SectionHeading from './section-heading'

const Categories = async () => {
  const categories = await getCategories()

  return (
    <section>
      <SectionHeading>Popular Categories</SectionHeading>
      <div className="2x:grid-cols-6 grid lg:grid-cols-4">
        {categories?.map((category) => (
          <Link
            href="/blog?cat=style"
            className="flex h-20 items-center justify-center gap-3 rounded-xl bg-[#7fb88133] capitalize"
            key={category.id}
          >
            {category.title}
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Categories
