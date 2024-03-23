import { axiosInstanceFile } from "@/axiosConfig";
import { useCustomToast } from "@/src/hooks/useCustomToast";
import { addCategory } from "@/src/services/category";
import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import MainLayout from "@components/Admin/Common/MainLayout";
import React from "react";

const AddCategory = () => {
  const [name, setName] = React.useState("");
  const [image, setImage] = React.useState<File | null | string>(null);
  let imageUrl = "";
  const { showToast } = useCustomToast();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCategory(name, image as File)
      .then((res) => {
        showToast(res, "success");
      })
      .catch((error) => {
        showToast(error, "error");
      });
  };

  if (image && typeof image !== "string") {
    imageUrl = URL.createObjectURL(image);
  } else {
    imageUrl = image as string;
  }

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
          <form onSubmit={submitHandler}>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              {imageUrl ? (
                <Image
                  borderRadius="full"
                  w={20}
                  h={20}
                  src={imageUrl}
                  alt="placeholder"
                  mx="auto"
                />
              ) : (
                <Center mt={4}>
                  <Input
                    type="file"
                    mx="auto"
                    maxW={400}
                    onChange={(e) => {
                      if (!e.target.files) return;
                      setImage(e.target.files[0]);
                    }}
                  />
                </Center>
              )}
              <Button type="submit">Submit</Button>
            </Box>
          </form>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default AddCategory;
