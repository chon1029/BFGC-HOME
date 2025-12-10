'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import { MessageCircle, Target, UserPlus, Clock, MapPin, ArrowRight } from 'lucide-react'
import { OptimizedImage } from '@/components/common/OptimizedImage'

// ----------------------------------------------------------------------
// Data
// ----------------------------------------------------------------------

const GUIDES = [
    {
        title: '인사말씀',
        description: '담임목사님의 따뜻한 환영 인사와 목회 철학을 나눕니다.',
        icon: MessageCircle,
        href: '/guide/greeting',
        color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
        image: 'https://images.unsplash.com/photo-1505243592566-d5888237616e?q=80&w=1000&auto=format&fit=crop',
    },
    {
        title: '교회비전',
        description: '하나님이 기뻐하시는 교회가 되기 위한 우리의 사명과 핵심 가치입니다.',
        icon: Target,
        href: '/guide/vision',
        color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
        image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1000&auto=format&fit=crop',
    },
    {
        title: '새가족 등록안내',
        description: 'BFGC의 가족이 되신 것을 환영합니다. 등록 절차를 안내해 드립니다.',
        icon: UserPlus,
        href: '/guide/newcomer',
        color: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
        image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000&auto=format&fit=crop',
    },
    {
        title: '예배시간 안내',
        description: '주일예배, 수요예배, 새벽기도회 등 모든 예배 시간을 확인하세요.',
        icon: Clock,
        href: '/guide/schedule',
        color: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
        image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1000&auto=format&fit=crop',
    },
    {
        title: '교회 오시는 길',
        description: '부다페스트 한인선교교회로 오시는 길과 교통편을 안내합니다.',
        icon: MapPin,
        href: '/guide/location',
        color: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
        image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1000&auto=format&fit=crop',
    },
]

// ----------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------

export default function GuidePage() {
    return (
        <PageLayout
            sidebarMenu="guide"
            breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: '교회안내', href: '/guide' },
            ]}
        >
            <div className="space-y-12">

                {/* 1. Hero Section */}
                <section className="relative rounded-3xl overflow-hidden h-[300px] md:h-[400px] shadow-2xl">
                    <OptimizedImage
                        src="https://images.unsplash.com/photo-1548625361-188865d4c887?q=80&w=1000&auto=format&fit=crop" // Budapest Parliament or City View
                        alt="Budapest View"
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
                            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                환영합니다,<br />
                                <span className="text-sky-400">부다페스트 한인선교교회</span>입니다.
                            </h1>
                            <p className="text-lg text-slate-200 leading-relaxed">
                                하나님의 사랑이 머무는 곳, 성령의 감동이 있는 예배.<br />
                                이곳에서 당신의 영혼이 쉼을 얻고 회복되기를 소망합니다.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* 2. Navigation Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {GUIDES.map((guide, index) => (
                        <Link key={index} href={guide.href} className="group">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ delay: index * 0.1 }}
                                className="h-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                            >
                                {/* Image Area */}
                                <div className="relative h-48 overflow-hidden">
                                    <OptimizedImage
                                        src={guide.image}
                                        alt={guide.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                                    <div className={`absolute bottom-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-md bg-white/90 dark:bg-slate-900/90 shadow-lg ${guide.color}`}>
                                        <guide.icon className="w-6 h-6" />
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-sky-600 transition-colors">
                                        {guide.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 flex-1">
                                        {guide.description}
                                    </p>
                                    <div className="flex items-center text-sm font-medium text-sky-600 dark:text-sky-400 group-hover:translate-x-1 transition-transform">
                                        자세히 보기 <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </section>

            </div>
        </PageLayout>
    )
}
