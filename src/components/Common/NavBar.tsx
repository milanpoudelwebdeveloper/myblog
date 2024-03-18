import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import ThemeToggle from "./ThemeToggle";
import { ABOUT, BLOGS, CONTACT, HOME } from "@/src/constants/routes";
import Link from "next/link";

export const navLinks = [
  { title: "Home", link: HOME },
  { title: "Blogs", link: BLOGS },
  { title: "About", link: ABOUT },
  { title: "Contact", link: CONTACT },
];

const NavBar = () => {
  return (
    <Box
      bg="white"
      boxShadow="rgba(0, 0, 0, 0.05) 0px 2px 4px 0px"
      w="full"
      position="fixed"
      zIndex={10}
      top={0}
    >
      <Flex
        justifyContent="space-between"
        py={{ base: 4, xl: 7 }}
        width="full"
        maxW={{ base: 1080, "1xl": 1280 }}
      >
        <Text
          fontSize={{ base: "sm", md: "md", "1xl": "xl" }}
          fontWeight="medium"
        >
          Milan
        </Text>
        <Flex
          fontSize={{ md: "sm", xl: "lg", "1xl": "xl" }}
          gap={{ base: 3, md: 5, "1xl": 10 }}
        >
          {navLinks.map(({ title, link }) => (
            <Link key={link} href={link}>
              <Text>{title}</Text>
            </Link>
          ))}
          <ThemeToggle />
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
