import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Image, Text, Button, Flex, Box } from '@chakra-ui/react'
import Link from 'next/link'
import { getBlogs } from '@/src/services/blog'
import { useCustomToast } from '@/src/hooks/useCustomToast'

const tableHeadings = ['Title', 'Description', 'Cover Image', 'Category', 'Created At']

const RecentBlogs = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([])
  const { showToast } = useCustomToast()

  useEffect(() => {
    getBlogs()
      .then((data) => {
        setBlogs(data)
      })
      .catch((e) => {
        showToast(e, 'error')
      })
  }, [])

  return (
    <Box bg="white" mt={8} p={7}>
      <Flex justifyContent="space-between">
        <Text fontSize="lg" color="#202224" my={4} fontStyle="24px" fontWeight="bold">
          Recent Blogs
        </Text>
        <Link href="/admin/blogs/add">
          <Button bg="#1814F3" ml="auto" color="#fff" fontSize="md">
            Add blog
          </Button>
        </Link>
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr bg="#F1F4F9" borderRadius={12} fontSize="sm" fontWeight="bold">
              {tableHeadings.map((heading) => (
                <Th color="#202224" key={heading} fontWeight="bold">
                  {heading}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {blogs?.map((list) => (
              <Tr key={list?.id} fontSize="sm" fontWeight="500">
                <Td>{list.title}</Td>
                <Td>{list?.content?.slice(0, 8)}</Td>
                <Td>
                  <Image src={list?.coverimage} alt="avatar" w={10} borderRadius="full" />
                </Td>
                <Td>
                  <Flex gap={2} fontSize={{ base: 'xs', md: 'sm', '1xl': 'md' }} mt={4}>
                    {list?.categories?.map((categoryname) => (
                      <Box bg="#FDF2FA" color="#C11574" borderRadius={10} p={2} key={categoryname}>
                        <Text>{categoryname}</Text>
                      </Box>
                    ))}
                  </Flex>
                </Td>
                <Td>{list?.createdat}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default RecentBlogs
