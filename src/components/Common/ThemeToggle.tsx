import { Box, IconButton, Switch, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Box position="relative" h="max-content">
      <Switch size="lg" colorScheme="purple" />

      <IconButton
        aria-label="toggle theme"
        rounded="full"
        size="xs"
        position="absolute"
        bottom={4}
        left={4}
        onClick={toggleColorMode}
        icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
      />
    </Box>
  );
};

export default ThemeToggle;
