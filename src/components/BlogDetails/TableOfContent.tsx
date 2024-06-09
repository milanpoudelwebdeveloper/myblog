import React from 'react'
import { Flex, Text, Divider, Box } from '@chakra-ui/react'

interface IToc {
  id: string
  tag: string
  text: string
}

interface Props {
  displayOnMobile: boolean
  minW?: string | object
  toc: IToc[]
}

const TableOfContent = ({ toc, displayOnMobile, minW = { base: 360, '1xl': 420 } }: Props) => {
  return (
    <Flex
      minW={minW}
      h={{ base: 370, '1xl': 420 }}
      position={{ base: 'static', md: 'sticky' }}
      top={{ base: 32, xl: 28, '1xl': 32 }}
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
      <Text fontSize={{ base: 'md', '1xl': 'lg' }} fontWeight="600" pl={3}>
        Table Of Contents
      </Text>
      <Divider borderColor="rgb(27, 27, 27)" mb={3} />
      <Box pl={4}>
        {toc?.map((item) => (
          <Box mb={5} key={item?.id}>
            <a href={`#${item?.id}`}>
              <Text fontSize={{ base: 'sm', '1xl': 'md' }} fontWeight="500">
                &#8226; {item?.text}
              </Text>
            </a>
          </Box>
        ))}
      </Box>

      {/* <Text>&#8226; Typography should be easy</Text>
      <Text>&#8226; What if we stack headings?</Text>
      <Text>&#8226; When a heading comes after a paragraph …</Text>
      <Text>&#8226; Sometimes I even use code in headings</Text>
      <Text>&#8226; Typography should be easy</Text>
      <Text>&#8226; What if we stack headings?</Text>
      <Text>&#8226; When a heading comes after a paragraph …</Text>
      <Text>&#8226; When a heading comes after a paragraph …</Text>
      <Text>&#8226; When a heading comes after a paragraph …</Text> */}
    </Flex>
  )
}

export default TableOfContent
