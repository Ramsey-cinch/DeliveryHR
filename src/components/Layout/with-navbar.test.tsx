import Layout from './with-navbar.layout'
import { render } from '@testing-library/react'

jest.mock('../Navbar', () => () => <p>Navbar</p>)

describe('Layout', () => {
  it('render the Layout component with its children', () => {
    const { getByText } = render(
      <Layout>
        <p>Child component</p>
      </Layout>,
    )

    expect(getByText('Child component')).toBeInTheDocument()
    expect(getByText('Navbar')).toBeInTheDocument()
  })
})
