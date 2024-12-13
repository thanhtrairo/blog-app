import { NextResponse } from 'next/server'

import { comparePassword } from '~/libs/bcrypt'
import { prismaDb } from '~/libs/prisma-db'

export const POST = async (req: Request) => {
  try {
    const { username, password } = await req.json()
    const account = await prismaDb.account.findUnique({
      where: {
        username,
      },
    })
    if (!account) {
      throw new Error(`Account not found`)
    }

    const isPassword = comparePassword(password, account.password)
    if (!isPassword) {
      throw new Error('Password does not match')
    }

    await prismaDb.account.update({
      where: {
        id: account.id,
      },
      data: {
        lastLogin: new Date(),
      },
    })
    return new NextResponse(JSON.stringify(account))
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error }), { status: 500 })
  }
}
