import { getBlogs, getFeaturedBlog } from '../services/blog'
import { Box } from '@chakra-ui/react'

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

export default function Home() {
  return (
    <>
      <Box>Welcome</Box>
    </>
  )
}
