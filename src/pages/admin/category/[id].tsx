import { axiosInstanceFile } from "@/axiosConfig";
import { useCustomToast } from "@/src/hooks/useCustomToast";
import {
  addCategory,
  editCategory,
  getCategoryDetails,
} from "@/src/services/category";
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
import { useRouter } from "next/router";
import React from "react";

const CategoryDetails = ({ categoryDetails }: { categoryDetails: any }) => {
  const [name, setName] = React.useState(categoryDetails?.name);
  const [image, setImage] = React.useState<File | undefined | string>(
    categoryDetails?.image
  );
  let imageUrl = "";
  const router = useRouter();
  const { id } = router.query;
  const { showToast } = useCustomToast();

  const editHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editCategory(id as string, name)
      .then((res) => {
        showToast(res, "success");
      })
      .catch((error) => {
        showToast(error, "error");
      });
  };

  if (image && typeof image !== "string") {
    imageUrl = URL.createObjectURL(image) as string;
  } else {
    imageUrl = image as string;
  }

  return (
    <MainLayout>
      <Box>
        <Text fontSize="lg" fontWeight="500" textAlign="center" color="#1814F3">
          Category Details
        </Text>
        <Divider
          mt={3}
          borderColor="#1814F3"
          w={10}
          borderWidth={2}
          mx="auto"
        />
        <Box mt={10}>
          <form onSubmit={editHandler}>
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
              {imageUrl || image ? (
                <Center>
                  <Image
                    borderRadius="full"
                    w={20}
                    h={20}
                    src={imageUrl}
                    alt="placeholder"
                  />
                  <Button onClick={() => setImage("")}>Delete Photo</Button>
                </Center>
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
              <Button type="submit">Edit</Button>
            </Box>
          </form>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default CategoryDetails;

export async function getServerSideProps(context: any) {
  const { id } = context.params;
  try {
    const categoryDetails = await getCategoryDetails(id);

    if (categoryDetails) {
      return {
        props: {
          categoryDetails: categoryDetails,
        },
      };
    } else {
      return {
        props: {
          categories: [],
        },
      };
    }
  } catch (error: any) {
    return {
      props: {
        categories: [],
      },
    };
  }
}
