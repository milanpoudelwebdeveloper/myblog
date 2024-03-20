import React, { useEffect, useState } from "react";
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
import { getBlogs } from "@/src/services/blog";

const tableHeadings = [
  "Title",
  "Description",
  "Cover Image",
  "Category",
  "Created At",
];

const BlogLists = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs()
      .then((data) => {
        setBlogs(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
            {blogs?.map((list: any) => (
              <Tr key={list?.id}>
                <Td>{list.title}</Td>
                <Td>{list?.content?.slice(0, 8)}</Td>
                <Td>
                  <Image
                    src={list?.coverimage}
                    alt="avatar"
                    w={10}
                    borderRadius="full"
                  />
                </Td>
                <Td>{list?.category}</Td>
                <Td>{list?.createdat}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </MainLayout>
  );
};

export default BlogLists;
