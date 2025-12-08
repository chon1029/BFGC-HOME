import PageLayout from '@/components/layout/PageLayout'
import GreetingHeroSection from '@/components/sections/about/GreetingHeroSection'
import PastorMessageSection from '@/components/sections/about/PastorMessageSection'

export const metadata = {
    title: '인사말씀 | 부다페스트한인선교교회',
    description: '담임목사 인사말',
}

export default function GreetingPage() {
    return (
        <PageLayout
            sidebarMenu="guide"
            breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: '교회안내', href: '/guide' },
                { label: '인사말씀', href: '/guide/greeting' },
            ]}
        >
            <GreetingHeroSection />
            <PastorMessageSection />
        </PageLayout>
    )
}
