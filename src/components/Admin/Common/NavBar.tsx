import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

const NavBar = () => {
  return (
    <Flex justifyContent="space-between" py={4} bg="#FFF" maxW={1200} mx="auto">
      <Flex fontSize="xl" fontWeight="bold" gap={1}>
        <Text color="#4880FF">Blog</Text>
        <Text color="#202224">Admin</Text>
      </Flex>
      <Flex gap={10} alignItems="center">
        <Box w="max-content">
          <Image
            src="/images/notification.png"
            alt="notification"
            w={7}
            objectFit="cover"
          />
        </Box>

        <Flex gap={4}>
          <Avatar
            size="md"
            src="https://plus.unsplash.com/premium_photo-1665952050053-31ac47c6ff4b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHx8MA%3D%3D"
          />
          <Box fontSize="sm">
            <Text fontWeight="bold">Milan Poudel</Text>
            <Text>Super Admin</Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NavBar;