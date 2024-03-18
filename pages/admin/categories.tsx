import React from "react";
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

const lists = [
  {
    title: "Category 1",
    createdBy: "milanwebdev",
    image: "https://bit.ly/dan-abramov",
    createdAt: "2021-08-01",
  },
  {
    title: "Category 2",
    createdBy: "milanwebdev",
    image: "https://bit.ly/dan-abramov",
    createdAt: "2021-08-02",
  },
  {
    title: "Category 3",
    createdBy: "milanwebdev",
    image: "https://bit.ly/dan-abramov",
    createdAt: "2021-08-03",
  },
];

const tableHeadings = ["Title", "Created By", "Image", "Created At"];

const BlogLists = () => {
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
            {lists.map((list, index) => (
              <Tr key={index}>
                <Td>{list?.title}</Td>
                <Td>{list?.createdBy}</Td>
                <Td>
                  <Image
                    src={list?.image}
                    alt="avatar"
                    w={10}
                    borderRadius="full"
                  />
                </Td>
                <Td>{list?.createdAt}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </MainLayout>
  );
};

export default BlogLists;
