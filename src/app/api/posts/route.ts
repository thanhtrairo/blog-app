import { NextResponse } from 'next/server'

import prismaDb from '~/utils/prisma-db'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const page = Number(searchParams.get('page'))
  const cat = searchParams.get('cat')

  const POST_PER_PAGE = 2

  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      ...(cat && { catSlug: cat }),
    },
  }

  try {
    const [posts, count] = await prismaDb.$transaction([
      prismaDb.post.findMany(query),
      prismaDb.post.count({ where: query.where }),
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
    return new NextResponse(JSON.stringify({ message: err }), { status: 500 })
  }
}
