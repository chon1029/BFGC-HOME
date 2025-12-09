'use client'

import { motion } from 'framer-motion'
import { BookOpen, Calendar, Sparkles } from 'lucide-react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

interface PrayerHeroSectionProps {
    currentWeek?: string
    mainTheme?: string
}

export function PrayerHeroSection({ currentWeek, mainTheme }: PrayerHeroSectionProps) {
    const today = new Date()

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 mb-8">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* Decorative Elements */}
            <motion.div
                className="absolute top-4 right-4 text-white/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                <Sparkles className="h-16 w-16" />
            </motion.div>

            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-white"
                >
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm font-medium">
                            {format(today, 'yyyy년 M월 d일', { locale: ko })}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                        주간 기도문
                    </h1>

                    <p className="text-xl text-sky-100 mb-6">
                        함께 기도하며 하나님의 뜻을 구합니다
                    </p>

                    {currentWeek && (
                        <div className="inline-flex items-center gap-2 bg-amber-500/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <span className="text-sm font-semibold text-white">
                                📅 {currentWeek}
                            </span>
                        </div>
                    )}

                    {mainTheme && (
                        <div className="mt-4 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                            <span className="text-sm text-white">
                                이번 주 주제: <strong>{mainTheme}</strong>
                            </span>
                        </div>
                    )}

                    {/* Bible Verse */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="mt-8 pl-4 border-l-4 border-amber-400"
                    >
                        <p className="text-sky-50 italic text-lg leading-relaxed">
                            "쉬지 말고 기도하라"
                        </p>
                        <p className="text-sky-200 text-sm mt-1">
                            - 데살로니가전서 5:17
                        </p>
                    </motion.div>
                </motion.div>

                {/* Right Illustration */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="hidden md:flex items-center justify-center"
                >
                    <div className="relative">
                        {/* Glowing Circle */}
                        <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl" />

                        {/* Icon Container */}
                        <div className="relative bg-white/20 backdrop-blur-md rounded-full p-12 border border-white/30">
                            <BookOpen className="h-32 w-32 text-white" strokeWidth={1.5} />
                        </div>

                        {/* Floating Elements */}
                        <motion.div
                            className="absolute -top-4 -right-4 bg-amber-400 rounded-full p-3"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Sparkles className="h-6 w-6 text-white" />
                        </motion.div>

                        <motion.div
                            className="absolute -bottom-4 -left-4 bg-sky-300 rounded-full p-3"
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                        >
                            <Calendar className="h-6 w-6 text-white" />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
