'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import { Crown, School, Users, ArrowRight, Star } from 'lucide-react'
import { OptimizedImage } from '@/components/common/OptimizedImage'

// ----------------------------------------------------------------------
// Data
// ----------------------------------------------------------------------

const DEPARTMENTS = [
    {
        id: 'kings-kids',
        name: '킹스키즈',
        subName: "King's Kids",
        target: '유치·초등부',
        description: '예수님을 닮아가는 어린이들의 행복한 믿음 놀이터',
        icon: Crown,
        href: '/next-generation/kings-kids',
        color: 'bg-yellow-500',
        bgGradient: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
        textColor: 'text-yellow-600 dark:text-yellow-400',
        image: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=1000&auto=format&fit=crop',
    },
    {
        id: 'sam-school',
        name: '샘스쿨',
        subName: 'Sam School',
        target: '중·고등부',
        description: '세상의 빛이 되는 청소년, 꿈을 향해 나아가는 공동체',
        icon: School,
        href: '/next-generation/sam-school',
        color: 'bg-teal-500',
        bgGradient: 'from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20',
        textColor: 'text-teal-600 dark:text-teal-400',
        image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000&auto=format&fit=crop',
    },
    {
        id: 'joshua',
        name: '여호수아',
        subName: 'Joshua',
        target: '청년부',
        description: '강하고 담대하라! 세상을 이기는 믿음의 청년 세대',
        icon: Users,
        href: '/next-generation/joshua',
        color: 'bg-blue-600',
        bgGradient: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20',
        textColor: 'text-blue-600 dark:text-blue-400',
        image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000&auto=format&fit=crop',
    },
]

// ----------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------

export default function NextGenerationPage() {
    return (
        <PageLayout
            sidebarMenu="next-generation"
            breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: '다음세대', href: '/next-generation' },
            ]}
        >
            <div className="space-y-16">

                {/* 1. Hero Section */}
                <section className="relative rounded-3xl overflow-hidden h-[300px] md:h-[400px] shadow-2xl">
                    <OptimizedImage
                        src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop" // Kids running or happy youth
                        alt="Next Generation Hero"
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
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> Next Generation
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                꿈꾸는 다음세대,<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                                    교회의 미래
                                </span>입니다.
                            </h1>
                            <p className="text-lg text-slate-200 leading-relaxed">
                                말씀으로 양육받고 기도로 자라나는 우리 아이들.<br />
                                하나님의 사랑 안에서 세상을 변화시키는 리더로 성장합니다.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* 2. Department Cards */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {DEPARTMENTS.map((dept, index) => (
                        <Link key={dept.id} href={dept.href} className="group h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ delay: index * 0.1 }}
                                className={`h-full rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col bg-gradient-to-br ${dept.bgGradient}`}
                            >
                                {/* Image Area */}
                                <div className="relative h-56 overflow-hidden">
                                    <OptimizedImage
                                        src={dept.image}
                                        alt={dept.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white ${dept.color} shadow-lg`}>
                                        {dept.target}
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-8 flex-1 flex flex-col items-center text-center space-y-4">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center -mt-16 relative z-10 bg-white dark:bg-slate-800 shadow-xl ${dept.textColor}`}>
                                        <dept.icon className="w-8 h-8" />
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{dept.name}</h3>
                                        <p className={`text-sm font-medium ${dept.textColor}`}>{dept.subName}</p>
                                    </div>

                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                                        {dept.description}
                                    </p>

                                    <div className={`flex items-center gap-2 font-bold ${dept.textColor} group-hover:gap-3 transition-all`}>
                                        부서 바로가기 <ArrowRight className="w-4 h-4" />
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
