import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <Box mx="auto">
      <NavBar />
      <Flex>
        <SideBar />
        <Box flex={1} bg="#F5F7FA" h="87vh">
          <Box py={8} px={8} maxW={{ base: 900, "1xl": 1200 }} mx="auto">
            {children}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default MainLayout;
