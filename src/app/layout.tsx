import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/layout/Footer'
import AuthProvider from '@/components/providers/AuthProvider'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bfgc.kr'), // 실제 도메인으로 변경
  title: {
    default: '부다페스트한인선교교회 | BFGC',
    template: '%s | 부다페스트한인선교교회',
  },
  description: '헝가리 부다페스트에 위치한 한인선교교회입니다. 말씀과 기도로 세워지는 믿음의 공동체에 여러분을 초대합니다.',
  keywords: ['부다페스트 한인교회', '헝가리 한인교회', '부다페스트 한인선교교회', 'BFGC', '헝가리 교회', '부다페스트 예배'],
  authors: [{ name: 'BFGC Media Team' }],
  creator: 'BFGC',
  publisher: '부다페스트한인선교교회',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: '부다페스트한인선교교회 | BFGC',
    description: '헝가리에서 빛을 발하는 하나님의 공동체',
    url: 'https://www.bfgc.kr',
    siteName: '부다페스트한인선교교회',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg', // OG 이미지 (추후 추가 필요)
        width: 1200,
        height: 630,
        alt: '부다페스트한인선교교회 전경',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '부다페스트한인선교교회',
    description: '헝가리에서 빛을 발하는 하나님의 공동체',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body
        className="font-sans antialiased"
      >
        <AuthProvider>
          {/* Header는 각 페이지에서 개별 관리 */}
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
