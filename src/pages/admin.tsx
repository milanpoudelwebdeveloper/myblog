import { Box, Flex, Image, Text } from "@chakra-ui/react";
import MainLayout from "@components/Admin/Common/MainLayout";

import React from "react";
import RecentBlogs from "../components/Admin/Blogs/RecentBlogs";

const AdminHome = () => {
  return (
    <MainLayout>
      <Box color="#202224">
        <Text fontSize="32px" fontWeight="bold" mb={7}>
          Dashboard
        </Text>
        <Flex gap={9}>
          <Flex
            bg="white"
            boxShadow="6px 6px 54px 0px rgba(0, 0, 0, 0.05)"
            p={6}
            borderRadius={14}
            gap={20}
          >
            <Box>
              <Text fontSize="md" fontWeight="600" opacity={0.7}>
                Total Users
              </Text>
              <Text fontSize="28px" fontWeight="bold" mt={4}>
                16
              </Text>
            </Box>
            <Image
              src="/images/usericon1.png"
              alt="user"
              w={14}
              objectFit="contain"
            />
          </Flex>
          <Flex
            bg="white"
            boxShadow="6px 6px 54px 0px rgba(0, 0, 0, 0.05)"
            p={4}
            borderRadius={14}
            gap={20}
          >
            <Box>
              <Text fontSize="md" fontWeight="600" opacity={0.7}>
                Total Blogs
              </Text>
              <Text fontSize="28px" fontWeight="bold" mt={4}>
                16
              </Text>
            </Box>
            <Image
              src="/images/usericon1.png"
              alt="user"
              w={14}
              objectFit="contain"
            />
          </Flex>
          <Flex
            bg="white"
            boxShadow="6px 6px 54px 0px rgba(0, 0, 0, 0.05)"
            p={4}
            borderRadius={14}
            gap={20}
          >
            <Box>
              <Text fontSize="md" fontWeight="600" opacity={0.7}>
                Total Categories
              </Text>
              <Text fontSize="28px" fontWeight="bold" mt={4}>
                16
              </Text>
            </Box>
            <Image
              src="/images/usericon1.png"
              alt="user"
              w={14}
              objectFit="contain"
            />
          </Flex>
        </Flex>
        <RecentBlogs />
      </Box>
    </MainLayout>
  );
};

export default AdminHome;
