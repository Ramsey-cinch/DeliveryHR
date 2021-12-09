import { useState, useEffect } from 'react'
import { firebaseClient } from '@Firebase/firebaseClient'

interface IAuthedUser {
  uid: string
  email: string
}

export default function useFirebaseAuth() {
  const { auth } = firebaseClient()
  const [authedUser, setAuthedUser] = useState<IAuthedUser | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthedUser(null)
      setLoading(false)
      return
    }

    setLoading(true)
    setAuthedUser({
      uid: authState.uid,
      email: authState.email,
    })
    setLoading(false)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged)

    return () => unsubscribe()
  }, [auth])

  return {
    authedUser,
    loading,
  }
}
