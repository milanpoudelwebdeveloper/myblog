import React, { useMemo, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Image, Text, Button, Flex, Box, Center } from '@chakra-ui/react'
import MainLayout from '@components/Admin/Common/MainLayout'
import Link from 'next/link'
import { getBlogs } from '@/src/services/blog'
import BlogFilter from '@components/Admin/Blogs/BlogFilter'
import { ADMIN_BLOGS } from '@constants/routes'
import { useQuery } from '@tanstack/react-query'
import { convertDate } from '@/src/utils/convertDate'
import { useSearchParams } from 'next/navigation'

const tableHeadings = ['ID', 'Title', 'Cover Image', 'Category', 'Created At', 'Published Status']

const Blogs = () => {
  const [publishedStatus, setPublishedStatus] = useState<boolean | undefined>()
  const searchParams = useSearchParams()
  const page = searchParams.get('page') || 1

  const { data: blogs } = useQuery({
    queryKey: ['getBlogsListAdmin', publishedStatus, page],
    queryFn: () => getBlogs(parseInt(page as string), 'all', publishedStatus),
    staleTime: 60000,
    enabled: !!page
  })

  const memoizedPageCount = useMemo(() => blogs?.totalPages ?? 0, [blogs?.totalPages])

  return (
    <MainLayout>
      <Flex justifyContent="space-between" bg="#F5F7FA" my={{ base: 2, '1xl': 4 }}>
        <Text fontSize={{ base: '24px', '1xl': '32px' }} color="#333B69" fontWeight="bold">
          Blogs
        </Text>
        <Link href="/admin/blogs/add" shallow>
          <Button bg="#1814F3" ml="auto" color="#fff" fontSize={{ base: 'sm', '1xl': 'md' }}>
            Add blog
          </Button>
        </Link>
      </Flex>
      <BlogFilter setPublishedStatus={setPublishedStatus} />
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
            {blogs?.data?.map((list: IBlog) => (
              <Tr key={list?.id} fontSize={{ base: 'xs', '1xl': 'sm' }}>
                <Td>{list?.id}</Td>

                <Td paddingY={8}>
                  <Link href={ADMIN_BLOGS + '/' + list?.id}>{list?.title?.slice(0, 30)}</Link>
                </Td>

                <Td>
                  <Image src={list?.coverimage} alt="avatar" w={12} borderRadius="full" h={12} objectFit="cover" />
                </Td>
                <Td>
                  <Flex gap={2} fontSize={{ base: 'xs', '1xl': 'md' }} mt={4}>
                    {list?.categories?.map((category) => (
                      <Box bg="#FDF2FA" color="#C11574" borderRadius={10} p={2} key={category?.value}>
                        <Text>{category?.label}</Text>
                      </Box>
                    ))}
                  </Flex>
                </Td>
                <Td>{convertDate(list?.createdat)}</Td>
                <Td>{list?.published ? 'Yes' : 'No'}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Center mt={7}>
        {Array.from({ length: memoizedPageCount }).map((_, index) => (
          <Link href={`?page=${index + 1}`} key={index} shallow>
            <Button
              variant="unstyled"
              key={index}
              bg="white"
              borderRadius={4}
              borderWidth={1}
              borderColor="#DFE3E8"
              fontWeight={parseInt(page as string) == index + 1 ? '700' : '500'}
              fontSize={{ base: 'sm', '1xl': 'md' }}
              mr={2}
              color={parseInt(page as string) == index + 1 ? 'rgb(165, 94, 234)' : 'rgb(35, 35, 35)'}
              display={memoizedPageCount > 1 ? 'block' : 'none'}
            >
              {index + 1}
            </Button>
          </Link>
        ))}
      </Center>
    </MainLayout>
  )
}

export default Blogs
