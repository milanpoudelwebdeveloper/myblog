import { Tabs, TabList, Tab, Box, Grid } from "@chakra-ui/react";
import BlogCard from "@components/Common/BlogCard";
import MainLayout from "@components/Common/MainLayout";
import React from "react";

const categories = ["Next", "React", "Node", "Express"];

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

const blogs = () => {
  return (
    <MainLayout>
      <Box mt={{ base: 6, md: 2 }}>
        <Tabs variant="unstyled">
          <TabList gap={4}>
            {categories?.map((category) => (
              <Tab
                key={category}
                bg="white"
                boxShadow="rgba(165, 94, 234, 0.25) 0px 8px 20px"
                borderRadius={12}
                _selected={{
                  color: "rgb(255, 255, 255)",
                  bg: "rgb(165, 94, 234)",
                }}
                fontWeight="600"
                fontSize={{ base: "sm", md: "md", "1xl": "lg" }}
                py={{ base: 2, "1xl": 3 }}
                px={{ base: 4, "1xl": 5 }}
              >
                {category}
              </Tab>
            ))}
          </TabList>
        </Tabs>
      </Box>
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        gap={6}
        mt={{ base: 5, lg: 10 }}
      >
        {recentPosts.map((post) => (
          <BlogCard card={post} key={post?.title} />
        ))}
      </Grid>
    </MainLayout>
  );
};

export default blogs;
