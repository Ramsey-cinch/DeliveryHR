import HomePageBanner from '@Components/HomePageBanner'
import { Box } from '@chakra-ui/react'

export default function Home({ bannerHeading }) {
  return (
    <Box>
      <HomePageBanner heading={bannerHeading} />
    </Box>
  )
}

export async function getStaticProps() {
  return { props: { bannerHeading: 'DeliveryHR' } }
}
