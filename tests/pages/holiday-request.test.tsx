import { render, fireEvent, waitFor } from '@testing-library/react'
import HolidayRequest from '@Pages/holiday-request'
import { useRouter } from 'next/router'

let mockAuthedUser: string | null = '12345'
const mockPostHolidayRequest = jest.fn()
const mockedUseRouter = useRouter as jest.Mock

jest.mock('next/router')
jest.mock('@Firebase-api/firestore-api', () => ({
  FirestoreApi: function () {
    return { postHolidayRequest: mockPostHolidayRequest }
  },
}))

jest.mock('@Context/AuthContext', () => ({
  useAuth: () => ({
    authedUser: mockAuthedUser,
    loading: false,
  }),
}))

const mockedRouterReplace = jest.fn()
describe('HolidayRequest', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockAuthedUser = '12345'
    mockedUseRouter.mockImplementation(() => ({ route: '/holidayRequest', replace: mockedRouterReplace }))
  })

  it('renders the holiday request page when a user is logged in', () => {
    const { getByText } = render(<HolidayRequest />)

    expect(getByText('DeliveryHR')).toBeInTheDocument()
  })

  it('does not render the holiday request page when a user has not logged in', () => {
    mockAuthedUser = null
    const { queryByText } = render(<HolidayRequest />)

    expect(queryByText('DeliveryHR')).not.toBeInTheDocument()
  })

  it('renders the holiday request form', () => {
    const { getByText } = render(<HolidayRequest />)

    expect(getByText('Make a holiday request')).toBeInTheDocument()
  })

  describe('making a holiday request', () => {
    it('calls the firestore post holiday request api with the correct holiday request information', () => {
      const { getByLabelText, getByRole } = render(<HolidayRequest />)
      const fromInput = getByLabelText('From')
      const numDaysInput = getByLabelText('Number of working days (optional)')
      const numOfHrsInput = getByLabelText('Number of hours (optional)')
      const reasonInput = getByLabelText('Reason for absence')
      const button = getByRole('button')

      fireEvent.change(fromInput, { target: { value: '2021-11-11' } })
      fireEvent.change(numDaysInput, { target: { value: '3' } })
      fireEvent.change(numOfHrsInput, { target: { value: '1' } })
      fireEvent.change(reasonInput, { target: { value: 'Need a break!' } })
      fireEvent.click(button)

      expect(mockPostHolidayRequest).toHaveBeenCalledWith({
        authedUser: '12345',
        fromDate: new Date('2021-11-11'),
        reason: 'Need a break!',
        totalDays: 3,
        totalHours: 1,
      })
    })

    it('redirects the user to the dashboard when a successful holiday request has been made', async () => {
      const { getByLabelText, getByRole } = render(<HolidayRequest />)
      const fromInput = getByLabelText('From')
      const numDaysInput = getByLabelText('Number of working days (optional)')
      const numOfHrsInput = getByLabelText('Number of hours (optional)')
      const reasonInput = getByLabelText('Reason for absence')
      const button = getByRole('button')

      fireEvent.change(fromInput, { target: { value: '2021-11-11' } })
      fireEvent.change(numDaysInput, { target: { value: '3' } })
      fireEvent.change(numOfHrsInput, { target: { value: '1' } })
      fireEvent.change(reasonInput, { target: { value: 'Need a break!' } })
      fireEvent.click(button)

      await waitFor(() => expect(mockedRouterReplace).toBeCalledWith('./dashboard'))
    })
  })
})
