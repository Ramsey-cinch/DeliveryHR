import { withProtection } from '@Services/withProtection'
import { useState } from 'react'
import { Box, Button, Divider, Flex, FormLabel, FormControl, Input, Text } from '@chakra-ui/react'

const HolidayRequest: React.FC = () => {
  const [fromDate, setFromDate] = useState<Date>()
  const [toDate, setToDate] = useState<Date>()
  const [reason, setReason] = useState<string>('')

  const onRequestClickHandler = async () => {
    console.log({ fromDate, toDate, reason })
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
            <Input type="datetime-local" onChange={(e) => setFromDate(new Date(e.target.value))} />
          </FormControl>
          <FormControl id="To" marginBottom="12px">
            <FormLabel fontSize="small">To</FormLabel>
            <Input type="datetime-local" onChange={(e) => setToDate(new Date(e.target.value))} />
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
