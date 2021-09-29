import { createContext, useContext } from 'react'

export const authContext = createContext({
  authedUser: null,
  loading: true,
})

export const useAuth = () => useContext(authContext)
