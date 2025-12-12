'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
    Calendar,
    ArrowLeft,
    Share2,
    Download,
    FileText,
    BookOpen,
    User,
    ChevronLeft,
    ChevronRight,
    ZoomIn,
    ZoomOut,
    Printer,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { OptimizedImage } from '@/components/common/OptimizedImage'

// Mock Data (실제로는 Sanity API로 가져와야 함)
const BULLETINS = [
    {
        id: '1',
        title: '2024년 부활절 특별예배',
        date: '2024-03-31',
        volume: '제 450호',
        thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop',
        pdfUrl: '/bulletins/2024-03-31.pdf',
        sermonTitle: '부활의 소망을 품으라',
        preacher: '김목사',
        scripture: '고린도전서 15:12-20',
        weeklyVerse: '그리스도께서 죽은 자 가운데서 다시 살아나사 잠자는 자들의 첫 열매가 되셨도다 (고전 15:20)',
        announcements: [
            {
                title: '부활절 연합예배',
                content: '이번 주 주일은 부활절 연합예배로 드립니다. 모든 성도님들은 10시 30분까지 본당으로 모여주시기 바랍니다.',
                important: true,
            },
            {
                title: '4월 정기 제직회',
                content: '다음 주일 2부 예배 후 본당에서 4월 정기 제직회가 있습니다.',
                important: false,
            },
            {
                title: '새가족 환영',
                content: '이번 주 새가족을 환영합니다. 예배 후 로비에서 새가족 환영회가 있겠습니다.',
                important: false,
            },
        ],
        schedule: [
            { time: '09:00', event: '1부 예배', location: '본당' },
            { time: '11:00', event: '2부 예배 (연합예배)', location: '본당' },
            { time: '14:00', event: '유아세례식', location: '본당' },
            { time: '15:00', event: '청년부 모임', location: '청년실' },
        ],
        birthdays: ['김성도 (3/31)', '이믿음 (4/1)', '박은혜 (4/2)'],
        downloads: 523,
        views: 1456,
    },
]

