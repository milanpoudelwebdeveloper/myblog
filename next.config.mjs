/** @type {import('next').NextConfig} */
const nextConfig = {
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

export default nextConfig
