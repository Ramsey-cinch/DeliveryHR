import useFirebaseAuth from '@Hooks/useFirebaseAuth'
import { requestContext } from '@Context/requestContext'
import { FirestoreApi } from '@Firebase-api/firestore-api'
import { useEffect, useState } from 'react'

export function RequestProvider({ children }) {
  const { Provider } = requestContext
  const firestoreApi = new FirestoreApi()
  const { authedUser } = useFirebaseAuth()
  const [holidayRequests, setHolidayRequests] = useState(null)

  useEffect(() => {
    if (authedUser) {
      firestoreApi
        .getAllHolidayRequests({ userId: authedUser.uid })
        .then((result) => {
          setHolidayRequests(result)
        })
        .catch((err) => console.log(err))
    }
  }, [authedUser])

  return <Provider value={{ holidayRequests }}>{children}</Provider>
}
