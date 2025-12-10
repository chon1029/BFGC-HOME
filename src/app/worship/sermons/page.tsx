'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import PageLayout from '@/components/layout/PageLayout'
import { Search, Filter, PlayCircle, Calendar, User, Clock, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { OptimizedImage } from '@/components/common/OptimizedImage'
import { Badge } from '@/components/ui/badge'
import { SermonUploadModal } from '@/components/sections/worship/SermonUploadModal'

// ----------------------------------------------------------------------
// Mock Data (나중에 Sanity 연동)
// ----------------------------------------------------------------------

const SERMONS = [
    {
        id: 1,
        title: '부활의 소망을 품으라',
        preacher: '김목사',
        date: '2024-03-31',
        scripture: '고린도전서 15:12-20',
        series: '부활절 시리즈',
        thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop',
        duration: '45:20',
        tags: ['부활절', '소망', '믿음'],
    },
    {
        id: 2,
        title: '고난 주간의 묵상',
        preacher: '김목사',
        date: '2024-03-24',
        scripture: '마가복음 14:32-42',
        series: '고난주간',
        thumbnail: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1000&auto=format&fit=crop',
        duration: '50:15',
        tags: ['고난', '기도', '순종'],
    },
    {
        id: 3,
        title: '제자의 길',
        preacher: '이전도사',
        date: '2024-03-17',
        scripture: '마태복음 16:24',
        series: '제자도',
        thumbnail: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1000&auto=format&fit=crop',
        duration: '42:10',
        tags: ['제자', '십자가'],
    },
    {
        id: 4,
        title: '믿음의 경주',
        preacher: '김목사',
        date: '2024-03-10',
        scripture: '히브리서 12:1-2',
        series: '믿음 시리즈',
        thumbnail: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=1000&auto=format&fit=crop',
        duration: '48:30',
        tags: ['믿음', '인내'],
    },
]

// ----------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------

export default function SermonsPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedSeries, setSelectedSeries] = useState('all')

    return (
        <PageLayout
            sidebarMenu="worship"
            breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: '예배•양육', href: '/worship' },
                { label: '주일설교', href: '/worship/sermons' },
            ]}
        >
            <div className="space-y-8">

                {/* 1. Header & Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">주일설교</h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            하나님의 말씀으로 한 주를 살아가는 힘을 얻으세요.
                        </p>
                    </div>

                    {/* Admin Action: Upload Modal */}
                    <SermonUploadModal />
                </div>

                {/* 2. Search & Filter */}
                <div className="flex flex-col md:flex-row gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="설교 제목, 본문, 설교자 검색..."
                            className="pl-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-48">
                        <Select value={selectedSeries} onValueChange={setSelectedSeries}>
                            <SelectTrigger className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                    <Filter className="w-4 h-4" />
                                    <SelectValue placeholder="시리즈 선택" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">모든 시리즈</SelectItem>
                                <SelectItem value="부활절 시리즈">부활절 시리즈</SelectItem>
                                <SelectItem value="고난주간">고난주간</SelectItem>
                                <SelectItem value="제자도">제자도</SelectItem>
                                <SelectItem value="믿음 시리즈">믿음 시리즈</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* 3. Sermon Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SERMONS.map((sermon, index) => (
                        <motion.div
                            key={sermon.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
                        >
                            {/* Thumbnail */}
                            <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                                <OptimizedImage
                                    src={sermon.thumbnail}
                                    alt={sermon.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                                        <PlayCircle className="w-6 h-6 text-red-600 fill-red-600" />
                                    </div>
                                </div>
                                <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-xs font-medium flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {sermon.duration}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                                    <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                                        <Calendar className="w-3 h-3" /> {sermon.date}
                                    </span>
                                    <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                                        <User className="w-3 h-3" /> {sermon.preacher}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-1 group-hover:text-sky-600 transition-colors">
                                    {sermon.title}
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                    {sermon.scripture}
                                </p>

                                <div className="mt-auto flex items-center justify-between">
                                    <div className="flex gap-1 flex-wrap">
                                        {sermon.tags.map(tag => (
                                            <Badge key={tag} variant="secondary" className="text-xs font-normal bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200">
                                                #{tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* 4. Pagination (Simple) */}
                <div className="flex justify-center pt-8">
                    <Button variant="outline" className="mx-1">이전</Button>
                    <Button variant="default" className="mx-1 bg-sky-600 hover:bg-sky-700">1</Button>
                    <Button variant="outline" className="mx-1">2</Button>
                    <Button variant="outline" className="mx-1">3</Button>
                    <Button variant="outline" className="mx-1">다음</Button>
                </div>

            </div>
        </PageLayout>
    )
}
