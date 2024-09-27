/** @type {import('next').NextConfig} */
import bundleAnalyzer from '@next/bundle-analyzer'
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'myblogserver.s3.ap-south-1.amazonaws.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'd3esk90d93y9n7.cloudfront.net',
        port: ''
      }
    ]
  }
}

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})
export default withBundleAnalyzer(nextConfig)
