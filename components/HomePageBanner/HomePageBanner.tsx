import { FC } from 'react'
import { Box, Container, Text } from '@chakra-ui/layout'

interface BannerProps {
  heading: string
}

export const HomePageBanner: FC<BannerProps> = ({ heading }) => (
  <Container maxW="container.m" bg="lightcoral" h="30vh" margin="200px auto" boxShadow="dark-lg">
    <Box
      padding="4"
      maxW="fit-content"
      fontWeight="semibold"
      as="h1"
      lineHeight="normal"
      color="white"
      fontSize="xxx-large"
    >
      <Text>{heading}</Text>
    </Box>
  </Container>
)
