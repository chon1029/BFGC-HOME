'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import PageLayout from '@/components/layout/PageLayout'
import { Calendar, BookOpen, ChevronRight, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DailyBreadUploadModal } from '@/components/sections/worship/DailyBreadUploadModal'

// ----------------------------------------------------------------------
// Mock Data
// ----------------------------------------------------------------------

const DAILY_BREADS = [
    {
        id: 1,
        date: '2024-04-01',
        title: '새로운 시작을 위한 기도',
        scripture: '창세기 1:1-5',
        summary: '태초에 하나님이 천지를 창조하시니라. 혼돈과 공허 속에서 빛을 만드신 하나님의 창조 사역을 묵상합니다.',
    },
    {
        id: 2,
        date: '2024-03-31',
        title: '부활의 아침에',
        scripture: '마태복음 28:1-10',
        summary: '안식일이 다 지나고 안식 후 첫날이 되려는 새벽에 막달라 마리아와 다른 마리아가 무덤을 보려고 갔더니...',
    },
    {
        id: 3,
        date: '2024-03-30',
        title: '침묵의 시간',
        scripture: '마태복음 27:57-66',
        summary: '예수님의 무덤 앞에서 우리는 무엇을 기다려야 할까요? 하나님의 때를 기다리는 믿음에 대하여.',
    },
]

// ----------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------

export default function DailyBreadPage() {
    return (
        <PageLayout
            sidebarMenu="worship"
            breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: '예배•양육', href: '/worship' },
                { label: '일용할 양식', href: '/worship/daily-bread' },
            ]}
        >
            <div className="space-y-8">

                {/* 1. Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">일용할 양식</h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            매일 아침, 말씀으로 하루를 여는 거룩한 습관.
                        </p>
                    </div>

                    {/* Admin Action: Upload Modal */}
                    <DailyBreadUploadModal />
                </div>

                {/* 2. Featured (Today) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 text-amber-100 font-medium mb-4">
                            <Calendar className="w-5 h-5" /> 2024년 4월 2일 (화)
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                            하나님의 형상대로
                        </h2>
                        <div className="flex items-center gap-2 text-lg text-amber-100 mb-8">
                            <BookOpen className="w-5 h-5" /> 창세기 1:26-31
                        </div>
                        <p className="text-lg text-amber-50 leading-relaxed max-w-3xl mb-8">
                            하나님이 자기 형상 곧 하나님의 형상대로 사람을 창조하시되 남자와 여자를 창조하시고...
                            우리는 하나님의 걸작품입니다. 오늘 하루도 존귀한 자녀로서의 정체성을 기억합시다.
                        </p>
                        <Button className="bg-white text-amber-600 hover:bg-amber-50 font-bold px-8 h-12 rounded-xl border-0">
                            오늘의 묵상 보기
                        </Button>
                    </div>
                </motion.div>

                {/* 3. List */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Calendar className="w-5 h-5" /> 지난 묵상
                    </h3>
                    <div className="grid gap-4">
                        {DAILY_BREADS.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="hover:shadow-md transition-shadow cursor-pointer border-slate-200 dark:border-slate-800">
                                    <CardContent className="p-6 flex flex-col md:flex-row md:items-center gap-6">
                                        <div className="flex-shrink-0 w-full md:w-32 text-center md:text-left">
                                            <div className="text-sm text-slate-500 font-medium mb-1">{item.date.split('-')[0]}</div>
                                            <div className="text-2xl font-bold text-slate-900 dark:text-white">
                                                {item.date.split('-')[1]}.{item.date.split('-')[2]}
                                            </div>
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                                                    {item.scripture}
                                                </Badge>
                                            </div>
                                            <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                                                {item.title}
                                            </h4>
                                            <p className="text-slate-600 dark:text-slate-400 line-clamp-1">
                                                {item.summary}
                                            </p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-amber-600">
                                                <ChevronRight className="w-6 h-6" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </PageLayout>
    )
}
