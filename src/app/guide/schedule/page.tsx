import PageLayout from '@/components/layout/PageLayout'
import ScheduleHero from '@/components/sections/about/ScheduleHero'
import ScheduleMessage from '@/components/sections/about/ScheduleMessage'
import ScheduleCards from '@/components/sections/about/ScheduleCards'
import ScheduleInfo from '@/components/sections/about/ScheduleInfo'

/**
 * 메타데이터 설정
 */
export const metadata = {
  title: '예배시간 안내 | 부다페스트한인선교교회',
  description: '부다페스트한인선교교회의 예배 시간과 장소를 안내합니다. 주일예배, 청소키즈, 금요기도회, 여호수아청년부',
}

/**
 * 예배시간 안내 페이지
 *
 * @returns 예배시간 페이지 JSX
 */
export default function SchedulePage() {
  return (
    <PageLayout
      sidebarMenu="guide"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: '교회안내', href: '/guide' },
        { label: '예배시간 안내', href: '/guide/schedule' },
      ]}
    >
      {/* Hero 섹션 (흑백 배경 이미지) */}
      <ScheduleHero />

      {/* 예배 안내 메시지 */}
      <ScheduleMessage />

      {/* 예배 시간표 (카드 스타일) */}
      <ScheduleCards />

      {/* 방문 안내 (주차, 교통편 등) */}
      <ScheduleInfo />
    </PageLayout>
  )
}
