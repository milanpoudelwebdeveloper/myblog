import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Image, Text, Flex, Button } from '@chakra-ui/react'
import MainLayout from '@components/Admin/Common/MainLayout'
import Link from 'next/link'
import UserFilter from '@components/Admin/Users/UserFilter'
import { getAllUsers } from '@/src/services/user'
import { useQuery } from '@tanstack/react-query'

const tableHeadings = ['ID', 'Name', 'Email', 'Role', 'Avatar', 'Status']

const Users = () => {
  const { data } = useQuery({
    queryKey: ['getAdminUsers'],
    queryFn: getAllUsers,
    staleTime: Infinity
  })
  return (
    <MainLayout>
      <Flex justifyContent="space-between" bg="#F5F7FA" my={4}>
        <Text fontSize={{ base: '24px', '1xl': '32px' }} color="#333B69" fontWeight="bold">
          Users
        </Text>
        <Link href="/admin/users/add" shallow>
          <Button bg="#1814F3" ml="auto" color="#fff" fontSize={{ base: 'sm', '1xl': 'md' }}>
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
          <Tbody bg="white" fontSize={{ base: 'xs', '1xl': 'sm' }}>
            {data?.map((user: IUser) => (
              <Tr key={user?.id}>
                <Td>{user?.id}</Td>
                <Td>{user?.name}</Td>
                <Td>{user?.email}</Td>
                <Td>{user?.role}</Td>
                <Td>
                  <Image src={user?.profileimage} alt="avatar" w={10} h="auto" borderRadius="full" />
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
