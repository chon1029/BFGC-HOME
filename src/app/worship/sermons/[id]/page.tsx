'use client'

import { useParams, useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
    Calendar,
    BookOpen,
    ArrowLeft,
    Share2,
    Heart,
    MessageCircle,
    User,
    PlayCircle,
    Clock,
    Download,
    Volume2,
    FileText,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { OptimizedImage } from '@/components/common/OptimizedImage'

// Mock Data (실제로는 Sanity API로 가져와야 함)
const SERMONS = [
    {
        id: '1',
        title: '부활의 소망을 품으라',
        preacher: '김목사',
        date: '2024-03-31',
        scripture: '고린도전서 15:12-20',
        series: '부활절 시리즈',
        thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop',
        duration: '45:20',
        tags: ['부활절', '소망', '믿음'],
        videoUrl: 'https://example.com/sermon1.mp4',
        audioUrl: 'https://example.com/sermon1.mp3',
        pdfUrl: 'https://example.com/sermon1.pdf',
        outline: `1. 부활이 없다면 우리의 믿음은 헛된 것입니다
2. 그리스도께서 부활하셨기에 우리에게 소망이 있습니다
3. 부활의 능력으로 오늘을 살아갑시다`,
        summary: `부활절을 앞두고 우리는 예수 그리스도의 부활이 우리에게 어떤 의미인지 되새겨야 합니다. 사도 바울은 고린도전서 15장에서 부활의 중요성을 강조합니다. 만약 그리스도께서 부활하지 않으셨다면, 우리의 믿음은 헛되고 우리는 여전히 죄 가운데 있을 것입니다.

그러나 감사하게도 그리스도는 참으로 죽은 자 가운데서 살아나셨고, 잠자는 자들의 첫 열매가 되셨습니다. 이 놀라운 진리는 우리에게 영원한 생명의 소망을 줍니다. 우리도 언젠가 그리스도와 같이 부활할 것이며, 썩지 않을 몸으로 영광 중에 다시 살아날 것입니다.

부활의 소망은 단지 미래에 대한 희망만이 아닙니다. 이는 오늘 우리가 어떻게 살아야 하는지를 알려줍니다. 부활의 능력으로 말미암아 우리는 죄와 사망의 권세를 이기고, 새로운 삶을 살아갈 수 있습니다. 오늘도 부활의 주님과 함께 승리하는 하루가 되시기를 축복합니다.`,
        applicationPoints: [
            '부활 신앙을 굳건히 붙들고 흔들리지 않는 믿음의 삶을 살아갑시다.',
            '부활의 소망으로 현재의 어려움을 이겨내는 용기를 가집시다.',
            '부활의 증인으로서 복음을 담대히 전하는 삶을 살아갑시다.',
        ],
        prayer: `부활의 주님, 예수 그리스도의 부활을 통해 우리에게 영원한 생명의 소망을 주셔서 감사합니다. 때로는 세상의 어려움 앞에서 낙심하고 좌절할 때가 있지만, 부활의 능력을 믿고 날마다 새롭게 살아가게 하옵소서. 우리가 부활의 증인으로서 이 땅에서 빛과 소금의 역할을 감당하게 하시고, 언젠가 주님과 함께 영광스러운 부활에 참여하는 은혜를 허락하옵소서. 예수님의 이름으로 기도합니다. 아멘.`,
        views: 1234,
        likes: 89,
    },
]

export default function SermonDetailPage() {
    const params = useParams()
    const router = useRouter()
    const id = params.id as string

    // 데이터 찾기
    const sermon = SERMONS.find((item) => item.id === id)

    if (!sermon) {
        return (
            <PageLayout
                sidebarMenu="worship"
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: '예배•양육', href: '/worship' },
                    { label: '주일설교', href: '/worship/sermons' },
                ]}
            >
                <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                    <h2 className="text-2xl font-bold">설교를 찾을 수 없습니다.</h2>
                    <Button onClick={() => router.back()}>돌아가기</Button>
                </div>
            </PageLayout>
        )
    }

    return (
        <PageLayout
            sidebarMenu="worship"
            breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: '예배•양육', href: '/worship' },
                { label: '주일설교', href: '/worship/sermons' },
                { label: sermon.title, href: `/worship/sermons/${id}` },
            ]}
        >
            <article className="max-w-6xl mx-auto pb-20">
                {/* Video Section */}
                <div className="relative mb-12 rounded-3xl overflow-hidden shadow-2xl bg-slate-900">
                    <div className="relative aspect-video">
                        <OptimizedImage
                            src={sermon.thumbnail}
                            alt={sermon.title}
                            fill
                            className="object-cover opacity-50"
                        />
                        {/* 비디오 플레이어 오버레이 */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                            <motion.button
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-24 h-24 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center shadow-2xl shadow-red-900/50 transition-all group"
                            >
                                <PlayCircle className="w-12 h-12 text-white fill-white group-hover:scale-110 transition-transform" />
                            </motion.button>
                        </div>
                    </div>

                    {/* 설교 정보 오버레이 */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8 text-white">
                        <div className="flex items-center gap-2 mb-3">
                            <Badge className="bg-sky-500 hover:bg-sky-600 border-none">
                                {sermon.series}
                            </Badge>
                            <Badge variant="outline" className="border-white/30 text-white">
                                <Clock className="w-3 h-3 mr-1" /> {sermon.duration}
                            </Badge>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                            {sermon.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-white/90">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                {sermon.preacher}
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {sermon.date}
                            </div>
                            <div className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-amber-400" />
                                {sermon.scripture}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 다운로드 & 공유 버튼 */}
                <div className="flex flex-wrap items-center gap-3 mb-12 px-4 md:px-0">
                    <Button className="bg-red-600 hover:bg-red-700 text-white gap-2">
                        <Volume2 className="w-4 h-4" /> 오디오 듣기
                    </Button>
                    <Button variant="outline" className="gap-2">
                        <Download className="w-4 h-4" /> MP3 다운로드
                    </Button>
                    <Button variant="outline" className="gap-2">
                        <FileText className="w-4 h-4" /> 설교 원고
                    </Button>
                    <div className="ml-auto flex gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors"
                        >
                            <Heart className="w-5 h-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full hover:text-sky-500 hover:border-sky-200 hover:bg-sky-50 transition-colors"
                        >
                            <Share2 className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {/* Content Body */}
                <div className="space-y-12 px-4 md:px-0">
                    {/* 1. 설교 개요 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="relative p-8 bg-sky-50 dark:bg-sky-900/20 rounded-2xl border-l-4 border-sky-500">
                            <h3 className="text-sky-800 dark:text-sky-400 font-bold mb-4 flex items-center gap-2 text-xl">
                                <FileText className="w-6 h-6" /> 설교 개요
                            </h3>
                            <pre className="text-lg text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                                {sermon.outline}
                            </pre>
                        </div>
                    </motion.div>

                    {/* 2. 설교 요약 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="prose prose-lg dark:prose-invert max-w-none"
                    >
                        <h3 className="flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white border-b pb-2 mb-6 border-slate-200 dark:border-slate-800">
                            <MessageCircle className="w-6 h-6 text-sky-600" />
                            설교 말씀
                        </h3>
                        <div className="text-slate-700 dark:text-slate-300 leading-loose whitespace-pre-line text-lg">
                            {sermon.summary}
                        </div>
                    </motion.div>

                    {/* 3. 적용 포인트 */}
                    {sermon.applicationPoints && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-amber-50 dark:bg-amber-900/20 p-8 rounded-2xl border border-amber-100 dark:border-amber-900/30"
                        >
                            <h3 className="text-xl font-bold text-amber-900 dark:text-amber-300 mb-6 flex items-center gap-2">
                                💡 삶에 적용하기
                            </h3>
                            <ul className="space-y-4">
                                {sermon.applicationPoints.map((point, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-3 text-lg text-slate-700 dark:text-slate-300"
                                    >
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold">
                                            {index + 1}
                                        </span>
                                        <span className="leading-relaxed">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}

                    {/* 4. 함께 기도해요 */}
                    {sermon.prayer && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Card className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border-violet-100 dark:border-violet-900/50 shadow-sm">
                                <CardContent className="p-8">
                                    <h3 className="text-xl font-bold mb-6 text-violet-800 dark:text-violet-300 flex items-center gap-2">
                                        🙏 함께 기도해요
                                    </h3>
                                    <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 font-serif">
                                        {sermon.prayer}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* 태그 */}
                    <div className="flex flex-wrap items-center gap-2 pt-4">
                        <span className="text-sm text-slate-500 font-medium">관련 태그:</span>
                        {sermon.tags.map((tag) => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 cursor-pointer"
                            >
                                #{tag}
                            </Badge>
                        ))}
                    </div>

                    <Separator className="my-8" />

                    {/* 통계 */}
                    <div className="flex items-center gap-6 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                            <span>조회수</span>
                            <span className="font-bold text-slate-900 dark:text-white">
                                {sermon.views.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Heart className="w-4 h-4" />
                            <span className="font-bold text-slate-900 dark:text-white">
                                {sermon.likes}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
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
