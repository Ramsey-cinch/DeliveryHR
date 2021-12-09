import { DocumentData } from '@firebase/firestore'
import { createContext, useContext } from 'react'

interface IHolidayRequests {
  userDetails: DocumentData | null
}

export const userDetailsContext = createContext<IHolidayRequests>({
  userDetails: null,
})

export const useUserDetails = () => useContext(userDetailsContext)
