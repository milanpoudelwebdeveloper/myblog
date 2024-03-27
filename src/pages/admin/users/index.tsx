import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Image, Text, Flex, Button } from '@chakra-ui/react'
import MainLayout from '@components/Admin/Common/MainLayout'
import Link from 'next/link'
import UserFilter from '@components/Admin/Users/UserFilter'
import { getAllUsers } from '@/src/services/user'

const tableHeadings = ['ID', 'Name', 'Email', 'Role', 'Avatar', 'Status']

const Users = ({ users }: { users: IUser[] }) => {
  console.log('users', users[0].verified)
  return (
    <MainLayout>
      <Flex justifyContent="space-between" bg="#F5F7FA" my={4}>
        <Text fontSize="32px" color="#333B69" fontWeight="bold">
          Users
        </Text>
        <Link href="/admin/category/add">
          <Button bg="#1814F3" ml="auto" color="#fff" fontSize="md">
            Add user
          </Button>
        </Link>
      </Flex>
      <UserFilter />
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
            {users?.map((user) => (
              <Tr key={user?.id}>
                <Td>{user?.id}</Td>
                <Td>{user?.name}</Td>
                <Td>{user?.email}</Td>
                <Td>{user?.role}</Td>
                <Td>
                  <Image src={user?.profileimage} alt="avatar" w={10} borderRadius="full" />
                </Td>
                <Td>
                  <Text color={user?.verified ? 'green' : 'red'}>{user?.verified ? 'Verified' : 'Pending'}</Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </MainLayout>
  )
}

export default Users

export async function getServerSideProps() {
  try {
    const users = await getAllUsers()
    if (users) {
      return {
        props: {
          users: users
        }
      }
    } else {
      return {
        props: {
          users: []
        }
      }
    }
  } catch (error) {
    return {
      props: {
        users: []
      }
    }
  }
}
