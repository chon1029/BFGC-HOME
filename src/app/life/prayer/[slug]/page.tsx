import { notFound } from 'next/navigation'
import { WeeklyPrayerCard } from '@/components/sections/prayer/WeeklyPrayerCard'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { MOCK_WEEKLY_PRAYERS } from '@/lib/mock/prayer-data'
import { WeeklyPrayer } from '@/types/prayer'

// 정적 경로 생성 (빌드 시점 및 런타임에 경로 인식 도움)
export async function generateStaticParams() {
    return MOCK_WEEKLY_PRAYERS.map((prayer) => ({
        slug: prayer.slug.current,
    }))
}

async function getWeeklyPrayer(slug: string): Promise<WeeklyPrayer | null> {
    const decodedSlug = decodeURIComponent(slug)
    // Mock Data에서 검색
    const prayer = MOCK_WEEKLY_PRAYERS.find(p => p.slug.current === decodedSlug) || null

    if (!prayer) {
        console.error(`Prayer not found for slug: ${slug} (decoded: ${decodedSlug})`)
        console.log('Available slugs:', MOCK_WEEKLY_PRAYERS.map(p => p.slug.current))
    }

    return prayer
}

export default async function PrayerDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const prayer = await getWeeklyPrayer(slug)

    if (!prayer) {
        notFound()
    }

    return (
        <PageLayout
            sidebarMenu="life"
            breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: '교회생활', href: '/life' },
                { label: '주간기도문', href: '/life/prayer' },
                { label: prayer.title, href: `/life/prayer/${slug}` },
            ]}
        >
            <div className="space-y-6">
                {/* Back Button */}
                <Link href="/life/prayer">
                    <Button
                        variant="outline"
                        className="group hover:bg-sky-50 hover:border-sky-300 transition-all"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        목록으로
                    </Button>
                </Link>

                {/* Prayer Card */}
                <WeeklyPrayerCard
                    title={prayer.title}
                    weekStartDate={prayer.weekStartDate}
                    weekEndDate={prayer.weekEndDate}
                    communityConfession={prayer.communityConfession}
                    dailyPrayers={prayer.dailyPrayers}
                />
            </div>
        </PageLayout>
    )
}
