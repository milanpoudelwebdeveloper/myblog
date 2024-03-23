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
import BlogFilter from "./blogs/BlogFilter";

const tableHeadings = [
  "Title",
  "Description",
  "Cover Image",
  "Category",
  "Created At",
  "Published Status",
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
      <Flex justifyContent="space-between" bg="#F5F7FA" my={4}>
        <Text fontSize="32px" color="#333B69" fontWeight="bold">
          Blogs
        </Text>
        <Link href="/admin/blogs/add">
          <Button bg="#1814F3" ml="auto" color="#fff" fontSize="md">
            Add blog
          </Button>
        </Link>
      </Flex>
      <BlogFilter />
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
            {blogs?.map((list: any) => (
              <Tr key={list?.id}>
                <Td paddingY={8}>{list.title}</Td>
                <Td paddingY={8}>{list?.content?.slice(0, 8)}</Td>
                <Td>
                  <Image
                    src={list?.coverimage}
                    alt="avatar"
                    w={12}
                    borderRadius="full"
                    h={12}
                    objectFit="cover"
                  />
                </Td>
                <Td>{list?.categoryname}</Td>
                <Td>{list?.createdat}</Td>
                <Td>Published</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </MainLayout>
  );
};

export default BlogLists;
