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
import UserFilter from "./users/UserFilter";

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
      <Flex justifyContent="space-between" bg="#F5F7FA" my={4}>
        <Text fontSize="32px" color="#333B69" fontWeight="bold">
          Users
        </Text>
        <Link href="/admin/category/add">
          <Button bg="#1814F3" ml="auto" color="#fff" fontSize="md">
            Add user
          </Button>
        </Link>
      </Flex>
      <UserFilter />
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
            {lists.map((list) => (
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
