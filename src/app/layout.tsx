import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/layout/Footer'
import AuthProvider from '@/components/providers/AuthProvider'

export const metadata: Metadata = {
  title: '부다페스트한인선교교회',
  description: '헝가리에서 빛을 발하는 하나님의 공동체',
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
