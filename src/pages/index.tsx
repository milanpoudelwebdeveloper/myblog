import { Box } from '@chakra-ui/react'
import BlogCard from '@components/Common/BlogCard'
import MainLayout from '@components/Common/MainLayout'
import RecentPosts from '@components/HomePage/RecentPosts'
import { getBlogs } from '../services/blog'
import HeadingSeo from '@components/Common/HeadingSeo'

const featuredPost = {
  id: 1,
  title: 'Is React better than Vue for your project?',
  content:
    'This is a description of the topic which is really good going. lorem ipsum is a dummy text which is used to fill the space of the content.',
  createdat: '2021-10-10',
  coverimage: '/images/image1.webp',
  categories: ['React'],
  published: true
}

export default function Home({ blogs }: { blogs: IBlog[] }) {
  return (
    <>
      <HeadingSeo
        link="https://codewithmilan.com/"
        title="Home | Code With Milan"
        description="Code With Milan is a blog site where you can find programming tutorials"
      />
      <MainLayout>
        <Box>
          <BlogCard card={featuredPost} imagHeight={300} />
          <RecentPosts blogs={blogs} />
        </Box>
      </MainLayout>
    </>
  )
}

export async function getServerSideProps() {
  try {
    const blogs = await getBlogs()

    if (blogs) {
      return {
        props: {
          blogs: blogs
        }
      }
    } else {
      return {
        props: {
          blogs: []
        }
      }
    }
  } catch (error) {
    return {
      props: {
        blogs: []
      }
    }
  }
}
