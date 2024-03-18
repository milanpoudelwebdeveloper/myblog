import {
  Box,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import MainLayout from "@components/Admin/Common/MainLayout";
import React from "react";

const AddCategory = () => {
  return (
    <MainLayout>
      <Box>
        <Text fontSize="lg" fontWeight="500" textAlign="center" color="#1814F3">
          Add Category
        </Text>
        <Divider
          mt={3}
          borderColor="#1814F3"
          w={10}
          borderWidth={2}
          mx="auto"
        />
        <Box mt={10}>
          <Box alignItems="center" px={20} gap={20} mx="auto">
            <FormControl maxW={400} mx="auto" mb={10}>
              <FormLabel color="#232323" fontSize="md">
                Title
              </FormLabel>
              <Input
                type="text"
                borderColor="#DFEAF2"
                borderRadius={17}
                bg="#FFF"
                _placeholder={{ color: "#718EBF" }}
                placeholder="Enter title"
              />
            </FormControl>
            <Image
              borderRadius="full"
              w={20}
              h={20}
              src="/images/image.png"
              alt="placeholder"
              mx="auto"
            />
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default AddCategory;
