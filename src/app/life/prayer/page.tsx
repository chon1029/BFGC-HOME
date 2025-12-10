'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { client } from '@/lib/sanity'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, ChevronRight, Sparkles, Plus } from 'lucide-react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import Link from 'next/link'
import { WeeklyPrayerCard } from '@/components/sections/prayer/WeeklyPrayerCard'
import { PrayerHeroSection } from '@/components/sections/prayer/PrayerHeroSection'
import { WeeklyPrayerModal } from '@/components/modals/WeeklyPrayerModal'
import PageLayout from '@/components/layout/PageLayout'

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
    slug: {
        current: string
    }
    communityConfession: string
    dailyPrayers: DailyPrayer[]
}

export default function PrayerPage() {
    const { data: session } = useSession()
    const [latestPrayer, setLatestPrayer] = useState<WeeklyPrayer | null>(null)
    const [archivePrayers, setArchivePrayers] = useState<WeeklyPrayer[]>([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const isAdmin = session?.user?.role === 'admin'

    useEffect(() => {
        fetchPrayers()
    }, [])

    const fetchPrayers = async () => {
        try {
            const data = await client.fetch(`
                *[_type == "weeklyPrayer" && isPublished == true] | order(weekStartDate desc) {
                    _id,
                    title,
                    weekStartDate,
                    weekEndDate,
                    slug,
                    communityConfession,
                    dailyPrayers
                }
            `)

            if (data.length > 0) {
                setLatestPrayer(data[0])
                setArchivePrayers(data.slice(1))
            }
        } catch (error) {
            console.error('Failed to fetch prayers:', error)
        } finally {
            setLoading(false)
        }
    }

    // Get main theme from latest prayer
    const mainTheme = latestPrayer?.dailyPrayers?.[0]?.theme || ''
    const currentWeek = latestPrayer ? `${format(new Date(latestPrayer.weekStartDate), 'M월 d일', { locale: ko })} - ${format(new Date(latestPrayer.weekEndDate), 'M월 d일', { locale: ko })}` : ''

    if (loading) {
        return (
            <PageLayout
                sidebarMenu="life"
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: '교회생활', href: '/life' },
                    { label: '주간기도문', href: '/life/prayer' },
                ]}
            >
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
                        <p className="text-slate-600">로딩 중...</p>
                    </div>
                </div>
            </PageLayout>
        )
    }

    return (
        <PageLayout
            sidebarMenu="life"
            breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: '교회생활', href: '/life' },
                { label: '주간기도문', href: '/life/prayer' },
            ]}
        >
            <div className="space-y-8">
                {/* Hero Section */}
                <PrayerHeroSection
                    currentWeek={currentWeek}
                    mainTheme={mainTheme}
                />

                {/* Admin Button */}
                {isAdmin && (
                    <div className="flex justify-end">
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-sky-600 hover:bg-sky-700 shadow-lg"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            기도문 작성
                        </Button>
                    </div>
                )}

                {!latestPrayer ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="border-2 border-sky-200 shadow-xl">
                            <CardContent className="flex flex-col items-center justify-center py-16">
                                <div className="bg-gradient-to-br from-sky-100 to-blue-100 rounded-full p-6 mb-6">
                                    <Calendar className="h-16 w-16 text-sky-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                                    아직 주간기도문이 없습니다
                                </h3>
                                <p className="text-slate-600 text-center max-w-md">
                                    곧 새로운 기도문이 업데이트될 예정입니다.<br />
                                    함께 기도하며 하나님의 뜻을 구하는 시간을 기대해주세요.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ) : (
                    <>
                        {/* Latest Prayer */}
                        <div>
                            <WeeklyPrayerCard
                                title={latestPrayer.title}
                                weekStartDate={latestPrayer.weekStartDate}
                                weekEndDate={latestPrayer.weekEndDate}
                                communityConfession={latestPrayer.communityConfession}
                                dailyPrayers={latestPrayer.dailyPrayers}
                            />
                        </div>

                        {/* Archive */}
                        {archivePrayers.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg p-2">
                                        <Sparkles className="h-5 w-5 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900">
                                        지난 주간기도문
                                    </h2>
                                    <div className="flex-1 h-px bg-gradient-to-r from-slate-300 to-transparent" />
                                </div>

                                <div className="grid gap-4">
                                    {archivePrayers.map((prayer, index) => (
                                        <motion.div
                                            key={prayer._id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                                        >
                                            <Link href={`/life/prayer/${prayer.slug.current}`}>
                                                <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-slate-200 hover:border-sky-300 cursor-pointer overflow-hidden">
                                                    <CardHeader className="bg-gradient-to-r from-slate-50 to-sky-50 group-hover:from-sky-50 group-hover:to-blue-50 transition-all duration-300">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex-1">
                                                                <CardTitle className="text-lg group-hover:text-sky-700 transition-colors">
                                                                    {prayer.title}
                                                                </CardTitle>
                                                                <CardDescription className="flex items-center gap-2 mt-2">
                                                                    <Calendar className="h-3 w-3" />
                                                                    <span>
                                                                        {format(new Date(prayer.weekStartDate), 'yyyy.MM.dd', { locale: ko })} - {format(new Date(prayer.weekEndDate), 'MM.dd', { locale: ko })}
                                                                    </span>
                                                                </CardDescription>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <div className="text-xs text-slate-500 group-hover:text-sky-600 transition-colors">
                                                                    자세히 보기
                                                                </div>
                                                                <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" />
                                                            </div>
                                                        </div>
                                                    </CardHeader>
                                                </Card>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Statistics */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8, duration: 0.5 }}
                                    className="mt-8 text-center"
                                >
                                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-50 to-blue-50 border-2 border-sky-200 rounded-full px-6 py-3">
                                        <Sparkles className="h-4 w-4 text-sky-600" />
                                        <span className="text-sm text-slate-700">
                                            총 <strong className="text-sky-700">{archivePrayers.length + 1}주간</strong> 함께 기도했습니다
                                        </span>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </>
                )}
            </div>

            {/* Weekly Prayer Modal */}
            <WeeklyPrayerModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
            />
        </PageLayout>
    )
}
