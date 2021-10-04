import { render } from '@testing-library/react'
import { withProtection } from './withProtection'

const mockReplace = jest.fn()
jest.mock('next/router', () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}))

let mockAuthedUser: null | string = '123456'
let mockLoading = false

jest.mock('@Context/AuthContext', () => ({
  useAuth: () => ({
    authedUser: mockAuthedUser,
    loading: mockLoading,
  }),
}))

const text = 'My component'
const Component = () => <p>{text}</p>
const WithProtectionComponent = withProtection(Component)
const renderComponent = () => render(<WithProtectionComponent />)

describe('withProtection', () => {
  beforeEach(() => {
    mockLoading = false
    mockAuthedUser = '12345'
  })

  it('renders a prop component when a user has logged in', () => {
    const { getByText } = renderComponent()
    expect(getByText(text)).toBeInTheDocument()
  })

  it('does not render the protected Component when a user is not logged in', () => {
    mockAuthedUser = null

    const { queryByText } = renderComponent()
    expect(queryByText(text)).not.toBeInTheDocument()
  })

  it('does not render the protected Component when a user is currently logging in', () => {
    mockAuthedUser = null
    mockLoading = true

    const { queryByText } = renderComponent()
    expect(queryByText(text)).not.toBeInTheDocument()
  })

  it('redirects a user to the login page when they are not logged in', () => {
    mockAuthedUser = null

    renderComponent()
    expect(mockReplace).toBeCalledWith('./login')
  })
})
