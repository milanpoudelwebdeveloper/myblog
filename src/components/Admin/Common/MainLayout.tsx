import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <Box maxW={1200} mx="auto">
      <NavBar />
      <Flex>
        <SideBar />
        <Box flex={1} p={4} bg="#F5F7FA" h="87vh">
          <Box bg="white" h="80vh" py={14}>
            {children}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default MainLayout;
