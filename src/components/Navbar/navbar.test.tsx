import Navbar from './navbar.component'
import { render, fireEvent } from '@testing-library/react'

let mockAuthedUser: string | null = null

const mockLogout = jest.fn()

jest.mock('@Firebase-api/auth-api', () => ({
  AuthApi: () => ({
    logout: mockLogout,
  }),
}))

jest.mock('@Hooks/useFirebaseAuth', () => () => ({
  authedUser: mockAuthedUser,
  loading: false,
}))

describe('Navbar', () => {
  it('renders the navbar component', () => {
    const { getByText } = render(<Navbar />)

    expect(getByText('DeliveryHR')).toBeInTheDocument()
  })

  it('renders the signup and login buttons when a user is not logged in', () => {
    const { getByText } = render(<Navbar />)

    expect(getByText('Signup')).toBeInTheDocument()
    expect(getByText('Login')).toBeInTheDocument()
  })

  it('does not render the logout button when a user is not logged in', () => {
    const { queryByText } = render(<Navbar />)

    expect(queryByText('Logout')).not.toBeInTheDocument()
  })

  describe('logged in', () => {
    it('renders the logout button when a user is logged in', () => {
      mockAuthedUser = '12345'
      const { getByText } = render(<Navbar />)

      expect(getByText('Logout')).toBeInTheDocument()
    })

    it('does not render the login and signup buttons when a user is logged in', () => {
      mockAuthedUser = '12345'
      const { queryByText } = render(<Navbar />)

      expect(queryByText('Signup')).not.toBeInTheDocument()
      expect(queryByText('Login')).not.toBeInTheDocument()
    })

    it('calls the firebase logout method when a user logs out', () => {
      mockAuthedUser = '12345'
      const { getByText } = render(<Navbar />)
      const logoutButton = getByText('Logout')
      fireEvent.click(logoutButton)

      expect(mockLogout).toHaveBeenCalled()
    })
  })
})
