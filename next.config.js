/** @type {import('next').NextConfig} */
const nextConfig = {
  // cafe24 정적 호스팅용 설정
  output: 'export',

  // 이미지 최적화 설정
  images: {
    unoptimized: true, // cafe24용 (정적 빌드 시 필요)
    // Sanity 이미지 CDN
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },

  // cafe24 호환성
  trailingSlash: true,
}

module.exports = nextConfig
