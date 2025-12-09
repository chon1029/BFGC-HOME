/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel 배포용 설정 (동적 기능 활성화)
  // output: 'export', // 제거: NextAuth 등 서버 기능 사용을 위해 제거

  // 이미지 최적화 설정
  images: {
    // unoptimized: true, // 제거: Vercel 이미지 최적화 사용
    qualities: [75, 90, 100],
    // Sanity 이미지 CDN
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // 구글 프로필 이미지
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Unsplash 이미지 (Mock 데이터용)
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com', // 유튜브 썸네일
      },
    ],
  },

  // 트레일링 슬래시 (선택 사항, 유지해도 무방)
  trailingSlash: true,
}

module.exports = nextConfig
