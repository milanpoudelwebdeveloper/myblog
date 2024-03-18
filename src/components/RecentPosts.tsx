import { Box, Divider, Flex, Grid, Image, Text } from "@chakra-ui/react";
import React from "react";
import BlogCard from "./Common/BlogCard";

const recentPosts = [
  {
    title: "Is React better than Vue for your project?",
    desc: "This is a description of the topic which is really good going. lorem ipsum is a dummy text which is used to fill the space of the content.",
    date: "2021-10-10",
    image: "/images/image1.webp",
    categories: ["Programming", "React"],
  },
  {
    title: "Why use Next.js for your project?",
    desc: "This is a description of the topic which is really good going. lorem ipsum is a dummy text which is used to fill the space of the content.",
    date: "2021-10-11",
    image: "/images/image1.webp",
    categories: ["Programming", "React"],
  },
  {
    title: "How to use Chakra UI for your project?",
    desc: "This is a description of the topic which is really good going",
    date: "2021-10-12",
    image: "/images/image1.webp",
    categories: ["Programming", "React"],
  },
  {
    title: "How to use ReactJS and Chakra UI for your project?",
    desc: "This is a description of the topic which is really good going. lorem ipsum is a dummy text which is used to fill the space of the content.",
    date: "2021-10-12",
    image: "/images/image1.webp",
    categories: ["Programming", "React"],
  },
];

const RecentPosts = () => {
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
        {recentPosts.map((post) => (
          <BlogCard card={post} key={post?.title} />
        ))}
      </Grid>
    </Box>
  );
};

export default RecentPosts;
