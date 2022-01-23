import { render } from '@testing-library/react'
import Dashboard from '@Pages/dashboard'

let mockAuthedUser: string | null = '12345'
let mockHolidayRequests = []

jest.mock('next/router', () => ({
  useRouter() {
    return {
      replace: jest.fn(),
    }
  },
}))

jest.mock('@Context/AuthContext', () => ({
  useAuth: () => ({
    authedUser: mockAuthedUser,
    loading: false,
  }),
}))

jest.mock('@Context/requestContext', () => ({
  useRequests: () => ({
    holidayRequests: mockHolidayRequests,
  }),
}))

describe('Dashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockAuthedUser = '12345'
  })

  it('renders the dashboard page when a user is logged in', () => {
    const { getByRole } = render(<Dashboard />)

    expect(getByRole('table')).toBeInTheDocument()
  })

  it('Does not render the dashboard page when a user has not logged in', () => {
    mockAuthedUser = null
    mockHolidayRequests = null
    const { queryByText } = render(<Dashboard />)

    expect(queryByText('No Holiday requests made')).not.toBeInTheDocument()
  })
})
