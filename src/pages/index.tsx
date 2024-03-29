import { Box } from '@chakra-ui/react'
import BlogCard from '@components/Common/BlogCard'
import MainLayout from '@components/Common/MainLayout'
import RecentPosts from '@components/HomePage/RecentPosts'
import Head from 'next/head'

const featuredPost = {
  id: 1,
  title: 'Is React better than Vue for your project?',
  content:
    'This is a description of the topic which is really good going. lorem ipsum is a dummy text which is used to fill the space of the content.',
  createdat: '2021-10-10',
  coverimage: '/images/image1.webp',
  category: 1,
  categoryname: 'React',
  published: true
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Box>
          <BlogCard card={featuredPost} imagHeight={300} />
          <RecentPosts />
        </Box>
      </MainLayout>
    </>
  )
}
