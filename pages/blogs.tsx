import { getBlogs } from "@/src/services/blog";
import { getCategories } from "@/src/services/category";
import { Box, Grid, Flex } from "@chakra-ui/react";
import BlogCard from "@components/Common/BlogCard";
import MainLayout from "@components/Common/MainLayout";
import React, { useEffect, useState } from "react";

const Blogs = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [blogs, setBlogs] = useState([]);

  const finalCategories = [
    {
      id: "all",
      name: "All",
    },
    ...categories,
  ];

  useEffect(() => {
    if (selectedCategory) {
      getBlogs(selectedCategory)
        .then((data) => {
          console.log(data);
          setBlogs(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedCategory]);

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <MainLayout>
      <Box mt={{ base: 6, md: 2 }}>
        <Flex my={4} gap={4}>
          {finalCategories?.map((category) => (
            <Box
              key={category?.id}
              bg={
                category?.id === selectedCategory
                  ? "rgb(165, 94, 234)"
                  : "white"
              }
              color={
                category?.id === selectedCategory
                  ? "rgb(255, 255, 255)"
                  : "rgb(165, 94, 234)"
              }
              boxShadow="rgba(165, 94, 234, 0.25) 0px 8px 20px"
              borderRadius={12}
              fontWeight="600"
              fontSize={{ base: "sm", md: "md", "1xl": "lg" }}
              py={{ base: 2, "1xl": 3 }}
              px={{ base: 4, "1xl": 5 }}
              cursor="pointer"
              onClick={() => setSelectedCategory(category?.id)}
            >
              {category?.name}
            </Box>
          ))}
        </Flex>
      </Box>
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        gap={6}
        mt={{ base: 5, lg: 10 }}
      >
        {blogs?.map((post) => (
          <BlogCard card={post} key={post?.title} />
        ))}
      </Grid>
    </MainLayout>
  );
};

export default Blogs;
