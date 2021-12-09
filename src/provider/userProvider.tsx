import useFirebaseAuth from '@Hooks/useFirebaseAuth'
import { userDetailsContext } from '@Context/userDetailsContext'
import { FirestoreApi } from '@Firebase-api/firestore-api'
import { useEffect, useState } from 'react'

export function UserProvider({ children }) {
  const { Provider } = userDetailsContext
  const firestoreApi = new FirestoreApi()
  const { authedUser } = useFirebaseAuth()
  const [userDetails, setUserDetails] = useState(null)

  useEffect(() => {
    if (authedUser) {
      firestoreApi
        .getUserDetails(authedUser.uid)
        .then((result) => {
          setUserDetails(result)
        })
        .catch((err) => console.log(err))
    }
  }, [authedUser])

  return <Provider value={{ userDetails }}>{children}</Provider>
}