export default function BulletinDetailPage() {
    const params = useParams()
    const router = useRouter()
    const id = params.id as string

    const [currentPage, setCurrentPage] = useState(1)
    const [zoomLevel, setZoomLevel] = useState(100)

    // 데이터 찾기
    const bulletin = BULLETINS.find((item) => item.id === id)

    if (!bulletin) {
        return (
            <PageLayout
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: '교회생활', href: '/life' },
                    { label: '주보', href: '/life/bulletin' },
                ]}
            >
                <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                    <h2 className="text-2xl font-bold">주보를 찾을 수 없습니다.</h2>
                    <Button onClick={() => router.back()}>돌아가기</Button>
                </div>
            </PageLayout>
        )
    }

    const totalPages = 4 // 주보 페이지 수

    return (
        <PageLayout
            sidebarMenu="life"
            breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: '교회생활', href: '/life' },
                { label: '주보', href: '/life/bulletin' },
                { label: bulletin.title, href: `/life/bulletin/${id}` },
            ]}
        >
            <article className="max-w-7xl mx-auto pb-20">
                {/* Header Section */}
                <div className="relative mb-12 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 p-8 md:p-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="flex flex-wrap items-center gap-3">
                                <Badge className="bg-sky-500 hover:bg-sky-600 border-none px-4 py-1 text-base">
                                    {bulletin.date}
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="border-white/30 text-white px-4 py-1 text-base"
                                >
                                    {bulletin.volume}
                                </Badge>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                                {bulletin.title}
                            </h1>

                            {/* 이번 주 설교 정보 */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-amber-500/20 rounded-lg">
                                        <FileText className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-300 mb-1">이번 주 설교</p>
                                        <h3 className="text-2xl font-bold text-white">
                                            {bulletin.sermonTitle}
                                        </h3>
                                        <p className="text-slate-200 mt-1">
                                            {bulletin.preacher} • {bulletin.scripture}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 다운로드 버튼 */}
                            <div className="flex flex-wrap gap-3 pt-4">
                                <Button className="bg-sky-600 hover:bg-sky-700 text-white gap-2 shadow-lg">
                                    <Download className="w-4 h-4" /> PDF 다운로드
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-white/30 text-white hover:bg-white/10 gap-2"
                                >
                                    <Printer className="w-4 h-4" /> 인쇄하기
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-white/30 text-white hover:bg-white/10 gap-2"
                                >
                                    <Share2 className="w-4 h-4" /> 공유하기
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 md:px-0">
                    {/* Main Content: PDF Viewer */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* PDF 뷰어 컨트롤 */}
                        <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>
                                <span className="text-sm font-medium px-4">
                                    {currentPage} / {totalPages}
                                </span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() =>
                                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                                    }
                                    disabled={currentPage === totalPages}
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}
                                >
                                    <ZoomOut className="w-4 h-4" />
                                </Button>
                                <span className="text-sm font-medium px-2">{zoomLevel}%</span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))}
                                >
                                    <ZoomIn className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {/* PDF 미리보기 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200"
                        >
                            <div className="aspect-[1/1.414] bg-slate-100 flex items-center justify-center">
                                <OptimizedImage
                                    src={bulletin.thumbnail}
                                    alt="주보 미리보기"
                                    fill
                                    className="object-contain"
                                    style={{
                                        transform: `scale(${zoomLevel / 100})`,
                                        transition: 'transform 0.3s ease',
                                    }}
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar: 공지사항 & 일정 */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* 이번 주 성경구절 */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-900/50">
                                <CardContent className="p-6">
                                    <h3 className="text-amber-900 dark:text-amber-300 font-bold mb-4 flex items-center gap-2">
                                        <BookOpen className="w-5 h-5" /> 이번 주 성경구절
                                    </h3>
                                    <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300 font-serif italic">
                                        {bulletin.weeklyVerse}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* 공지사항 */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                                        <FileText className="w-5 h-5 text-sky-600" /> 공지사항
                                    </h3>
                                    <div className="space-y-4">
                                        {bulletin.announcements.map((announcement, index) => (
                                            <div
                                                key={index}
                                                className={`pb-4 border-b last:border-b-0 last:pb-0 ${announcement.important ? 'border-amber-200 dark:border-amber-900/30' : 'border-slate-100 dark:border-slate-800'}`}
                                            >
                                                <div className="flex items-start gap-2 mb-1">
                                                    {announcement.important && (
                                                        <Badge className="bg-red-500 border-none text-xs">
                                                            중요
                                                        </Badge>
                                                    )}
                                                    <h4 className="font-bold text-slate-900 dark:text-white">
                                                        {announcement.title}
                                                    </h4>
                                                </div>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                                    {announcement.content}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* 이번 주 일정 */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                                        <Calendar className="w-5 h-5 text-purple-600" /> 이번 주 일정
                                    </h3>
                                    <div className="space-y-3">
                                        {bulletin.schedule.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-3 pb-3 border-b last:border-b-0 last:pb-0 border-slate-100 dark:border-slate-800"
                                            >
                                                <div className="flex-shrink-0 w-16 text-sm font-bold text-purple-600 dark:text-purple-400">
                                                    {item.time}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-slate-900 dark:text-white">
                                                        {item.event}
                                                    </p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                                        {item.location}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* 생일자 */}
                        {bulletin.birthdays && bulletin.birthdays.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Card className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border-pink-200 dark:border-pink-900/50">
                                    <CardContent className="p-6">
                                        <h3 className="text-pink-900 dark:text-pink-300 font-bold mb-4 flex items-center gap-2">
                                            🎂 이번 주 생일
                                        </h3>
                                        <div className="space-y-2">
                                            {bulletin.birthdays.map((birthday, index) => (
                                                <div
                                                    key={index}
                                                    className="text-slate-700 dark:text-slate-300 text-sm"
                                                >
                                                    • {birthday}
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}

                        {/* 통계 */}
                        <div className="flex items-center gap-4 text-sm text-slate-500 pt-4">
                            <div className="flex items-center gap-1">
                                <Download className="w-4 h-4" />
                                <span>{bulletin.downloads}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span>조회</span>
                                <span className="font-bold">{bulletin.views}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator className="my-12" />

                {/* Footer Actions */}
                <div className="flex items-center justify-between px-4 md:px-0">
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="gap-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                        <ArrowLeft className="w-4 h-4" /> 목록으로 돌아가기
                    </Button>
                </div>
            </article>
        </PageLayout>
    )
}
