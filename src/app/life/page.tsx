'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import { Newspaper, Camera, Heart, ArrowRight, Calendar } from 'lucide-react'
import { OptimizedImage } from '@/components/common/OptimizedImage'
import { Button } from '@/components/ui/button'

// ----------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------

export default function LifePage() {
    return (
        <PageLayout
            sidebarMenu="life"
            breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: '교회생활', href: '/life' },
            ]}
        >
            <div className="space-y-16">

                {/* 1. Hero Section */}
                <section className="relative rounded-3xl overflow-hidden h-[300px] md:h-[350px] shadow-2xl">
                    <OptimizedImage
                        src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000&auto=format&fit=crop" // Community gathering
                        alt="Life Hero"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />

                    <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.6 }}
                            className="max-w-2xl space-y-4"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm">
                                <Heart className="w-4 h-4 text-pink-400 fill-pink-400" /> Community Life
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                함께 웃고, 함께 우는<br />
                                <span className="text-pink-400">믿음의 가족</span>
                            </h1>
                            <p className="text-lg text-slate-200 leading-relaxed">
                                부다페스트 한인선교교회의 풍성한 교제와 나눔.<br />
                                우리의 일상이 하나님께 드리는 예배가 됩니다.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* 2. Bento Grid Layout */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Bulletin Card (Large) */}
                    <Link href="/life/bulletin" className="group md:col-span-2 lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            className="relative h-full min-h-[300px] bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row"
                        >
                            <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
                                <OptimizedImage
                                    src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop" // Bulletin mock
                                    alt="Bulletin"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r" />
                                <div className="absolute bottom-6 left-6 text-white">
                                    <div className="flex items-center gap-2 text-sm font-medium mb-1 opacity-90">
                                        <Calendar className="w-4 h-4" /> 이번 주 소식
                                    </div>
                                    <h3 className="text-2xl font-bold">주보 보기</h3>
                                </div>
                            </div>
                            <div className="p-8 flex flex-col justify-center w-full md:w-1/2">
                                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 text-slate-600 dark:text-slate-400">
                                    <Newspaper className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">교회 소식과 예배 안내</h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-6 flex-1">
                                    이번 주 예배 순서와 교회 광고, 그리고 성도들의 소식을 확인하세요.
                                </p>
                                <div className="flex items-center text-slate-900 dark:text-white font-bold group-hover:gap-2 transition-all">
                                    주보 확인하기 <ArrowRight className="w-4 h-4 ml-1" />
                                </div>
                            </div>
                        </motion.div>
                    </Link>

                    {/* Prayer Card */}
                    <Link href="/life/prayer" className="group">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: 0.1 }}
                            className="h-full bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl p-8 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6">
                                <Heart className="w-6 h-6 text-white fill-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">주간 기도문</h3>
                            <p className="text-violet-100 mb-6 flex-1">
                                "너는 내게 부르짖으라 내가 네게 응답하겠고..."<br />
                                함께 마음을 모아 기도합시다.
                            </p>
                            <div className="flex items-center font-bold group-hover:gap-2 transition-all">
                                기도하러 가기 <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                        </motion.div>
                    </Link>

                    {/* Gallery Card (Wide) */}
                    <Link href="/life/gallery" className="group md:col-span-2 lg:col-span-3">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: 0.2 }}
                            className="relative h-[250px] bg-slate-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                        >
                            <OptimizedImage
                                src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000&auto=format&fit=crop" // Gallery collage background
                                alt="Gallery"
                                fill
                                className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                                <div className="flex items-end justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 text-sky-400 font-bold mb-2">
                                            <Camera className="w-5 h-5" /> Photo Gallery
                                        </div>
                                        <h3 className="text-3xl font-bold text-white mb-2">아름다운 믿음의 순간들</h3>
                                        <p className="text-slate-300 max-w-xl">
                                            예배의 감격, 교제의 기쁨, 섬김의 현장을 사진으로 만나보세요.
                                        </p>
                                    </div>
                                    <div className="hidden md:flex w-12 h-12 rounded-full bg-white/20 backdrop-blur-md items-center justify-center text-white group-hover:bg-white group-hover:text-slate-900 transition-all">
                                        <ArrowRight className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </Link>

                </section>

            </div>
        </PageLayout>
    )
}
