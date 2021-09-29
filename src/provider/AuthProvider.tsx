import useFirebaseAuth from '@Hooks/useFirebaseAuth'
import { authContext } from '@Context/AuthContext'

export function AuthProvider({ children }) {
  const { Provider } = authContext
  const auth = useFirebaseAuth()

  return <Provider value={auth}>{children}</Provider>
}
