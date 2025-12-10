'use client'

import { motion } from 'framer-motion'
import PageLayout from '@/components/layout/PageLayout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, Flame, BookOpen, Heart, Clock, MapPin, Calendar, ArrowRight, Shield, Target, Coffee } from 'lucide-react'
import { OptimizedImage } from '@/components/common/OptimizedImage'

// ----------------------------------------------------------------------
// Mock Data
// ----------------------------------------------------------------------

const LEADERSHIP = [
    {
        name: '정청년 목사',
        role: '담당 교역자',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop',
        message: '청년의 때에 창조주를 기억하십시오.',
    },
    {
        name: '김회장 형제',
        role: '청년부 회장',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop',
        message: '함께 울고 웃는 믿음의 가족이 됩시다.',
    },
]

const GATHERINGS = [
    {
        title: '금요 찬양예배',
        subtitle: 'Passion Worship',
        time: '매주 금요일 오후 7:30',
        location: '본당',
        description: '한 주간의 삶을 내려놓고 뜨겁게 찬양하며 기도로 나아가는 시간입니다.',
        icon: Flame,
        color: 'bg-orange-100 text-orange-600',
    },
    {
        title: '주일 청년예배',
        subtitle: 'Sunday Service',
        time: '매주 주일 오후 2:00',
        location: '교육관 4층',
        description: '청년의 시각으로 말씀을 해석하고 삶에 적용하는 예배입니다.',
        icon: Shield,
        color: 'bg-blue-100 text-blue-600',
    },
    {
        title: '소그룹 모임 (GBS)',
        subtitle: 'Group Bible Study',
        time: '예배 후',
        location: '소그룹실',
        description: '말씀을 나누고 서로의 삶을 격려하며 깊은 교제를 나눕니다.',
        icon: Users,
        color: 'bg-green-100 text-green-600',
    },
]

// ----------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------

export default function JoshuaPage() {
    return (
        <PageLayout
            sidebarMenu="next-generation"
            breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: '다음세대', href: '/next-generation' },
                { label: '여호수아 청년부', href: '/next-generation/joshua' },
            ]}
        >
            <div className="space-y-20">

                {/* 1. Hero Section */}
                <section className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                    <OptimizedImage
                        src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000&auto=format&fit=crop"
                        alt="Joshua Worship"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />

                    <div className="absolute inset-0 flex items-center p-8 md:p-16">
                        <div className="max-w-2xl space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Badge className="bg-blue-600 hover:bg-blue-700 text-white border-none px-4 py-1.5 text-sm mb-4">
                                    BFGC Young Adults
                                </Badge>
                                <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-4">
                                    JOSHUA<br />
                                    <span className="text-blue-400">GENERATION</span>
                                </h1>
                                <p className="text-xl text-slate-300 font-light leading-relaxed border-l-4 border-blue-500 pl-6">
                                    "강하고 담대하라 두려워하지 말며 놀라지 말라<br />
                                    네가 어디로 가든지 네 하나님 여호와가 너와 함께 하느니라"<br />
                                    <span className="text-sm text-slate-400 mt-2 block">- 여호수아 1:9 -</span>
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="flex gap-4 pt-4"
                            >
                                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-bold">
                                    예배 안내
                                </Button>
                                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                                    새가족 등록
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* 2. Identity & Vision */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                                우리는 <span className="text-blue-600">세상의 빛</span>입니다
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                                여호수아 청년부는 부다페스트 한인선교교회의 청년 공동체입니다.
                                유학, 취업, 주재원 등 다양한 이유로 헝가리에 모인 청년들이
                                예수 그리스도 안에서 한 가족이 되어 서로를 세워갑니다.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { icon: Target, title: 'Vision', desc: '하나님 나라를 확장하는 청년' },
                                { icon: Heart, title: 'Community', desc: '사랑으로 하나되는 공동체' },
                                { icon: BookOpen, title: 'Discipleship', desc: '말씀으로 훈련된 제자' },
                                { icon: Coffee, title: 'Fellowship', desc: '삶을 나누는 진정한 교제' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                    <div className="bg-white dark:bg-slate-800 p-2.5 rounded-lg shadow-sm text-blue-600">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white">{item.title}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                        <OptimizedImage
                            src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1000&auto=format&fit=crop"
                            alt="Community Life"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply" />
                    </div>
                </section>

                {/* 3. Gatherings */}
                <section className="space-y-10">
                    <div className="text-center max-w-2xl mx-auto space-y-4">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                            함께 모여 예배합니다
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            뜨거운 찬양과 깊이 있는 말씀, 그리고 진실한 나눔이 있는<br />
                            여호수아 청년부의 모임에 여러분을 초대합니다.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {GATHERINGS.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-800 hover:border-blue-500/30 hover:shadow-xl transition-all duration-300"
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-4">{item.subtitle}</p>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                        <Clock className="w-4 h-4" /> {item.time}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                        <MapPin className="w-4 h-4" /> {item.location}
                                    </div>
                                </div>

                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 4. Leadership */}
                <section className="bg-slate-900 text-white rounded-3xl p-10 md:p-16 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold">섬기는 사람들</h2>
                            <p className="text-slate-300 leading-relaxed">
                                여호수아 청년부를 위해<br />
                                기도하며 섬기는 리더십입니다.<br />
                                여러분의 신앙 생활을 돕겠습니다.
                            </p>
                            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
                                임원단 전체보기 <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>

                        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {LEADERSHIP.map((leader, index) => (
                                <div key={index} className="flex items-center gap-4 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-blue-400 flex-shrink-0">
                                        <OptimizedImage
                                            src={leader.image}
                                            alt={leader.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{leader.name}</h3>
                                        <p className="text-blue-400 text-sm mb-1">{leader.role}</p>
                                        <p className="text-xs text-slate-400 italic">"{leader.message}"</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. CTA */}
                <section className="text-center space-y-8 py-10">
                    <h2 className="text-3xl font-bold">함께할 당신을 기다립니다</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                        낯선 땅 헝가리에서 믿음의 동역자를 만나보세요.<br />
                        여호수아 청년부는 언제나 열려있습니다.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30">
                            카카오톡 오픈채팅 입장
                        </Button>
                        <Button size="lg" variant="outline">
                            인스타그램 구경하기
                        </Button>
                    </div>
                </section>

            </div>
        </PageLayout>
    )
}
