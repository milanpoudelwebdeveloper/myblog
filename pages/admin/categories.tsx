import React, { useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Image,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import MainLayout from "@components/Admin/Common/MainLayout";
import Link from "next/link";
import { getCategories } from "@/src/services/category";

const tableHeadings = ["ID", "Name", "Image", "Created At"];

const Categories = ({ categories }: { categories: any }) => {
  return (
    <MainLayout>
      <Flex justifyContent="space-between" bg="#F5F7FA">
        <Text fontSize="lg" color="#333B69" my={4}>
          Categories
        </Text>
        <Link href="/admin/category/add">
          <Button bg="#1814F3" ml="auto" color="#fff" fontSize="md">
            Add category
          </Button>
        </Link>
      </Flex>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              {tableHeadings.map((heading) => (
                <Th key={heading}>{heading}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {categories?.map((list: any, index: number) => (
              <Tr key={index}>
                <Td>{list?.id}</Td>
                <Link href={`/admin/category/${list?.id}`} key={index}>
                  <Td>{list?.name}</Td>
                </Link>
                <Td>
                  <Image
                    src={list?.image}
                    alt="avatar"
                    w={10}
                    borderRadius="full"
                  />
                </Td>
                <Td>
                  <Image
                    src={list?.createdAt}
                    alt="avatar"
                    w={10}
                    borderRadius="full"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </MainLayout>
  );
};

export default Categories;

export async function getServerSideProps() {
  try {
    const categories = await getCategories();
    console.log("categories", categories);
    if (categories) {
      return {
        props: {
          categories: categories,
        },
      };
    } else {
      return {
        props: {
          categories: [],
        },
      };
    }
  } catch (error: any) {
    return {
      props: {
        categories: [],
      },
    };
  }
}
