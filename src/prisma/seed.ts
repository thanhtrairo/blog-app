import { prismaDb } from '~/libs/prisma-db'

const main = async () => {
  await prismaDb.account.create({
    data: {
      username: 'thanhtrairo',
      password: '$2a$10$NHeVkEsc6dbab5LDvAlNIextb0UBli0zF80LM8HaGb1VE9MfsDWzm',
    },
  })
  console.log('create database successfully')
}
main()
  .then(async () => {
    await prismaDb.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prismaDb.$disconnect()
    process.exit(1)
  })
