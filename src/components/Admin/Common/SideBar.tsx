import { Box } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const items = [
  {
    name: "Dashboard",
    path: "/admin",
  },
  {
    name: "Categories",
    path: "/admin/categories",
  },
  {
    name: "Blogs",
    path: "/admin/blogs",
  },
  {
    name: "Users",
    path: "/admin/users",
  },
];

const SideBar = () => {
  return (
    <Box bg="#FFF" color="#B1B1B1" fontSize="md" p={4}>
      {items.map((item, index) => (
        <Link href={item?.path} key={item?.name}>
          <Box p={2} mb={8}>
            {item.name}
          </Box>
        </Link>
      ))}
    </Box>
  );
};

export default SideBar;
