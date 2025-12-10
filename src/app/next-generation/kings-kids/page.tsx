'use client'

import { motion } from 'framer-motion'
import PageLayout from '@/components/layout/PageLayout'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Crown, Heart, Star, BookOpen, Music, Users, Clock, MapPin, Calendar } from 'lucide-react'
import { OptimizedImage } from '@/components/common/OptimizedImage'

// ----------------------------------------------------------------------
// Mock Data
// ----------------------------------------------------------------------

const TEACHERS = [
    {
        name: '김사랑 선생님',
        role: '부장',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop',
        message: '아이들을 예수님의 사랑으로 섬기겠습니다.',
    },
    {
        name: '이믿음 선생님',
        role: '교사',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop',
        message: '말씀 안에서 함께 자라가는 기쁨!',
    },
    {
        name: '박소망 선생님',
        role: '교사',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop',
        message: '매일매일 기도로 아이들을 응원합니다.',
    },
]

const PROGRAMS = [
    {
        title: '신나는 찬양과 율동',
        description: '온 몸으로 하나님을 찬양하며 기쁨을 표현해요.',
        icon: Music,
        color: 'bg-yellow-100 text-yellow-600',
    },
    {
        title: '재미있는 성경공부',
        description: '눈높이에 맞춘 공과공부로 말씀을 배워요.',
        icon: BookOpen,
        color: 'bg-blue-100 text-blue-600',
    },
    {
        title: '즐거운 교제와 활동',
        description: '친구들과 함께 놀며 사랑을 나누어요.',
        icon: Users,
        color: 'bg-green-100 text-green-600',
    },
]

const GALLERY_IMAGES = [
    'https://images.unsplash.com/photo-1502086223501-681a6a300d15?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1000&auto=format&fit=crop',
]

// ----------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------

export default function KingsKidsPage() {
    return (
        <PageLayout
            sidebarMenu="next-generation"
            breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: '다음세대', href: '/next-generation' },
                { label: '킹스키즈', href: '/next-generation/kings-kids' },
            ]}
        >
            <div className="space-y-16">

                {/* 1. Hero Section */}
                <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-300/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12 items-center">
                        <div className="space-y-6">
                            <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white border-none px-4 py-1.5 text-sm gap-2">
                                <Crown className="w-4 h-4" /> BFGC 어린이부
                            </Badge>
                            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900 dark:text-white">
                                예수님을 닮아가는<br />
                                <span className="text-orange-500">킹스키즈</span> 어린이
                            </h1>
                            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                킹스키즈(King's Kids)는 하나님의 자녀로서 정체성을 가지고,
                                말씀과 기도로 자라나는 부다페스트 한인선교교회의 유초등부입니다.
                                세상의 빛과 소금이 될 우리 아이들을 축복합니다!
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm">
                                    <Clock className="w-5 h-5 text-orange-500" />
                                    <span className="font-medium">주일 오전 11:00</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm">
                                    <MapPin className="w-5 h-5 text-orange-500" />
                                    <span className="font-medium">교육관 2층 킹스키즈실</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                                <OptimizedImage
                                    src="https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=1000&auto=format&fit=crop"
                                    alt="Happy Kids"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {/* Decorative Elements */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute -top-6 -right-6 bg-white dark:bg-slate-800 p-4 rounded-full shadow-lg"
                            >
                                <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                                className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-4 rounded-full shadow-lg"
                            >
                                <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* 2. Vision & Mission */}
                <section className="text-center space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                            우리는 이렇게 자라요 🌱
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            킹스키즈는 아이들이 즐겁게 신앙생활을 할 수 있도록 다양한 프로그램을 운영합니다.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {PROGRAMS.map((program, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-transform duration-300"
                            >
                                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 ${program.color}`}>
                                    <program.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{program.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    {program.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 3. Teachers Section */}
                <section className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-8 md:p-12 space-y-8">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                            사랑으로 섬기는 선생님들 👩‍🏫
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            아이 한 명 한 명을 소중히 여기며 기도로 가르칩니다.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {TEACHERS.map((teacher, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="relative aspect-square">
                                    <OptimizedImage
                                        src={teacher.image}
                                        alt={teacher.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-6 text-center">
                                    <Badge variant="secondary" className="mb-3">{teacher.role}</Badge>
                                    <h3 className="text-lg font-bold mb-2">{teacher.name}</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                                        "{teacher.message}"
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 4. Gallery Preview */}
                <section className="space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Calendar className="w-6 h-6 text-orange-500" />
                            킹스키즈 활동 모습
                        </h2>
                        <Button variant="ghost" className="text-slate-500 hover:text-orange-500">
                            더 보기
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {GALLERY_IMAGES.map((img, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="relative aspect-square rounded-xl overflow-hidden shadow-md cursor-pointer"
                            >
                                <OptimizedImage
                                    src={img}
                                    alt={`Activity ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 5. Contact / Join CTA */}
                <section className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-8 md:p-12 text-center text-white shadow-lg">
                    <h2 className="text-3xl font-bold mb-4">우리 아이도 함께하고 싶나요?</h2>
                    <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                        킹스키즈는 언제나 열려있습니다. 주일 오전 11시, 교육관 2층에서 만나요!<br />
                        궁금한 점이 있으시면 언제든 문의해주세요.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-white text-orange-600 hover:bg-slate-100 border-none font-bold">
                            등록 문의하기
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                            오시는 길 안내
                        </Button>
                    </div>
                </section>

            </div>
        </PageLayout>
    )
}
