'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import { Book, Coffee, GraduationCap, PlayCircle, ArrowRight, Calendar } from 'lucide-react'
import { OptimizedImage } from '@/components/common/OptimizedImage'
import { Button } from '@/components/ui/button'

// ----------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------

export default function WorshipPage() {
    return (
        <PageLayout
            sidebarMenu="worship"
            breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: '예배•양육', href: '/worship' },
            ]}
        >
            <div className="space-y-16">

                {/* 1. Hero Section */}
                <section className="relative rounded-3xl overflow-hidden h-[300px] md:h-[350px] shadow-2xl bg-slate-900">
                    <OptimizedImage
                        src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1000&auto=format&fit=crop" // Bible or Worship
                        alt="Worship Hero"
                        fill
                        className="object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.6 }}
                            className="max-w-2xl space-y-4"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm">
                                <Book className="w-4 h-4" /> Worship & Discipleship
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                말씀으로 새로워지는 삶
                            </h1>
                            <p className="text-lg text-slate-300">
                                예배를 통해 하나님을 만나고, 양육을 통해 예수님의 제자로 성장합니다.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* 2. Featured Sermon (Latest) */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <PlayCircle className="w-6 h-6 text-red-600" />
                            최신 주일 설교
                        </h2>
                        <Link href="/worship/sermons" className="text-sm text-slate-500 hover:text-sky-600 flex items-center gap-1">
                            설교 전체보기 <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        className="group relative rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-800"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* Thumbnail Area */}
                            <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                                <OptimizedImage
                                    src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop" // Mock Thumbnail
                                    alt="Latest Sermon"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        <PlayCircle className="w-8 h-8 text-red-600 fill-red-600" />
                                    </div>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-8 flex flex-col justify-center space-y-6">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <Calendar className="w-4 h-4" /> 2024.03.31
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                                        부활의 소망을 품으라
                                    </h3>
                                    <p className="text-lg text-slate-600 dark:text-slate-400">
                                        고린도전서 15:12-20
                                    </p>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                                    예수 그리스도의 부활은 우리 믿음의 핵심입니다. 죽음을 이기시고 다시 사신 주님을 찬양하며, 우리 또한 부활의 소망을 가지고 이 땅을 살아가야 합니다.
                                </p>
                                <div className="pt-4">
                                    <Link href="/worship/sermons">
                                        <Button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100">
                                            설교 보러가기
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* 3. Quick Links Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Daily Bread */}
                    <Link href="/worship/daily-bread" className="group">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            whileHover={{ y: -5 }}
                            className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-8 border border-amber-100 dark:border-amber-800/50 h-full flex flex-col"
                        >
                            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-800/50 flex items-center justify-center mb-6 text-amber-600 dark:text-amber-400">
                                <Coffee className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">일용할 양식</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-6 flex-1">
                                매일 아침, 말씀 묵상으로 하루를 시작하세요. 생명의 양식이 당신을 기다립니다.
                            </p>
                            <div className="flex items-center text-amber-700 dark:text-amber-400 font-medium group-hover:translate-x-1 transition-transform">
                                오늘의 묵상 보기 <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                        </motion.div>
                    </Link>

                    {/* Discipleship */}
                    <Link href="/worship/discipleship" className="group">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            whileHover={{ y: -5 }}
                            className="bg-sky-50 dark:bg-sky-900/20 rounded-2xl p-8 border border-sky-100 dark:border-sky-800/50 h-full flex flex-col"
                        >
                            <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-800/50 flex items-center justify-center mb-6 text-sky-600 dark:text-sky-400">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">제자훈련</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-6 flex-1">
                                체계적인 성경 공부와 훈련을 통해 예수님의 참된 제자로 성장하는 과정입니다.
                            </p>
                            <div className="flex items-center text-sky-700 dark:text-sky-400 font-medium group-hover:translate-x-1 transition-transform">
                                훈련 과정 안내 <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                        </motion.div>
                    </Link>
                </section>

            </div>
        </PageLayout>
    )
}
