import { Box, IconButton, Switch, useColorMode } from '@chakra-ui/react'
import { FaMoon, FaSun } from 'react-icons/fa'

const ThemeToggle = () => {
  const { toggleColorMode, colorMode } = useColorMode()

  return (
    <Box position="relative" h="max-content" px={2}>
      <Switch size="lg" colorScheme="purple" onChange={toggleColorMode} isChecked={colorMode === 'dark'} p={1} />
      <IconButton
        variant="unstyled"
        aria-label="toggle theme"
        rounded="full"
        size="xs"
        position="absolute"
        bottom={1.5}
        right={1.5}
        onClick={toggleColorMode}
        icon={<FaMoon size={14} color="white" />}
        display={colorMode === 'light' ? 'block' : 'none'}
      />
      <IconButton
        aria-label="toggle theme"
        rounded="full"
        size="xs"
        position="absolute"
        bottom={1.5}
        left={4}
        onClick={toggleColorMode}
        icon={<FaSun size={14} color="white" />}
        display={colorMode === 'dark' ? 'block' : 'none'}
      />
    </Box>
  )
}

export default ThemeToggle
