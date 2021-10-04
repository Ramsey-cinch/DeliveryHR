import { render, screen } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'

import HomePageBanner from './HomePageBanner.component'

describe('HomePageBanner', () => {
  it('Should render homepage banner', () => {
    const heading = 'DeliveryHR-test'
    render(
      <ChakraProvider>
        <HomePageBanner heading={heading} />
      </ChakraProvider>,
    )
    const element = screen.queryByText(heading)

    expect(element).toBeInTheDocument()
  })
})
