import { useState, useEffect } from 'react'
import { firebaseClient } from '@Firebase/firebaseClient'

export default function useFirebaseAuth() {
  const { auth } = firebaseClient()
  const [authedUser, setAuthedUser] = useState(null)
  const [loading, setLoading] = useState(true)

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
