import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Image, Button, Text, Flex } from '@chakra-ui/react'
import MainLayout from '@components/Admin/Common/MainLayout'
import Link from 'next/link'
import { getCategories } from '@/src/services/category'
import CategoryFilter from '@components/Admin/Category/CategoryFilter'
import { convertDate } from '@/src/utils/convertDate'

const tableHeadings = ['ID', 'Name', 'Image', 'Created At']

const Categories = ({ categories }: { categories: ICategory[] }) => {
  return (
    <MainLayout>
      <Flex justifyContent="space-between" bg="#F5F7FA" mb={5}>
        <Text fontSize={{ base: '24px', '1xl': '32px' }} color="#333B69" fontWeight="bold">
          Categories
        </Text>
        <Link href="/admin/categories/add" shallow>
          <Button bg="#1814F3" ml="auto" color="#fff" fontSize={{ base: 'sm', '1xl': 'md' }}>
            Add category
          </Button>
        </Link>
      </Flex>
      <CategoryFilter />
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
            {categories &&
              categories?.map((list) => (
                <Tr key={list?.id} color="#202224" fontSize={{ base: 'xs', '1xl': 'sm' }} fontWeight="600">
                  <Td paddingY={{ base: 5, '1xl': 6 }}>{list?.id}</Td>
                  <Td paddingY={{ base: 5, '1xl': 6 }}>
                    <Link href={`/admin/categories/${list?.id}`} shallow>
                      {list?.name}
                    </Link>
                  </Td>

                  <Td>
                    <Image
                      src={list?.image}
                      alt="avatar"
                      w={{ base: 9, '1xl': 12 }}
                      h={{ base: 9, '1xl': 12 }}
                      borderRadius="full"
                      objectFit="cover"
                    />
                  </Td>
                  <Td>
                    <Text>{convertDate(list?.createdat)}</Text>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </MainLayout>
  )
}

export default Categories

export async function getServerSideProps() {
  try {
    const categories = await getCategories()
    if (categories) {
      return {
        props: {
          categories: categories
        }
      }
    } else {
      return {
        props: {
          categories: []
        }
      }
    }
  } catch (error) {
    return {
      props: {
        categories: []
      }
    }
  }
}
