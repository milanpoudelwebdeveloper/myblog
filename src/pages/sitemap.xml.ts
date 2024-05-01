import axios from 'axios'
import { NextApiResponse } from 'next'

const generateSiteMap = (blogs: IBlog[]) => {
  const domain = 'https://www.codewithmilan.com'
  const pages = [
    'blogs?category=all&amp;page=1',
    'blogs?category=2&amp;page=1',
    'blogs?category=3&amp;page=1',
    'blogs?category=4&amp;page=1',
    'about',
    'contact',
    'login',
    'signup'
  ]
  const siteMap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${domain}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1</priority>
    </url>
  ${pages.map((page) => {
    return `

      <url>
        <loc>${domain}/${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
      `
  })}
  ${blogs
    .map((blog) => {
      return `
      <url>
        <loc>${`${domain}/blog/${blog?.id}/${blog?.metatitle}`}</loc>
        <lastmod>${blog?.createdat}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `
    })
    .join('')}
  </urlset>
  `
  return siteMap
}

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  const response = await axios.get('https://codwithmilan.com/api/blog?fetchAll=all')
  const siteMap = generateSiteMap(response?.data?.data)
  res.setHeader('Content-Type', 'text/xml')
  res.write(siteMap)
  res.end()
  return {
    props: {}
  }
}

export default function SiteMap() {}
