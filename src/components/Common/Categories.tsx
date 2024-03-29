import { useCustomToast } from "@/src/hooks/useCustomToast";
import { getCategories } from "@/src/services/category";
import { Box, Divider, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { showToast } = useCustomToast();
  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch((e) => {
        showToast(e, "error");
      });
  }, []);

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
      {categories?.map((category) => (
        <Box key={category?.id}>
          <Box
            width="max-content"
            fontSize={{ base: "sm", lg: "md", "1xl": "lg" }}
          >
            {category?.name}
          </Box>
          <Divider my={3} />
        </Box>
      ))}
    </Box>
  );
};

export default Categories;
