import { Box, Divider, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import Categories from "./Categories";

const popularTopics = [
  {
    title: "Is React better than Vue in real ?",
    desc: "This is a description of the topic",
    date: "2021-10-10",
  },
  {
    title: "Why use Next.js for your project?",
    desc: "This is a description of the topic",
    date: "2021-10-11",
  },
  {
    title: "How to use Chakra UI for your project?",
    desc: "This is a description of the topic",
    date: "2021-10-12",
  },
];

const SideBar = () => {
  return (
    <Box flex={1}>
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
          Popular Posts
        </Text>
        <Divider
          borderColor="#6941C6"
          w={20}
          borderWidth={2}
          mx="auto"
          mb={6}
          mt={2}
        />
        {popularTopics.map((topic, index) => (
          <Flex key={index} alignItems="start" gap={{ base: 4, lg: 6 }}>
            <Image
              src="/images/image1.webp"
              alt="featured"
              borderRadius="full"
              width={{ base: 14, md: 16, "1xl": 20 }}
              height={{ base: 14, md: 16, "1xl": 20 }}
              objectFit="cover"
            />
            <Box>
              <Text
                fontSize={{ base: "sm", lg: "md", "1xl": "lg" }}
                fontWeight="bold"
              >
                {topic.title}
              </Text>
              <Text
                color="#667085"
                fontSize={{ base: "sm", "1xl": "md" }}
                my={1}
              >
                {topic.desc}
              </Text>
              <Text
                color="#6941C6"
                fontSize={{ base: "xs", lg: "sm", "1xl": "md" }}
              >
                {topic.date}
              </Text>
              <Divider my={3} />
            </Box>
          </Flex>
        ))}
      </Box>
      <Categories />
    </Box>
  );
};

export default SideBar;
