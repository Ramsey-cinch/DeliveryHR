import { render } from '@testing-library/react'
import HolidayScheduler from '@Components/HolidayScheduler'

describe('HolidayScheduler', () => {
  it('renders the holiday scheduler component', () => {
    const { getByRole } = render(<HolidayScheduler />)

    expect(getByRole('table')).toBeInTheDocument()
  })
})
