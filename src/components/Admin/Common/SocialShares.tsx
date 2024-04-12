import { Box, Flex } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'

interface Props {
  shareURL: string
  blogDetail: IBlog
}

const SocialShares = ({ shareURL, blogDetail }: Props) => {
  const links = [
    {
      name: 'facebook',
      icon: 'facebook',
      link: `https://facebook.com/sharer/sharer.php?u=${shareURL}`
    },
    {
      name: 'twitter',
      icon: 'twitter',
      link: `https://twitter.com/intent/tweet?url=${shareURL}&text=${blogDetail?.title}&hashtags=react,nodejs,expressjs,aws`
    },
    {
      name: 'linkedin',
      icon: 'linkedin',
      link: `https://www.linkedin.com/shareArticle?mini=true&url=${shareURL}&title=${blogDetail?.title}&summary=${blogDetail?.content.slice(0, 140)}&source=codewithmilan`
    },
    {
      name: 'reddit',
      icon: 'reddit',
      link: `https://www.reddit.com/submit?url=${shareURL}&title=${blogDetail?.title}`
    },
    {
      name: 'whatsapp',
      icon: 'whatsapp',
      link: `https://wa.me/?text=${shareURL}`
    },
    {
      name: 'pinterest',
      icon: 'pinterest',
      link: `https://pinterest.com/pin/create/button/?url=${shareURL}&media=${blogDetail?.coverimage}&description=${blogDetail?.title}`
    }
  ]

  return (
    <Flex direction={{ base: 'row', lg: 'row' }} top="30vh" left={-24} gap={{ base: 3, lg: 4 }} mt={2}>
      {links.map(({ name, icon, link }) => (
        <Box key={name}>
          <a href={link} target="_blank" rel="noreferrer">
            <Box
              position="relative"
              w={{ base: 6, lg: 7 }}
              h={{ base: 6, lg: 7 }}
              maxW="full"
              maxH="full"
              cursor="pointer"
              borderRadius="full"
              overflow="hidden"
            >
              <Image
                src={`/images/${icon}.webp`}
                alt={name}
                fill
                style={{
                  objectFit: 'cover'
                }}
              />
            </Box>
          </a>
        </Box>
      ))}
    </Flex>
  )
}

export default SocialShares