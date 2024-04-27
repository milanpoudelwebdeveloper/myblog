import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text, Button, Flex, Box, Image } from '@chakra-ui/react'
import Link from 'next/link'
import { getBlogs } from '@/src/services/blog'
import { ADMIN_BLOGS } from '@constants/routes'
import { useQuery } from '@tanstack/react-query'
import { convertDate } from '@/src/utils/convertDate'

const tableHeadings = ['ID', 'Title', 'Cover Image', 'Category', 'Created At']

const RecentBlogs = () => {
  const { data: blogs } = useQuery({
    queryKey: ['getRecentBlogsAdmin'],
    queryFn: () => getBlogs(1, 'all'),
    staleTime: 60000
  })

  return (
    <Box bg="white" mt={{ base: 5, '1xl': 8 }} p={{ base: 5, '1xl': 7 }}>
      <Flex justifyContent="space-between">
        <Text fontSize={{ base: 'md', '1xl': 'lg' }} color="#202224" my={4} fontStyle="24px" fontWeight="bold">
          Recent Blogs
        </Text>
        <Link href="/admin/blogs/add" shallow>
          <Button bg="#1814F3" ml="auto" color="#fff" fontSize={{ base: 'sm', '1xl': 'md' }}>
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
            {blogs?.data?.map((list: IBlog) => (
              <Tr key={list?.id} fontSize={{ base: 'xs', '1xl': 'sm' }} fontWeight="500">
                <Td>{list?.id}</Td>
                <Td>
                  <Link href={ADMIN_BLOGS + '/' + list?.id}>{`${list?.title?.slice(0, 37)}...`}</Link>
                </Td>

                <Td>
                  <Image src={list?.coverimage} alt="avatar" w={10} h={10} borderRadius="full" objectFit="cover" />
                </Td>
                <Td>
                  <Flex gap={2} fontSize={{ base: 'xs', md: 'sm' }}>
                    {list?.categories?.map((category) => (
                      <Box bg="#FDF2FA" color="#C11574" borderRadius={10} p={2} key={category?.value}>
                        <Text>{category?.label}</Text>
                      </Box>
                    ))}
                  </Flex>
                </Td>
                <Td>{convertDate(list?.createdat)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default RecentBlogs
