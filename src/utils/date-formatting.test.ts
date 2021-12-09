import { dateRangeToHours } from './date-formatting'

describe('#dateRangeToHours', () => {
  const fromDate = new Date('Oct 25 2021 08:00:00')
  const toDate = new Date('Nov 07 2021 12:00:00')

  it('returns the number of business days for a given date range', () => {
    expect(dateRangeToHours(fromDate, toDate)).toEqual(10)
  })

  it('returns the number of business days for a given date range', () => {
    const fromDate = new Date('Oct 25 2021 08:00:00')
    const toDate = new Date('Oct 26 2021 17:00:00')

    expect(dateRangeToHours(fromDate, toDate)).toEqual(1)
  })

  it('returns the number of business days for a given date range', () => {
    const fromDate = new Date('Oct 25 2021 08:00:00')
    const toDate = new Date('Nov 01 2021 17:00:00')

    expect(dateRangeToHours(fromDate, toDate)).toEqual(5)
  })
})
