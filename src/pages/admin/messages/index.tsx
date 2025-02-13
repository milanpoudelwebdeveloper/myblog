import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text, Flex } from '@chakra-ui/react'
import MainLayout from '@components/Admin/Common/MainLayout'
import Link from 'next/link'
import MessagesFilter from '@components/Admin/Messages/MessagesFilter'
import { getMessages } from '@/src/services/messages'
import { convertDate } from '@/src/utils/convertDate'
import { useQuery } from '@tanstack/react-query'

const tableHeadings = ['ID', 'Email', 'Name', 'Subject', 'Created At', 'Status']

const Messages = () => {
  const { data } = useQuery({
    queryKey: ['getAdminMessages'],
    queryFn: getMessages,
    staleTime: Infinity
  })

  return (
    <MainLayout>
      <Flex justifyContent="space-between" bg="#F5F7FA" my={4}>
        <Text fontSize={{ base: '24px', '1xl': '32px' }} color="#333B69" fontWeight="bold">
          Messages
        </Text>
      </Flex>
      <MessagesFilter />
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr
              bg="#FCFDFD"
              fontSize="sm"
              color="#202224"
              fontWeight="bold"
              borderWidth="0.6px"
              borderColor="#D5D5D5"
              borderRightRadius={14}
              borderLeftRadius={14}
            >
              {tableHeadings.map((heading) => (
                <Th key={heading}>{heading}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody bg="white">
            {data &&
              data?.map((list: IMessage) => (
                <Tr key={list?.id} color="#202224" fontSize={{ base: 'xs', '1xl': 'sm' }} fontWeight="600">
                  <Td paddingY={{ base: 5, '1xl': 7 }}>{list?.id}</Td>
                  <Td>
                    <Link href={`/admin/messages/${list?.id}`} shallow>
                      {list?.email}
                    </Link>
                  </Td>
                  <Td>
                    <Link href={`/admin/messages/${list?.id}`} shallow>
                      {list?.name}
                    </Link>
                  </Td>
                  <Td>{list?.subject}</Td>

                  <Td>{convertDate(list.createdat)}</Td>
                  <Td>{list?.solved ? 'Solved' : 'Pending'}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </MainLayout>
  )
}

export default Messages
