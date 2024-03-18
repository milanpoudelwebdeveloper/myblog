import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Image,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import MainLayout from "@components/Admin/Common/MainLayout";
import Link from "next/link";

const lists = [
  {
    title: "Blog 1",
    description: "This is the description of Blog 1",
    avatar: "https://bit.ly/dan-abramov",
    createdAt: "2021-08-01",
  },
  {
    title: "Blog 2",
    description: "This is the description of Blog 2",
    avatar: "https://bit.ly/dan-abramov",
    createdAt: "2021-08-02",
  },
  {
    title: "Blog 3",
    description: "This is the description of Blog 3",
    avatar: "https://bit.ly/dan-abramov",
    createdAt: "2021-08-03",
  },
];

const tableHeadings = ["Title", "Description", "Avatar", "Created At"];

const BlogLists = () => {
  return (
    <MainLayout>
      <Flex justifyContent="space-between" bg="#F5F7FA">
        <Text fontSize="lg" color="#333B69" my={4}>
          Blogs
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
            <Tr>
              {tableHeadings.map((heading) => (
                <Th key={heading}>{heading}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {lists.map((list, index) => (
              <Tr key={index}>
                <Td>{list.title}</Td>
                <Td>{list.description}</Td>
                <Td>
                  <Image
                    src={list.avatar}
                    alt="avatar"
                    w={10}
                    borderRadius="full"
                  />
                </Td>
                <Td>{list.createdAt}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </MainLayout>
  );
};

export default BlogLists;
