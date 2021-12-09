import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '../src/provider/AuthProvider'
import { RequestProvider } from '../src/provider/requestProvider'
import { UserProvider } from '../src/provider/userProvider'
import Layout from '../src/components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <RequestProvider>
          <UserProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </UserProvider>
        </RequestProvider>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
