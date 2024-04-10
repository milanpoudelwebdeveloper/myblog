import { Box } from '@chakra-ui/react'
import BlogCard from '@components/Common/BlogCard'
import MainLayout from '@components/Common/MainLayout'
import HeadingSeo from '@components/Common/HeadingSeo'
import dynamic from 'next/dynamic'
import { getBlogs, getFeaturedBlog } from '../services/blog'

const RecentBlogs = dynamic(() => import('../components/HomePage/RecentBlogs'))

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
        <Box>
          {featuredBlog && <BlogCard card={featuredBlog} imagHeight={300} imageLoadFast={true} />}
          <RecentBlogs blogs={blogs} />
        </Box>
      </MainLayout>
    </>
  )
}
