import axios from 'axios'
import { NextApiResponse } from 'next'

const generateSiteMap = (blogs: IBlog[]) => {
  const domain = 'https://codewithmilan.com'
  const pages = ['/', 'blogs?category=all', 'about', 'contact', 'login', 'signup']
  const siteMap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map((page) => {
    return `
      <url>
        <loc>${domain}/${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${page === '/' ? 1 : 0.8}</priority>
      </url>
      `
  })}
  ${blogs
    .map((blog) => {
      return `
      <url>
        <loc>${`${domain}/blog/${blog.id}`}</loc>
        <lastmod>${blog.createdat}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.6</priority>
      </url>
    `
    })
    .join('')}
  </urlset>
  `
  return siteMap
}

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  const response = await axios.get('https://codwithmilan.com/api/blog?categoryId=all')
  const siteMap = generateSiteMap(response?.data?.data)
  res.setHeader('Content-Type', 'text/xml')
  res.write(siteMap)
  res.end()
  return {
    props: {}
  }
}

export default function SiteMap() {}

//version 2

// import { MetadataRoute } from 'next'

// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   const domain = 'https://codewithmilan.com'
//   const pages = ['/', 'blogs?category=all', 'about', 'contact', 'login', 'signup']
//   const blogs = await fetch('https://codwithmilan.com/api/blog')
//   const data = await blogs.json()

//   const post = data.map((blog: IBlog) => {
//     return {
//       url: `${domain}/blog/${blog.id}`,
//       lastModified: blog.createdat,
//       changeFrequency: 'weekly' as const
//     }
//   })

//   const siteMap = pages.map((page, index) => {
//     return {
//       url: `${domain}/${page}`,
//       lastModified: new Date(),
//       changeFrequency: 'weekly' as const,
//       priority: index === 0 ? 1 : 0.8
//     }
//   })

//   return [...siteMap, ...post]
// }
