/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'myblogserver.s3.ap-south-1.amazonaws.com',
        port: ''
      }
    ]
  }
}

export default nextConfig
