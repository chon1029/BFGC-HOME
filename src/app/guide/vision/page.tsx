import PageLayout from '@/components/layout/PageLayout'
import VisionHero from '@/components/sections/about/VisionHero'
import MissionStatement from '@/components/sections/about/MissionStatement'
import CoreValues from '@/components/sections/about/CoreValues'
import MinistryAreas from '@/components/sections/about/MinistryAreas'

/**
 * 메타데이터 설정
 */
export const metadata = {
  title: '교회비전 & 핵심가치 | 부다페스트한인선교교회',
  description: '부다페스트한인선교교회의 비전, 사명선언, 핵심가치, 사역영역을 소개합니다.',
}

/**
 * 교회 비전 페이지
 *
 * @returns 비전 페이지 JSX
 */
export default function VisionPage() {
  return (
    <PageLayout
      sidebarMenu="guide"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: '교회안내', href: '/guide' },
        { label: '교회비전', href: '/guide/vision' },
      ]}
    >
      {/* 인트로 Hero 섹션 */}
      <VisionHero />

      {/* 시명선언 (섹션 01) */}
      <MissionStatement />

      {/* 핵심가치 (섹션 02) */}
      <CoreValues />

      {/* 사역영역 (섹션 03) */}
      <MinistryAreas />
    </PageLayout>
  )
}
