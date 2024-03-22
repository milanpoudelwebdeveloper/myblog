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
  Box,
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

const RecentBlogs = () => {
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
    <Box bg="white" mt={8} p={7}>
      <Flex justifyContent="space-between">
        <Text
          fontSize="lg"
          color="#202224"
          my={4}
          fontStyle="24px"
          fontWeight="bold"
        >
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
            {blogs?.map((list: any) => (
              <Tr key={list?.id} fontSize="sm" fontWeight="500">
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
    </Box>
  );
};

export default RecentBlogs;
