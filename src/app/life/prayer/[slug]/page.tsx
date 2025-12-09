import { client } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import { WeeklyPrayerCard } from '@/components/sections/prayer/WeeklyPrayerCard'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface DailyPrayer {
    date: string
    dayOfWeek: string
    theme: string
    prayerTopic1: string
    prayerTopic2: string
    prayerTopic3: string
}

interface WeeklyPrayer {
    _id: string
    title: string
    weekStartDate: string
    weekEndDate: string
    communityConfession: string
    dailyPrayers: DailyPrayer[]
}

async function getWeeklyPrayer(slug: string): Promise<WeeklyPrayer | null> {
    const prayer = await client.fetch(
        `*[_type == "weeklyPrayer" && slug.current == $slug && isPublished == true][0] {
            _id,
            title,
            weekStartDate,
            weekEndDate,
            communityConfession,
            dailyPrayers
        }`,
        { slug }
    )
    return prayer
}

export default async function PrayerDetailPage({
    params,
}: {
    params: { slug: string }
}) {
    const prayer = await getWeeklyPrayer(params.slug)

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
                { label: prayer.title, href: `/life/prayer/${params.slug}` },
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
