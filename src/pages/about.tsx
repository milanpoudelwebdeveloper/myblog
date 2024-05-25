import { Box, Button, Text } from '@chakra-ui/react'
import HeadingSeo from '@components/Common/HeadingSeo'
import MainLayout from '@components/Common/MainLayout'
import { ABOUT, CONTACT } from '@constants/routes'
import Link from 'next/link'
import React from 'react'

const About = () => {
  return (
    <>
      <HeadingSeo
        title="About | Code With Milan"
        description="Learn more about the author, purposes and the overall platform of Code With Milan"
        link={`https://www.codewithmilan.com/${ABOUT}`}
      />
      <MainLayout>
        <Box fontSize={{ base: 'sm', '1xl': 'lg' }} maxW={{ base: 700, '1xl': 870 }} mx="auto">
          <Text fontSize={{ base: '28px', xl: '30px', '1xl': '40px' }} fontWeight="700" letterSpacing="2px" mb={7} as="h1">
            About Us
          </Text>
          <Text lineHeight="1.7" as="h2">
            Welcome to this blog site. I am Milan Poudel from Nepal and I am the maintainer, creator and author of this platform. I have
            built this platform from scratch using different technologies and with a lot of passion.. With this platform, I want to share my
            knowledge and experience that I have gained through years. I believe that knowledge is the power and sharing knowledge is the
            best way to empower others.
          </Text>
          <Text mt={7} lineHeight="1.7" as="h2">
            About me, I am dedicated full time developer and in it&apos;s in my free time, I write blogs and share my knowledge with the
            community. I have proficient knowledge in frontend development using React and NextJS, backend development using Node/Express
            and other database and cloud technologies. With this platform, I want to share all the knowledge I have gained in these domains.
            I hope you will find my blogs helpful and informative. If there&apos;s any information that you find here is wrong or outdated,
            please let me know. Please write &quot;Feedback&quot; as a subject while filling the form. I will try to correct it as soon as
            possible.
          </Text>
          <Text mt={7} mb={8} lineHeight="1.7" as="h2">
            Likewise, if you want to contribute to this platform, you can always contact me. I am open to any kind of contribution. If you
            want to write them here. Please contact me through the form with the subject &quot;About writing&quot;. I will create an account
            for you and will send an activation email. If you want to contribute in any other way, you can contact me. I will be happy to
            work with you. If there&apos;s something that you want to learn, please let me know. I will try to write a blog on that topic if
            that falls under my domain.
          </Text>
          <Link href={CONTACT} shallow>
            <Button bg="#6941C6" color="white" fontSize={{ md: 'sm', '1xl': 'lg' }} fontWeight="normal">
              Contact Us
            </Button>
          </Link>
        </Box>
      </MainLayout>
    </>
  )
}

export default About
