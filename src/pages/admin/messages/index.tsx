import React, { useEffect } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text, Flex } from '@chakra-ui/react'
import MainLayout from '@components/Admin/Common/MainLayout'
import Link from 'next/link'
import MessagesFilter from '@components/Admin/Messages/MessagesFilter'
import { getMessages } from '@/src/services/messages'

const tableHeadings = ['ID', 'Email', 'Name', 'Subject', 'Created At', 'Status']

const Messages = ({ messages }: { messages: IMessage[] }) => {
  useEffect(() => {
    getMessages()
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return (
    <MainLayout>
      <Flex justifyContent="space-between" bg="#F5F7FA" my={4}>
        <Text fontSize="32px" color="#333B69" fontWeight="bold">
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
            {messages &&
              messages?.map((list) => (
                <Tr key={list?.id} color="#202224" fontSize="sm" fontWeight="600">
                  <Td paddingY={8}>{list?.id}</Td>
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

                  <Td>{list.createdat}</Td>
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

export async function getServerSideProps() {
  try {
    const messages = await getMessages()
    if (messages) {
      return {
        props: {
          messages: messages
        }
      }
    } else {
      return {
        props: {
          messages: []
        }
      }
    }
  } catch (error) {
    return {
      props: {
        messages: []
      }
    }
  }
}
