import { prismaDb } from '~/utils/prisma-db'

const main = async () => {
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
