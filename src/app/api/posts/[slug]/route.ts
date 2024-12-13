import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'

import { POST_PER_PAGE } from '~/libs/constants'
import { prismaDb } from '~/libs/prisma-db'

export const GET = async (_req: Request, { params: { slug } }: { params: { slug: string } }) => {
  if (!slug) {
    return new NextResponse('Missing slug', { status: 400 })
  }

  try {
    const post = await prismaDb.post.findFirst({
      where: {
        slug,
      },
    })
    if (!post) {
      return new NextResponse('Post not found', { status: 404 })
    }

    let conditions: Prisma.PostWhereInput = {
      catSlug: post.catSlug,
      NOT: {
        id: post.id,
      },
    }
    const totalPostsRelated = await prismaDb.post.count({
      where: conditions,
    })
    if (totalPostsRelated < POST_PER_PAGE) {
      conditions = {
        NOT: {
          id: post.id,
        },
      }
    }

    const postsRelated = await prismaDb.post.findMany({
      where: conditions,
      orderBy: {
        createdAt: 'desc',
      },
    })
    const postsRelatedSort = postsRelated
      .sort((a, b) => {
        if (a.catSlug === post.catSlug && b.catSlug === post.catSlug) {
          return 0
        }
        if (a.catSlug === post.catSlug) {
          return -1
        }

        if (b.catSlug === post.catSlug) {
          return 1
        }
        return a.catSlug.localeCompare(b.catSlug)
      })
      .slice(0, POST_PER_PAGE)

    return NextResponse.json({ post, postsRelated: postsRelatedSort })
  } catch (err) {
    return new NextResponse(JSON.stringify({ message: err }), { status: 500 })
  }
}
