import { Box, Image, Text } from "@chakra-ui/react";
import MainLayout from "@components/Common/MainLayout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getBlogDetails } from "@/src/services/blog";

const BlogDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [blogDetail, setBlogDetail] = useState({} as any);

  useEffect(() => {
    if (id) {
      getBlogDetails(id)
        .then((data) => {
          setBlogDetail({ ...blogDetail, ...data });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [id]);
  return (
    <MainLayout>
      <Box mt={4}>
        <Text
          color="#1A1A1A"
          fontSize={{ base: "30px", "1xl": "38px" }}
          fontWeight="bold"
          lineHeight={1.4}
        >
          Grid system for better Design User Interface
        </Text>
        <Text
          color="#6941C6"
          fontSize={{ base: "sm", "1xl": "md" }}
          fontWeight="600"
          my={2}
        >
          Milan Poudel &#x2022; 2021-10-11
        </Text>
        <Image
          src="/images/image.png"
          alt="featured"
          borderRadius="10px"
          my={4}
          width="100%"
          objectFit="cover"
          h={380}
        />
        <Text mt={10} fontSize={{ base: "md", "1xl": "lg" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi animi,
          pariatur minima itaque quia nemo nihil aperiam ab nam dolorem
          laudantium consequatur sed, natus accusamus ipsam neque numquam rerum
          sit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
          sunt ullam vero expedita molestias aliquid doloribus sit, odio
          consequatur! In harum natus consequuntur distinctio dolor aut
          repudiandae ullam.
        </Text>
        <Text my={3} fontSize={{ base: "md", "1xl": "lg" }}>
          emo fugit deserunt omnis blanditiis vero quos, sint alias quod,
          nostrum culpa iusto! Culpa ducimus consectetur doloremque fuga nam
          ratione beatae labore adipisci, veritatis vel molestiae corrupti,
          obcaecati perferendis accusantium. Deserunt porro sed deleniti,
          incidunt eligendi nisi, explicabo neque exercitationem unde quo iste
          laboriosam. Fugiat, architecto ipsa quasi natus ut minima perspiciatis
          eveniet eligendi maiores molestias et, voluptas consequatur vitae,
          quidem a optio expedita veritatis maxime possimus voluptatum incidunt
          nisi provident odit. Quas ad enim nobis dicta culpa eos facere, odit
          sequi veniam? Culpa quibusdam exercitationem rem perferendis cum?
          Dicta ut maiores asperiores! Quasi optio necessitatibus incidunt nemo
          adipisci nostrum quibusdam, voluptatum sunt facere laudantium soluta
          quae molestiae qui ad aperiam maxime, provident perspiciatis deserunt
          voluptate. Suscipit ducimus odio iure
        </Text>
        <Text fontSize="28px" fontWeight="600">
          Are Programmers Good To Us?
        </Text>
        <Text mt={5} fontSize="lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi animi,
          pariatur minima itaque quia nemo nihil aperiam ab nam dolorem
          laudantium consequatur sed, natus accusamus ipsam neque numquam rerum
          sit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
          sunt ullam vero expedita molestias aliquid doloribus sit, odio
          consequatur! In harum natus consequuntur distinctio dolor aut
          repudiandae ullam.
        </Text>
        <Image
          src="/images/image.png"
          alt="featured"
          borderRadius="10px"
          my={4}
          width="100%"
          objectFit="cover"
          h={380}
        />
      </Box>
    </MainLayout>
  );
};

export default details;
