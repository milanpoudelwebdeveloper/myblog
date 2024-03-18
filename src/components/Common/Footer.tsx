import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Flex
      justifyContent="space-between"
      mt={{ base: 10, lg: 24 }}
      mb={10}
      direction={{ base: "column", md: "row" }}
      gap={{ base: 3, md: 0 }}
    >
      <Text>Milan Code</Text>
      <Flex gap={7} fontSize={{ base: "sm", lg: "lg" }}>
        <Text>Terms and Conditions</Text>
        <Text>Privacy Policy</Text>
      </Flex>
      <Text color="#6B7280" fontSize={{ base: "sm", lg: "lg" }}>
        &copy; {currentYear} Code With Milan. All rights reserved.
      </Text>
    </Flex>
  );
};

export default Footer;
