import { useState, ChangeEvent } from 'react'
import {
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  FormControl,
  Input,
  Link,
  Select,
  Text,
  useToast,
} from '@chakra-ui/react'
import Router from 'next/router'
import { AuthApi } from '@Firebase-api/auth-api'

const SignupPage: React.FC = () => {
  const firebase = new AuthApi()
  const [email, setEmail] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [squad, setSquad] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const toast = useToast()

  const onSignupClickHandler = async () => {
    try {
      await firebase.signup({ password, username, email, firstName, lastName, squad })

      Router.push('/dashboard')
    } catch (error) {
      const { message } = error
      firebase.deleteUser()
      toast({
        title: 'Account not created!',
        description: message,
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
    }
  }

  return (
    <Flex flexDirection="column" marginTop="60px">
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
      >
        <Box margin="4px auto" textAlign="center">
          <Text fontSize="2xl" fontWeight="bold" marginBottom="4px">
            Create a new account
          </Text>

          <Text fontSize="m" color="grey">
            To request your holiday
          </Text>
        </Box>

        <Divider marginBottom="24px" />

        <Flex>
          <FormControl id="firstName" marginBottom="12px" marginRight="8px">
            <FormLabel fontSize="small">first name</FormLabel>
            <Input data-testid="firstname" type="text" onChange={(e) => setFirstName(e.target.value)} />
          </FormControl>

          <FormControl id="lastName" marginBottom="12px">
            <FormLabel fontSize="small">last name</FormLabel>
            <Input
              data-testid="lastname"
              type="text"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
            />
          </FormControl>
        </Flex>

        <FormControl id="username" marginBottom="12px">
          <FormLabel fontSize="small">username</FormLabel>
          <Input
            data-testid="username"
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          />
        </FormControl>

        <FormControl id="squad" marginBottom="12px">
          <FormLabel fontSize="small">squad</FormLabel>
          <Select
            data-testid="squad"
            placeholder="Select your squad"
            value={squad}
            onChange={(e) => setSquad(e.target.value)}
          >
            <option value="Delivery">Delivery</option>
            <option value="Inlife">Inlife</option>
            <option value="Landing">Landing</option>
          </Select>
        </FormControl>

        <FormControl id="email" marginBottom="12px">
          <FormLabel fontSize="small">email</FormLabel>
          <Input data-testid="email" type="email" onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <FormControl id="password" marginBottom="12px" marginRight="8px">
          <FormLabel fontSize="small">password</FormLabel>
          <Input
            data-testid="password"
            type="password"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            errorBorderColor="crimson"
          />
        </FormControl>

        <Flex flexDirection="column" textAlign="center" alignItems="center">
          <Button
            data-testid="button"
            onClick={onSignupClickHandler}
            variant="solid"
            colorScheme="teal"
            marginBottom="16px"
            width="60%"
          >
            Sign Up
          </Button>

          <Link color="blue" href="/login">
            Already have an account?
          </Link>
        </Flex>
      </Box>
    </Flex>
  )
}

export default SignupPage
