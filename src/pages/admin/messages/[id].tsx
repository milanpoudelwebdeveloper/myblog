import { useCustomToast } from '@/src/hooks/useCustomToast'
import { getMessageDetails, updateStatus } from '@/src/services/messages'
import { convertDate } from '@/src/utils/convertDate'
import { Box, Button, Center, Divider, Flex, Text } from '@chakra-ui/react'
import MainLayout from '@components/Admin/Common/MainLayout'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const MessageDetails = () => {
  const [isSolved, setIsSolved] = useState(false)
  const router = useRouter()
  const { id } = router.query
  const { showToast } = useCustomToast()
  const { data, error } = useQuery({
    queryKey: ['getMessageDetails', id],
    queryFn: () => getMessageDetails(id as string),
    enabled: !!id
  })
  if (error) {
    showToast(error, 'error')
  }

  const solveHandler = () => {
    updateStatus(id as string)
      .then((res) => {
        showToast(res, 'success')
        setIsSolved(true)
      })
      .catch((error) => showToast(error, 'error'))
  }

  useEffect(() => {
    if (data?.solved) {
      setIsSolved(true)
    }
  }, [data?.solved])

  return (
    <MainLayout>
      <Box maxW={700} mx="auto" mt={7} bg="white" p={16} borderRadius={14}>
        <Text fontSize="xl" fontWeight="500" textAlign="center" color="#1814F3">
          Message Information
        </Text>
        <Divider mt={1} mb={10} borderColor="#1814F3" w={10} borderWidth={2} mx="auto" />
        <Flex gap={48}>
          <Box mb={10}>
            <Text fontSize="xl" fontWeight="600">
              Name:
            </Text>
            <Text>{data?.name}</Text>
          </Box>
          <Box>
            <Text fontSize="xl" fontWeight="600">
              Email:
            </Text>
            <Text>{data?.email}</Text>
          </Box>
        </Flex>
        <Flex gap={48}>
          <Box mb={10}>
            <Text fontSize="xl" fontWeight="600">
              Sent Date:
            </Text>
            <Text>{convertDate(data?.createdat)}</Text>
          </Box>
          <Box>
            <Text fontSize="xl" fontWeight="600">
              Subject:
            </Text>
            <Text>{data?.subject}</Text>
          </Box>
        </Flex>
        <Flex gap={28}>
          <Box>
            <Text fontSize="xl" fontWeight="600">
              Message:
            </Text>
            <Text>{data?.message}</Text>
          </Box>
          <Box>
            <Text fontSize="xl" fontWeight="600">
              Status:
            </Text>
            <Text>{isSolved ? 'Solved' : 'Pending'}</Text>
          </Box>
        </Flex>
        <Center mt={7} display={isSolved ? 'none' : 'flex'}>
          <Button bg="#4880FF" color="white" fontWeight="normal" type="submit" onClick={solveHandler}>
            Mark as Solved
          </Button>
        </Center>
      </Box>
    </MainLayout>
  )
}

export default MessageDetails
