import { DocumentData } from '@firebase/firestore'
import { createContext, useContext } from 'react'

interface IHolidayRequests {
  holidayRequests: DocumentData[] | null
}

export const requestContext = createContext<IHolidayRequests>({
  holidayRequests: null,
})

export const useRequests = () => useContext(requestContext)
