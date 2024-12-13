import { NextResponse } from 'next/server'

import { POST_PER_PAGE } from '~/libs/constants'
import { prismaDb } from '~/libs/prisma-db'

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const page = Number(searchParams.get('page'))
  const cat = searchParams.get('cat')

  const where = {
    ...(cat && { catSlug: cat }),
  }

  try {
    const [posts, count] = await prismaDb.$transaction([
      prismaDb.post.findMany({
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * (page - 1),
        where,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prismaDb.post.count({ where }),
    ])
    return NextResponse.json({ posts, count })
  } catch (err) {
    return new NextResponse(JSON.stringify({ message: err }), { status: 500 })
  }
}

export const POST = async (req: Request) => {
  try {
    const body = await req.json()
    const post = await prismaDb.post.create({
      data: body,
    })

    return new NextResponse(JSON.stringify(post))
  } catch (err) {
    console.log('err', err)
    return new NextResponse(JSON.stringify({ message: err }), { status: 500 })
  }
}

export const PATCH = async (req: Request) => {
  try {
    const { id, ...body } = await req.json()
    const post = await prismaDb.post.update({
      where: { id },
      data: body,
    })

    return new NextResponse(JSON.stringify(post))
  } catch (err) {
    console.log('err', err)
    return new NextResponse(JSON.stringify({ message: err }), { status: 500 })
  }
}
