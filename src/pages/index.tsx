import MainLayout from '@components/Common/MainLayout'
import HeadingSeo from '@components/Common/HeadingSeo'
import dynamic from 'next/dynamic'
import { getBlogs, getFeaturedBlog } from '../services/blog'
import FeaturedBlogPost from '@components/Common/FeaturedBlogPost'
import PopularBlogs from '@components/Common/PopularBlogs'
import { Box, Flex } from '@chakra-ui/react'

const RecentBlogs = dynamic(() => import('../components/RecentBlogs'), {
  ssr: true
})

export async function getStaticProps() {
  const blogs = await getBlogs()
  const featuredBlog = await getFeaturedBlog()

  return {
    props: {
      blogs,
      featuredBlog: featuredBlog || null
    },
    revalidate: 3600
  }
}

export default function Home({ blogs, featuredBlog }: { blogs: IBlog[]; featuredBlog: IBlog }) {
  return (
    <>
      <HeadingSeo
        link="https://codewithmilan.com/"
        title="Home | Code With Milan"
        description="Code With Milan is a blog site where you can find programming tutorials"
      />
      <MainLayout>
        <Flex gap={10} direction={{ base: 'column', md: 'row' }}>
          <Box minW={{ base: 'full', md: 600, '1xl': 700 }}>
            <FeaturedBlogPost card={featuredBlog} />
          </Box>
          <PopularBlogs />
        </Flex>
        <RecentBlogs blogs={blogs} />
      </MainLayout>
    </>
  )
}
