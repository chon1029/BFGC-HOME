import PageLayout from '@/components/layout/PageLayout'
import LocationHero from '@/components/sections/about/LocationHero'
import LocationTransport from '@/components/sections/about/LocationTransport'
import LocationMap from '@/components/sections/about/LocationMap'
import LocationGuide from '@/components/sections/about/LocationGuide'
import LocationContact from '@/components/sections/about/LocationContact'

/**
 * 메타데이터 설정
 */
export const metadata = {
  title: '오시는 길 | 부다페스트한인선교교회',
  description: '부다페스트한인선교교회의 위치와 오시는 방법을 안내합니다. Budapest, Ósvát u. 16, 1073',
}

/**
 * 오시는 길 페이지
 *
 * @returns 오시는 길 페이지 JSX
 */
export default function LocationPage() {
  return (
    <PageLayout
      sidebarMenu="guide"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: '교회안내', href: '/guide' },
        { label: '오시는 길', href: '/guide/location' },
      ]}
    >
      {/* Hero 섹션 */}
      <LocationHero />

      {/* 교통편 안내 (트램, 지하철, 자가용) */}
      <LocationTransport />

      {/* 지도 (Google Maps) */}
      <LocationMap />

      {/* 사진 가이드 (6단계) */}
      <LocationGuide />

      {/* 연락처 & 추가 정보 */}
      <LocationContact />
    </PageLayout>
  )
}
