import HeroSection from '@/components/sections/HeroSection'
import ServiceInfoSection from '@/components/sections/ServiceInfoSection'
import NewcomerSection from '@/components/sections/NewcomerSection'
import LatestSermonSection from '@/components/sections/LatestSermonSection'
import CommunityHighlightsSection from '@/components/sections/CommunityHighlightsSection'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <ServiceInfoSection />
      <NewcomerSection />
      <LatestSermonSection />
      <CommunityHighlightsSection />
    </main>
  )
}
