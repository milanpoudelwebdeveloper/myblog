import { Text } from '@chakra-ui/react'

interface ErrorTextProps {
  message: string | any
  textAlign?: string | any
  mt?: number | string | any
}

const ErrorText = ({ message, textAlign = 'left', mt = 2 }: ErrorTextProps) => {
  return (
    <Text color="red" textAlign={textAlign} mt={mt} fontSize="xs">
      {message}
    </Text>
  )
}

export default ErrorText
