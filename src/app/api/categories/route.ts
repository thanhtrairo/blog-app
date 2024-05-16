import { NextResponse } from 'next/server'
import prismaDb from '~/utils/prisma-db'

const GET = async () => {
  try {
    const categories = await prismaDb.category.findMany()
    return NextResponse.json(categories)
  } catch (error) {
    console.log('error', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}

export { GET }
