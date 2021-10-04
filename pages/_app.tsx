import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '../src/provider/AuthProvider'
import Layout from '../src/components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
