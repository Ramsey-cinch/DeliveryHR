import { differenceInBusinessDays, format } from 'date-fns'

export const dateRangeToHours = (from: Date, to: Date): number => {
  const dateDuration = differenceInBusinessDays(to, from)

  return dateDuration
}

export const getDayMonthYear = (date: string): string => {
  const dayMonthYear = 'eeee io MMMM yyyy'

  return format(new Date(date), dayMonthYear)
}
