'use client'

import { useParams, useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calendar, BookOpen, ArrowLeft, Share2, Heart, MessageCircle, User } from 'lucide-react'
import { motion } from 'framer-motion'

// Mock Data (실제로는 API로 가져와야 함)
const DAILY_BREADS = [
    {
        id: '1',
        date: '2024-04-02',
        title: '하나님의 형상대로',
        book: '창세기',
        chapterVerse: '1:26-31',
        keyVerse: '하나님이 자기 형상 곧 하나님의 형상대로 사람을 창조하시되 남자와 여자를 창조하시고',
        content: `하나님이 이르시되 우리의 형상을 따라 우리의 모양대로 우리가 사람을 만들고 그들로 바다의 물고기와 하늘의 새와 가축과 온 땅과 땅에 기는 모든 것을 다스리게 하자 하시고 하나님이 자기 형상 곧 하나님의 형상대로 사람을 창조하시되 남자와 여자를 창조하시고 하나님이 그들에게 복을 주시며 하나님이 그들에게 이르시되 생육하고 번성하여 땅에 충만하라, 땅을 정복하라, 바다의 물고기와 하늘의 새와 땅에 움직이는 모든 생물을 다스리라 하시니라.`,
        suggestion: `우리의 가치는 우리가 무엇을 소유했거나 성취했느냐에 달려있지 않습니다. 우리의 존재 자체가 하나님의 걸작품이기 때문입니다. 오늘 하루, 나 자신을 바라볼 때 세상의 기준이 아닌 하나님의 시선으로 바라보기를 소망합니다.`,
        prayer: `사랑의 하나님, 저를 하나님의 형상대로 존귀하게 지어주셔서 감사합니다. 때로는 세상의 기준에 흔들려 제 가치를 잊어버릴 때가 있습니다. 오늘 하루, 제가 하나님의 자녀라는 정체성을 굳게 붙들고 살아가게 하옵소서. 예수님의 이름으로 기도합니다. 아멘.`,
        author: '관리자'
    },
    // ... 다른 데이터들도 필요하다면 추가
]

export default function DailyBreadDetailPage() {
    const params = useParams()
    const router = useRouter()
    const id = params.id as string

    // 데이터 찾기
    const bread = DAILY_BREADS.find(item => item.id === id)

    if (!bread) {
        return (
            <PageLayout>
                <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                    <h2 className="text-2xl font-bold">묵상을 찾을 수 없습니다.</h2>
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
                { label: '일용할 양식', href: '/worship/daily-bread' },
                { label: bread.title, href: `/worship/daily-bread/${id}` },
            ]}
        >
            <article className="max-w-4xl mx-auto pb-20">

                {/* Header Section */}
                <div className="relative mb-12 rounded-3xl overflow-hidden shadow-xl bg-slate-900 text-white">
                    <div className="absolute inset-0 bg-[url('/images/daily-bread/prayer-hands.jpg')] bg-cover bg-center opacity-40" />
                    <div className="relative z-10 p-8 md:p-16 text-center space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center gap-4"
                        >
                            <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-none px-4 py-1 text-base">
                                {bread.date}
                            </Badge>
                            <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight drop-shadow-lg">
                                {bread.title}
                            </h1>
                            <div className="flex items-center gap-2 text-lg md:text-xl text-gray-200 font-medium">
                                <BookOpen className="w-5 h-5 text-amber-400" />
                                {bread.book} {bread.chapterVerse}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Content Body */}
                <div className="space-y-12 px-4 md:px-0">

                    {/* 1. 요절 (Key Verse) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="relative p-8 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border-l-4 border-amber-500">
                            <h3 className="text-amber-800 dark:text-amber-400 font-bold mb-4 flex items-center gap-2">
                                <span className="text-2xl">❝</span> 요절 말씀
                            </h3>
                            <p className="text-xl md:text-2xl font-serif text-slate-800 dark:text-slate-200 leading-relaxed italic">
                                {bread.keyVerse}
                            </p>
                        </div>
                    </motion.div>

                    {/* 2. 본문 해설 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="prose prose-lg dark:prose-invert max-w-none"
                    >
                        <h3 className="flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white border-b pb-2 mb-6 border-slate-200 dark:border-slate-800">
                            <MessageCircle className="w-6 h-6 text-sky-600" />
                            본문 해설
                        </h3>
                        <div className="text-slate-700 dark:text-slate-300 leading-loose whitespace-pre-line">
                            {bread.content}
                        </div>
                    </motion.div>

                    {/* 3. 묵상을 위한 제언 */}
                    {bread.suggestion && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-700"
                        >
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                💡 묵상을 위한 제언
                            </h3>
                            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                                {bread.suggestion}
                            </p>
                        </motion.div>
                    )}

                    {/* 4. 함께 기도해요 */}
                    {bread.prayer && (
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
                                        {bread.prayer}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* 작성자 정보 */}
                    <div className="flex items-center justify-end text-sm text-slate-500 gap-2 pt-4">
                        <User className="w-4 h-4" />
                        작성자: {bread.author}
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                    <Button variant="ghost" onClick={() => router.back()} className="gap-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                        <ArrowLeft className="w-4 h-4" /> 목록으로 돌아가기
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="rounded-full hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors">
                            <Heart className="w-5 h-5" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full hover:text-sky-500 hover:border-sky-200 hover:bg-sky-50 transition-colors">
                            <Share2 className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

            </article>
        </PageLayout>
    )
}
