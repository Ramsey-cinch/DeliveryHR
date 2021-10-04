import { useRouter } from 'next/router'
import { useAuth } from '@Context/AuthContext'

export const withProtection = (WrappedComponent) => {
  return function WithAuth(props) {
    const { authedUser, loading } = useAuth()
    const { replace } = useRouter()

    if (typeof window !== 'undefined' && !loading) {
      if (!authedUser) {
        replace('./login')

        return null
      }

      return <WrappedComponent {...props} />
    }

    return null
  }
}
