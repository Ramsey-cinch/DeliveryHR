import { render, screen } from '@testing-library/react'
import { HomePageBanner } from './HomePageBanner'
import { ChakraProvider } from '@chakra-ui/react'

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
