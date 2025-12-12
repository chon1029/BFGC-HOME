'use client'

import { motion } from 'framer-motion'
import PageLayout from '@/components/layout/PageLayout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { School, BookOpen, Music, Globe, Users, Clock, MapPin, Sparkles, Target, Heart } from 'lucide-react'
import { OptimizedImage } from '@/components/common/OptimizedImage'

// ----------------------------------------------------------------------
// Mock Data
// ----------------------------------------------------------------------

const STAFF = [
    {
        name: '최열정 전도사',
        role: '담당 교역자',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop',
        message: '너희는 세상의 빛이라! 빛을 발하는 세대가 되자.',
    },
    {
        name: '강믿음 부장',
        role: '부장 교사',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
        message: '청소년 시기, 가장 귀한 친구 예수님을 만나길 기도합니다.',
    },
    {
        name: '윤지혜 선생님',
        role: '교사',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
        message: '너희들의 꿈을 언제나 응원해!',
    },
]

const CORE_VALUES = [
    {
        title: 'Worship',
        subtitle: '뜨거운 예배자',
        description: '하나님을 인격적으로 만나고 전심으로 예배합니다.',
        icon: Music,
        color: 'bg-indigo-100 text-indigo-600',
    },
    {
        title: 'Word',
        subtitle: '말씀의 사람',
        description: '매일 성경을 묵상하며 하나님의 뜻을 깨닫습니다.',
        icon: BookOpen,
        color: 'bg-teal-100 text-teal-600',
    },
    {
        title: 'Witness',
        subtitle: '세상의 증인',
        description: '학교와 가정에서 그리스도의 향기를 전합니다.',
        icon: Globe,
        color: 'bg-blue-100 text-blue-600',
    },
]

const ACTIVITIES = [
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000&auto=format&fit=crop', // Worship
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000&auto=format&fit=crop', // Group
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1000&auto=format&fit=crop', // Outdoor
    'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1000&auto=format&fit=crop', // Study
]

// ----------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------

export default function SamSchoolPage() {
    return (
        <PageLayout
            sidebarMenu="next-generation"
            breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: '다음세대', href: '/next-generation' },
                { label: '샘스쿨', href: '/next-generation/sam-school' },
            ]}
        >
            <div className="space-y-16">

                {/* 1. Hero Section */}
                <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl">
                    {/* Background Image Overlay */}
                    <div className="absolute inset-0 z-0">
                        <OptimizedImage
                            src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000&auto=format&fit=crop"
                            alt="Youth Worship"
                            fill
                            className="object-cover opacity-40 mix-blend-overlay"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                    </div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-16 items-center">
                        <div className="space-y-6">
                            <Badge className="bg-teal-500/20 text-teal-300 border border-teal-500/50 px-4 py-1.5 text-sm gap-2 backdrop-blur-md">
                                <School className="w-4 h-4" /> BFGC 중고등부
                            </Badge>
                            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
                                SAM SCHOOL<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400">
                                    샘스쿨
                                </span>
                            </h1>
                            <p className="text-lg text-slate-300 leading-relaxed max-w-lg">
                                마르지 않는 샘물처럼, 생명력 넘치는 청소년 공동체.<br />
                                하나님의 꿈을 꾸고, 세상을 향해 도전하는<br />
                                거룩한 다음세대를 세워갑니다.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/10">
                                    <Clock className="w-5 h-5 text-teal-400" />
                                    <div>
                                        <p className="text-xs text-slate-400">예배 시간</p>
                                        <p className="font-bold">주일 오후 3:00</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/10">
                                    <MapPin className="w-5 h-5 text-teal-400" />
                                    <div>
                                        <p className="text-xs text-slate-400">장소</p>
                                        <p className="font-bold">본 예배당</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Core Values */}
                <section className="space-y-10">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2">
                            <Target className="w-8 h-8 text-indigo-600" />
                            우리의 핵심 가치
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            샘스쿨은 3W (Worship, Word, Witness)의 비전을 품고 나아갑니다.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {CORE_VALUES.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 hover:border-indigo-500/50 transition-all duration-300 relative overflow-hidden"
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-10 transition-transform group-hover:scale-110 ${value.color.split(' ')[0]}`} />

                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${value.color}`}>
                                    <value.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold mb-1">{value.title}</h3>
                                <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-3">{value.subtitle}</p>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 3. Activities Gallery */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                            함께라서 더 즐거운<br />
                            <span className="text-teal-600">샘스쿨 라이프</span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg">
                            예배뿐만 아니라 다양한 활동을 통해<br />
                            서로 깊이 교제하며 믿음의 동역자로 성장합니다.
                        </p>
                        <ul className="space-y-3">
                            {[
                                '매일 성경 큐티 나눔 (단톡방)',
                                '여름/겨울 수련회 및 비전트립',
                                '토요 찬양팀 연습 및 모임',
                                '시험기간 간식 응원 이벤트',
                                '반별 단합대회 및 아웃팅'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                    <div className="w-2 h-2 rounded-full bg-teal-500" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Button className="bg-slate-900 hover:bg-slate-800 text-white mt-4">
                            활동 사진 더 보기
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {ACTIVITIES.map((img, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                className={`relative rounded-xl overflow-hidden shadow-lg ${index % 2 === 1 ? 'mt-8' : ''}`}
                            >
                                <div className="aspect-[3/4]">
                                    <OptimizedImage
                                        src={img}
                                        alt={`Activity ${index}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 5. CTA */}
                <section className="relative rounded-2xl overflow-hidden bg-indigo-600 text-white p-10 text-center">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                    <div className="relative z-10 space-y-6">
                        <Sparkles className="w-10 h-10 mx-auto text-yellow-300" />
                        <h2 className="text-3xl font-bold">지금 샘스쿨과 함께하세요!</h2>
                        <p className="text-indigo-100 max-w-xl mx-auto">
                            혼자 고민하지 말고 함께 걸어가요.<br />
                            샘스쿨은 여러분을 언제나 환영합니다.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50 border-none font-bold">
                                새친구 등록하기
                            </Button>
                        </div>
                    </div>
                </section>

            </div>
        </PageLayout>
    )
}
