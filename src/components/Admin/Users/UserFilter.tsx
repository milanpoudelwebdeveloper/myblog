import {
  Box,
  Divider,
  Flex,
  Image,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import React from "react";

const UserFilter = () => {
  return (
    <Flex
      bg="white"
      mb={7}
      fontSize="sm"
      fontWeight="bold"
      borderRadius={10}
      w="max-content"
      borderWidth="0.6px"
      borderColor="#D5D5D5"
    >
      <Box p={5}>
        <Image
          src="/images/filtericon.png"
          alt="filter"
          w={6}
          objectFit="cover"
        />
      </Box>
      <Divider
        orientation="vertical"
        borderColor="#D5D5D5"
        h="16"
        opacity={0.7}
      />
      <Text p={5}>Filter By</Text>
      <Divider
        orientation="vertical"
        borderColor="#D5D5D5"
        h="16"
        opacity={0.7}
      />
      <Input
        type="date"
        placeholder="Date"
        maxW="max-content"
        border="none"
        p={8}
      />
      <Divider
        orientation="vertical"
        borderColor="#D5D5D5"
        h="16"
        opacity={0.7}
      />
      <Select p={3} width="max-content" border="none" placeholder="Status">
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </Select>
      <Divider
        orientation="vertical"
        borderColor="#D5D5D5"
        h="16"
        opacity={0.7}
      />
      <Flex color="#EA0234" p={5} gap={2} alignItems="center">
        <Image
          src="/images/replay.png"
          alt="reset"
          w={6}
          objectFit="cover"
          width={4}
        />
        <Text>Reset Filter</Text>
      </Flex>
    </Flex>
  );
};

export default UserFilter;