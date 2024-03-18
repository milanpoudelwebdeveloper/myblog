import { Box, Flex } from "@chakra-ui/react";
import React from "react";

const NavBar = () => {
  return (
    <Flex justifyContent="space-between" py={4} bg="#FFF">
      <Box p={2}>Logo</Box>
      <Box p={2}>Notification Icon</Box>
      <Box p={2}>Avatar</Box>
    </Flex>
  );
};

export default NavBar;
