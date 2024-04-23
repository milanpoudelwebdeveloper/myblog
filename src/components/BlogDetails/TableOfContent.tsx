import React from 'react'
import { Flex, Text, Divider } from '@chakra-ui/react'

interface Props {
  displayOnMobile: boolean
  minW?: string | object
}

const TableOfContent = ({ displayOnMobile, minW = { base: 360, '1xl': 420 } }: Props) => {
  return (
    <Flex
      minW={minW}
      h={{ base: 370, '1xl': 470 }}
      position={{ base: 'static', md: 'sticky' }}
      left={0}
      top={32}
      overflow="auto"
      px={4}
      direction="column"
      fontSize={{ base: 'sm', md: 'md', xl: 'sm', '1xl': 'md' }}
      gap={4}
      borderWidth={1}
      borderColor="rgb(27, 27, 27)"
      borderRadius={8}
      py={4}
      zIndex={10}
      display={{ base: displayOnMobile ? 'flex' : 'none', lg: !displayOnMobile ? 'flex' : 'none' }}
    >
      <Text fontSize="lg" fontWeight="600" pl={3}>
        Table Of Contents
      </Text>
      <Divider borderColor="rgb(27, 27, 27)" />
      <Text>&#8226; What to expect from here on out</Text>
      <Text>&#8226; Typography should be easy</Text>
      <Text>&#8226; What if we stack headings?</Text>
      <Text>&#8226; When a heading comes after a paragraph …</Text>
      <Text>&#8226; Sometimes I even use code in headings</Text>
      <Text>&#8226; Typography should be easy</Text>
      <Text>&#8226; What if we stack headings?</Text>
      <Text>&#8226; When a heading comes after a paragraph …</Text>
      <Text>&#8226; When a heading comes after a paragraph …</Text>
      <Text>&#8226; When a heading comes after a paragraph …</Text>
    </Flex>
  )
}

export default TableOfContent
