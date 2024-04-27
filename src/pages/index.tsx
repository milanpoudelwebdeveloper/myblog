import MainLayout from '@components/Common/MainLayout'
import HeadingSeo from '@components/Common/HeadingSeo'
import dynamic from 'next/dynamic'
import { getBlogs, getFeaturedBlog, getPopularBlogs } from '../services/blog'
import FeaturedBlogPost from '@components/Common/FeaturedBlogPost'
import PopularBlogs from '@components/Common/PopularBlogs'
import { Flex } from '@chakra-ui/react'

const RecentBlogs = dynamic(() => import('../components/RecentBlogs'), {
  ssr: true
})

export async function getStaticProps() {
  const blogs = await getBlogs()
  const featuredBlog = await getFeaturedBlog()
  const popularBlogs = await getPopularBlogs()

  return {
    props: {
      blogs: blogs?.data,
      featuredBlog: featuredBlog || null,
      popularBlogs: popularBlogs || null
    },
    revalidate: 3600
  }
}

interface Props {
  blogs: IBlog[]
  featuredBlog: IBlog
  popularBlogs: IBlog[]
}

export default function Home({ blogs, featuredBlog, popularBlogs }: Props) {
  return (
    <>
      <HeadingSeo
        link="https://www.codewithmilan.com/"
        title="Home | Code With Milan"
        description="Code With Milan is a blog site where you can find programming tutorials"
      />
      <MainLayout>
        <Flex gap={{ base: 7, xl: 10 }} direction={{ base: 'column', lg: 'row' }} mt={{ base: 2, '1xl': 4 }}>
          <FeaturedBlogPost card={featuredBlog} />
          <PopularBlogs blogs={popularBlogs} />
        </Flex>
        <RecentBlogs blogs={blogs} />
      </MainLayout>
    </>
  )
}
