/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "'https://myblogserver.s3.ap-south-1.amazonaws.com/*'",
        port: ''
      }
    ]
  }
}

export default nextConfig
