import Header from '@/components/layout/Header'
import HeroSection from '@/components/sections/HeroSection'
import ServiceInfoSection from '@/components/sections/ServiceInfoSection'
import NewcomerSection from '@/components/sections/NewcomerSection'
import LatestSermonSection from '@/components/sections/LatestSermonSection'
import CommunityHighlightsSection from '@/components/sections/CommunityHighlightsSection'
import FeatureCardsSection from '@/components/sections/FeatureCardsSection'

export default function Home() {
  return (
    <>
      {/* 홈페이지용 Header (스크롤 시 전환) */}
      <Header />

      <main className="flex min-h-screen flex-col">
        <HeroSection />
        <ServiceInfoSection />
        <NewcomerSection />
        <LatestSermonSection />
        <CommunityHighlightsSection />
        <FeatureCardsSection />
      </main>
    </>
  )
}
