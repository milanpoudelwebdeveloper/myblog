import { Button, Flex, useColorMode } from '@chakra-ui/react'

const ThemeToggle = () => {
  const { toggleColorMode, colorMode } = useColorMode()

  return (
    <Flex
      bg={colorMode === 'dark' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)'}
      borderRadius={8}
      borderWidth="0.6px"
      borderColor={colorMode === 'dark' ? 'rgb(38, 38, 38)' : 'rgb(229, 229, 229)'}
      boxShadow="rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px"
      gap={1}
      p={1}
    >
      <Button
        variant="unstyled"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg={colorMode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'none'}
        onClick={toggleColorMode}
        h={{ base: 7, '1xl': 8 }}
        aria-label="Toggle color mode"
      >
        <svg
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="m12 2v2" />
          <path d="m12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="m2 12h2" />
          <path d="m20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      </Button>
      <Button
        variant="unstyled"
        display="flex"
        justifyContent="center"
        alignItems="center"
        onClick={toggleColorMode}
        bg={colorMode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'none'}
        h={{ base: 7, '1xl': 8 }}
        aria-label="Toggle color mode"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
      </Button>
    </Flex>
  )
}

export default ThemeToggle
