'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, BookOpen, Download, Share2, Sparkles } from 'lucide-react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { useReactToPrint } from 'react-to-print'

interface DailyPrayer {
    date: string
    dayOfWeek: string
    theme: string
    prayerTopic1: string
    prayerTopic2: string
    prayerTopic3: string
}

interface WeeklyPrayerCardProps {
    title: string
    weekStartDate: string
    weekEndDate: string
    communityConfession: string
    dailyPrayers: DailyPrayer[]
    showActions?: boolean
}

const dayColors = [
    'from-purple-50 to-purple-100 border-purple-200', // 일
    'from-blue-50 to-blue-100 border-blue-200',       // 월
    'from-green-50 to-green-100 border-green-200',    // 화
    'from-orange-50 to-orange-100 border-orange-200', // 수
    'from-pink-50 to-pink-100 border-pink-200',       // 목
    'from-sky-50 to-sky-100 border-sky-200',          // 금
    'from-rose-50 to-rose-100 border-rose-200',       // 토
]

export function WeeklyPrayerCard({
    title,
    weekStartDate,
    weekEndDate,
    communityConfession,
    dailyPrayers,
    showActions = true,
}: WeeklyPrayerCardProps) {
    const contentRef = useRef<HTMLDivElement>(null)

    const handlePrint = useReactToPrint({
        contentRef,
        documentTitle: title,
    })

    const handleShare = async () => {
        const shareData = {
            title: title,
            text: `${title} - 부다페스트한인선교교회 주간기도문`,
            url: window.location.href,
        }

        try {
            // Web Share API 지원 확인
            if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
                await navigator.share(shareData)
            } else {
                // 폴백: 클립보드에 복사
                await navigator.clipboard.writeText(window.location.href)
                alert('✅ 링크가 클립보드에 복사되었습니다!\n\n원하는 곳에 붙여넣기(Ctrl+V) 하세요.')
            }
        } catch (error) {
            // 사용자가 공유 취소한 경우 무시
            if ((error as Error).name !== 'AbortError') {
                // 에러 발생 시 클립보드 복사로 폴백
                try {
                    await navigator.clipboard.writeText(window.location.href)
                    alert('✅ 링크가 클립보드에 복사되었습니다!')
                } catch (clipboardError) {
                    alert('❌ 공유 기능을 사용할 수 없습니다.\n\n링크: ' + window.location.href)
                }
            }
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card
                className="overflow-hidden border-2 border-sky-200 shadow-2xl backdrop-blur-sm bg-white/95"
                ref={contentRef}
            >
                {/* Header with Gradient */}
                <CardHeader className="relative bg-gradient-to-r from-slate-800 via-sky-900 to-blue-900 text-white print-header overflow-hidden">
                    {/* Decorative Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '30px 30px'
                        }} />
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-transparent rounded-bl-full" />

                    <div className="relative z-10 flex items-center justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-amber-500 rounded-lg p-2">
                                    <BookOpen className="h-5 w-5 text-white" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
                            </div>
                            <div className="flex items-center gap-2 text-sky-100">
                                <Calendar className="h-4 w-4" />
                                <span className="text-sm md:text-base">
                                    {format(new Date(weekStartDate), 'yyyy년 M월 d일', { locale: ko })} - {format(new Date(weekEndDate), 'M월 d일', { locale: ko })}
                                </span>
                            </div>
                        </div>

                        {showActions && (
                            <div className="flex gap-2 no-print">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={handlePrint}
                                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                                >
                                    <Download className="h-4 w-4 mr-2" />
                                    PDF
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={handleShare}
                                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                                >
                                    <Share2 className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="p-6 md:p-8 space-y-8">
                    {/* Community Confession - Parchment Style */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="relative bg-gradient-to-br from-amber-50 to-orange-50 p-6 md:p-8 rounded-xl border-2 border-amber-200 shadow-lg"
                    >
                        {/* Decorative Corners */}
                        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-amber-400 rounded-tl-xl" />
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-amber-400 rounded-br-xl" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg p-2">
                                    <Sparkles className="h-5 w-5 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800">공동체 고백</h3>
                            </div>
                            <p className="whitespace-pre-wrap leading-relaxed text-slate-700 text-base md:text-lg">
                                {communityConfession}
                            </p>
                        </div>
                    </motion.div>

                    {/* Daily Prayers - Card Format */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg p-2">
                                <Calendar className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">주간 기도 제목</h3>
                        </div>

                        <div className="grid gap-4">
                            {dailyPrayers.map((prayer, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                                    className={`relative bg-gradient-to-r ${dayColors[index]} border-2 rounded-xl p-5 md:p-6 hover:shadow-lg transition-all duration-300 group`}
                                >
                                    {/* Day Badge */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-white rounded-lg px-3 py-1.5 shadow-sm">
                                                <span className="font-bold text-slate-700">
                                                    {format(new Date(prayer.date), 'M/d', { locale: ko })}
                                                </span>
                                            </div>
                                            <div className="bg-white rounded-lg px-3 py-1.5 shadow-sm">
                                                <span className="text-sm font-semibold text-slate-600">
                                                    {prayer.dayOfWeek}요일
                                                </span>
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-full px-4 py-1.5 shadow-sm">
                                            <span className="text-sm font-bold text-sky-700">
                                                {prayer.theme}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Prayer Topics */}
                                    <div className="space-y-3">
                                        {prayer.prayerTopic1 && (
                                            <div className="flex gap-3">
                                                <div className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                                                    <span className="text-xs font-bold text-sky-600">1</span>
                                                </div>
                                                <p className="text-slate-700 leading-relaxed flex-1">
                                                    {prayer.prayerTopic1}
                                                </p>
                                            </div>
                                        )}
                                        {prayer.prayerTopic2 && (
                                            <div className="flex gap-3">
                                                <div className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                                                    <span className="text-xs font-bold text-sky-600">2</span>
                                                </div>
                                                <p className="text-slate-700 leading-relaxed flex-1">
                                                    {prayer.prayerTopic2}
                                                </p>
                                            </div>
                                        )}
                                        {prayer.prayerTopic3 && (
                                            <div className="flex gap-3">
                                                <div className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                                                    <span className="text-xs font-bold text-sky-600">3</span>
                                                </div>
                                                <p className="text-slate-700 leading-relaxed flex-1">
                                                    {prayer.prayerTopic3}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Hover Effect Indicator */}
                                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Footer - Only visible in print */}
                    <div className="hidden print:block text-center text-sm text-slate-500 mt-8 pt-4 border-t">
                        <p className="font-semibold">부다페스트한인선교교회 (BFGC)</p>
                        <p className="mt-1">함께 기도하며 하나님의 뜻을 구합니다</p>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
