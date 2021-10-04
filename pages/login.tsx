import { FC, useState, MouseEvent, ChangeEvent } from 'react'
import { Box, Button, Flex, FormLabel, FormControl, Input, Link, Divider, Text, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { AuthApi } from '@Firebase-api/auth-api'

const Login: FC = () => {
  const firebaseAuth = new AuthApi()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const toast = useToast()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await firebaseAuth.login({ email, password })

      router.replace('./dashboard')
    } catch (error) {
      toast({
        title: 'Unable to sign in!',
        description: error.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
  }

  return (
    <Flex flexDirection="column" marginTop="100px">
      <Box textAlign="center">
        <Text fontSize="6xl" fontWeight="bold" marginBottom="12px" color="coral">
          DeliveryHR
        </Text>
      </Box>
      <Box
        width="25%"
        justifyContent="space-around"
        margin="0 auto"
        border="1px solid whitesmoke"
        padding="16px"
        borderRadius="16px"
        boxShadow="md"
        textAlign="center"
      >
        <Text fontSize="2xl" fontWeight="bold" marginBottom="4px">
          Login
        </Text>
        <Box width="80%" justifyContent="space-around" margin="0 auto" textAlign="center">
          <FormControl id="email" marginBottom="12px">
            <FormLabel fontSize="small">email</FormLabel>
            <Input type="email" onChange={(e) => setEmail(e.target.value)} data-testid="email" />
          </FormControl>
          <FormControl id="password" marginBottom="24px">
            <FormLabel fontSize="small">password</FormLabel>
            <Input
              data-testid="password"
              type="password"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              errorBorderColor="crimson"
            />
          </FormControl>
          <Button
            data-testid="button"
            variant="solid"
            colorScheme="teal"
            onClick={(e: MouseEvent<HTMLButtonElement>) => handleSubmit(e)}
            width="100%"
            marginBottom="24px"
            disabled={!email && !password}
          >
            Login
          </Button>
          <Divider margin="16px auto" />
          <Link href="/signup" color="blue">
            Create an account
          </Link>
        </Box>
      </Box>
    </Flex>
  )
}

export default Login
