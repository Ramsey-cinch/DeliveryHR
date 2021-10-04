import { Box, Button, Link, Flex, Text, useToast } from '@chakra-ui/react'
import { AuthApi } from '@Firebase-api/auth-api'
import Router from 'next/router'
import useAuth from '@Hooks/useFirebaseAuth'

export default function Navbar() {
  const authApi = new AuthApi()
  const { authedUser, loading } = useAuth()
  const toast = useToast()

  const handleSignout = async () => {
    try {
      await authApi.logout()

      Router.push('./')
    } catch (error) {
      toast({
        title: 'Unable to sign out!',
        description: error.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Box>
        <nav>
          <Flex justifyContent="space-between" padding="16px" bgColor="lightblue" boxShadow="md">
            <Box>
              <Text as="h2">DeliveryHR</Text>
            </Box>

            {authedUser && (
              <Button variant="solid" colorScheme="red" onClick={handleSignout}>
                Logout
              </Button>
            )}

            {!authedUser && !loading && (
              <Flex>
                <Button variant="solid" colorScheme="teal" marginRight="8px">
                  <Link href="/signup">Signup</Link>
                </Button>

                <Button variant="solid" colorScheme="teal" marginLeft="8px">
                  <Link href="/login">Login</Link>
                </Button>
              </Flex>
            )}
          </Flex>
        </nav>
      </Box>
    </>
  )
}
