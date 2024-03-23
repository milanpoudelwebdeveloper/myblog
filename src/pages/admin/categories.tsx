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
import CategoryFilter from "./category/CategoryFilter";

const tableHeadings = ["ID", "Name", "Image", "Created At"];

const Categories = ({ categories }: { categories: any }) => {
  return (
    <MainLayout>
      <Flex justifyContent="space-between" bg="#F5F7FA" my={4}>
        <Text fontSize="32px" color="#333B69" fontWeight="bold">
          Categories
        </Text>
        <Link href="/admin/category/add">
          <Button bg="#1814F3" ml="auto" color="#fff" fontSize="md">
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
              categories?.map((list: any, index: number) => (
                <Tr key={index} color="#202224" fontSize="sm" fontWeight="600">
                  <Td paddingY={8}>{list?.id}</Td>
                  <Td paddingY={8}>
                    <Link href={`/admin/category/${list?.id}`} key={index}>
                      {list?.name}
                    </Link>
                  </Td>

                  <Td>
                    <Image
                      src={list?.image}
                      alt="avatar"
                      w={12}
                      h={12}
                      borderRadius="full"
                      objectFit="cover"
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
