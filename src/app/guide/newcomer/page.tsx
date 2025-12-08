import PageLayout from '@/components/layout/PageLayout'
import NewcomerHero from '@/components/sections/about/NewcomerHero'
import RegistrationSteps from '@/components/sections/about/RegistrationSteps'
import NewcomerBenefits from '@/components/sections/about/NewcomerBenefits'
import NewcomerWelcome from '@/components/sections/about/NewcomerWelcome'
import NewcomerNurture from '@/components/sections/about/NewcomerNurture'
import NewcomerContact from '@/components/sections/about/NewcomerContact'

/**
 * 메타데이터 설정
 */
export const metadata = {
  title: '새가족 등록 안내 | 부다페스트한인선교교회',
  description: '부다페스트한인선교교회에 오신 새가족을 환영합니다. 등록 절차와 혜택을 안내합니다.',
}

/**
 * 새가족 등록 안내 페이지
 *
 * @returns 새가족 페이지 JSX
 */
export default function NewcomerPage() {
  return (
    <PageLayout
      sidebarMenu="guide"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: '교회안내', href: '/guide' },
        { label: '새가족 등록 안내', href: '/guide/newcomer' },
      ]}
    >
      {/* 환영 Hero 섹션 */}
      <NewcomerHero />

      {/* 등록 절차 안내 (4단계) */}
      <RegistrationSteps />

      {/* 새가족 혜택/프로그램 */}
      <NewcomerBenefits />

      {/* 새가족 환영회 */}
      <NewcomerWelcome />

      {/* 새가족 양육 프로그램 */}
      <NewcomerNurture />

      {/* 연락처 & CTA */}
      <NewcomerContact />
    </PageLayout>
  )
}
