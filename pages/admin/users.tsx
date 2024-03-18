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
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import MainLayout from "@components/Admin/Common/MainLayout";
import Link from "next/link";

const lists = [
  {
    id: 1,
    name: "User 1",
    role: "Admin",
    avatar: "https://bit.ly/dan-abramov",
    createdAt: "2021-08-01",
  },
  {
    id: 2,
    name: "Category 2",
    role: "milanwebdev",
    avatar: "https://bit.ly/dan-abramov",
    createdAt: "2021-08-02",
  },
  {
    id: 3,
    name: "Category 3",
    role: "milanwebdev",
    avatar: "https://bit.ly/dan-abramov",
    createdAt: "2021-08-03",
  },
];

const tableHeadings = ["ID", "Name", "Role", "Avatar", "Created At"];

const Users = () => {
  return (
    <MainLayout>
      <Flex justifyContent="space-between" bg="#F5F7FA">
        <Text fontSize="lg" color="#333B69" my={4}>
          Users
        </Text>
        <Link href="/admin/category/add">
          <Button bg="#1814F3" ml="auto" color="#fff" fontSize="md">
            Add user
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
              <Tr key={list?.id}>
                <Td>{list?.id}</Td>
                <Td>{list?.name}</Td>
                <Td>{list?.role}</Td>
                <Td>
                  <Image
                    src={list?.avatar}
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

export default Users;
