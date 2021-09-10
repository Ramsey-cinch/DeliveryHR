import { HomePageBanner } from '../components/HomePageBanner'

export default function Home({ bannerHeading }) {
  return <HomePageBanner heading={bannerHeading} />
}

export async function getStaticProps() {
  return { props: { bannerHeading: 'DeliveryHR' } }
}
