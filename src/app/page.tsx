import { HomeContainer } from '~/screens/home/containers'

const HomePage = ({ searchParams: { page, cat } }: { searchParams: { page: string; cat: string } }) => {
  return <HomeContainer page={page} cat={cat} />
}

export default HomePage
