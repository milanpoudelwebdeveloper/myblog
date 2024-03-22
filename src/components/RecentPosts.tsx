import { Box, Divider, Flex, Grid, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import BlogCard from "./Common/BlogCard";
import { getBlogs } from "../services/blog";

const RecentPosts = () => {
  const [blogs, setBlogs] = React.useState([]);
  useEffect(() => {
    getBlogs()
      .then((data) => {
        setBlogs(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Box mt={{ base: 7, lg: 10 }}>
      <Text
        color="#1A1A1A"
        fontSize={{ base: "lg", md: "xl", "1xl": "24px" }}
        fontWeight="600"
        my={3}
      >
        Recent Posts
      </Text>
      <Divider borderColor="#6941C6" w={9} borderWidth={2} />
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        gap={7}
      >
        {blogs?.map((blog: any) => (
          <BlogCard card={blog} key={blog?.id} />
        ))}
      </Grid>
    </Box>
  );
};

export default RecentPosts;
