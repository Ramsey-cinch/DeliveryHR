import { render } from '@testing-library/react'
import Dashboard from './dashboard.component'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      replace: jest.fn(),
    }
  },
}))

let mockAuthedUser: string | null = '12345'

jest.mock('@Context/AuthContext', () => ({
  useAuth: () => ({
    authedUser: mockAuthedUser,
    loading: false,
  }),
}))

describe('Dashboard', () => {
  afterEach(() => {
    mockAuthedUser = '12345'
  })

  it('renders the dashboard page when a user is logged in', () => {
    const { getByText } = render(<Dashboard />)

    expect(getByText('Dashboard')).toBeInTheDocument()
  })

  it('Does not render the dashboard page when a user has not logged in', () => {
    mockAuthedUser = null
    const { queryByText } = render(<Dashboard />)

    expect(queryByText('Dashboard')).not.toBeInTheDocument()
  })
})
