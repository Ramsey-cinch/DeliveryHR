import { withProtection } from '@Services/withProtection'
import React, { useState } from 'react'
import {
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  FormControl,
  Input,
  Text,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { FirestoreApi } from '@Firebase-api/firestore-api'
import { useAuth } from '@Context/AuthContext'
import { useRouter } from 'next/router'

const HolidayRequest: React.FC = () => {
  const [fromDate, setFromDate] = useState<Date>()
  const [totalDays, setTotalDays] = useState<number>(0)
  const [totalHours, setTotalHours] = useState<number>(0)
  const [reason, setReason] = useState<string>('')
  const firestoreApi = new FirestoreApi()
  const { authedUser } = useAuth()
  const toast = useToast()
  const router = useRouter()

  const onRequestClickHandler = async () => {
    try {
      await firestoreApi.postHolidayRequest({ fromDate, totalDays, reason, authedUser, totalHours })
      router.replace('./dashboard')
    } catch (error) {
      toast({
        title: 'Unable to send your request!',
        description: error.message,
        status: 'error',
        duration: 4000,
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
            Make a holiday request
          </Text>
        </Box>
        <Divider marginBottom="24px" />
        <Flex flexWrap="wrap">
          <FormControl id="From" marginBottom="12px" marginRight="8px">
            <FormLabel fontSize="small">From</FormLabel>
            <Input name="from" type="date" onChange={(e) => setFromDate(new Date(e.target.value))} />
          </FormControl>
          <FormControl id="Days" marginBottom="12px" marginRight="8px">
            <FormLabel fontSize="small">Number of working days (optional)</FormLabel>
            <NumberInput name="days" defaultValue={0} onChange={(value) => setTotalDays(parseInt(value))} min={0}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl id="Hours" marginBottom="12px" marginRight="8px">
            <FormLabel fontSize="small">Number of hours (optional)</FormLabel>
            <NumberInput
              defaultValue={0}
              onChange={(value) => setTotalHours(parseFloat(value))}
              precision={2}
              step={0.25}
              min={0}
              name="hours"
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </Flex>
        <FormControl id="Reason" marginBottom="12px">
          <FormLabel fontSize="small">Reason for absence</FormLabel>
          <Input type="textarea" onChange={(e) => setReason(e.target.value)} />
        </FormControl>

        <Flex flexDirection="column" textAlign="center" alignItems="center">
          <Button onClick={onRequestClickHandler} variant="solid" colorScheme="teal" marginBottom="16px" width="60%">
            Make Request
          </Button>
        </Flex>
      </Box>
    </Flex>
  )
}

export default withProtection(HolidayRequest)
