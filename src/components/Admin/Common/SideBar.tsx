import { Box, Flex, Image } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaList } from "react-icons/fa";

const items = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: "/images/dashboardicon.svg",
  },
  {
    name: "Categories",
    path: "/admin/categories",
    icon: "/images/categoryicon.svg",
  },
  {
    name: "Blogs",
    path: "/admin/blogs",
    icon: "/images/blogicon.svg",
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: "/images/usericon.svg",
  },
];

const SideBar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;
  return (
    <Box bg="#FFF" color="#B1B1B1" fontSize="md" p={4} w={240}>
      {items.map((item) => (
        <Link href={item?.path} key={item?.name}>
          <Flex
            alignItems="center"
            mb={4}
            color="#202224"
            gap={4}
            bg={isActive(item?.path) ? "#4880FF" : "white"}
            py={4}
            pl={4}
            pr={7}
            borderRadius={10}
          >
            <Image src={item.icon} alt={item.name} w={6} objectFit="contain" />
            <Box
              fontSize="sm"
              fontWeight="600"
              color={isActive(item?.path) ? "white" : "#202224"}
            >
              {item.name}
            </Box>
          </Flex>
        </Link>
      ))}
    </Box>
  );
};

export default SideBar;
