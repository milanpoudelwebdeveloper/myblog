import { Box, Divider, Text } from "@chakra-ui/react";
import React from "react";

const categories = ["Programming", "React", "Vue", "Next.js", "Chakra UI"];
const Categories = () => {
  return (
    <Box
      p={{ base: 5, lg: 8 }}
      boxShadow="rgba(32, 54, 86, 0.15) 0px 8px 20px"
      borderRadius={14}
      mb={10}
    >
      <Text
        textAlign="center"
        color="#1A1A1A"
        fontSize={{ base: "lg", lg: "xl", "1xl": "24px" }}
        fontWeight="600"
      >
        Categories
      </Text>
      <Divider
        borderColor="#6941C6"
        w={20}
        borderWidth={2}
        mx="auto"
        mb={6}
        mt={2}
      />
      {categories.map((category) => (
        <Box key={category}>
          <Box
            width="max-content"
            fontSize={{ base: "sm", lg: "md", "1xl": "lg" }}
          >
            {category}
          </Box>
          <Divider my={3} />
        </Box>
      ))}
    </Box>
  );
};

export default Categories;
