import { render } from '@testing-library/react'
import HolidayRequest from './holiday-request.component'

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

describe('HolidayRequest', () => {
  afterEach(() => {
    mockAuthedUser = '12345'
  })

  it('renders the holiday request page when a user is logged in', () => {
    const { getByText } = render(<HolidayRequest />)

    expect(getByText('DeliveryHR')).toBeInTheDocument()
  })

  it('Does not render the holiday request page when a user has not logged in', () => {
    mockAuthedUser = null
    const { queryByText } = render(<HolidayRequest />)

    expect(queryByText('DeliveryHR')).not.toBeInTheDocument()
  })
})
