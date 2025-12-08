'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function GreetingHeroSection() {
    return (
        <section className="relative bg-gradient-to-br from-slate-50 via-sky-50 to-violet-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
            {/* 세계지도 배경 */}
            <div className="absolute inset-0 opacity-50 dark:opacity-30">
                <Image
                    src="/images/herosection/link-img/world-map-dots.jpg"
                    alt="세계지도"
                    fill
                    className="object-cover object-center"
                    priority
                    unoptimized
                />
            </div>

            {/* 그라데이션 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/50 to-transparent dark:from-slate-900/80 dark:via-slate-900/50 dark:to-transparent" />

            <div className="container mx-auto px-4 py-16 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* 왼쪽: 텍스트 콘텐츠 */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="relative z-10 space-y-6"
                    >
                        {/* 연도 배지 */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-block"
                        >
                            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 text-white font-bold text-sm shadow-lg">
                                2025년
                            </span>
                        </motion.div>

                        {/* 메인 제목 */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight space-y-3"
                            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}
                        >
                            <span className="block text-slate-900 dark:text-white">
                                부다페스트한인선교교회는
                            </span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-violet-600 dark:from-sky-400 dark:to-violet-400">
                                다음세대를 세우며,
                            </span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-rose-600 dark:from-violet-400 dark:to-rose-400">
                                뜨겁게 헌신하는
                            </span>
                            <span className="block text-slate-900 dark:text-white">
                                선교적 교회로 나아갑니다
                            </span>
                        </motion.h1>

                        {/* 구분선 */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="h-1 w-24 bg-gradient-to-r from-sky-500 to-violet-500 rounded-full origin-left"
                        />

                        {/* 부제목 */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed"
                        >
                            환영합니다!
                            <br />
                            부다페스트한인선교교회
                            <br />
                            홈페이지를 방문해 주셔서 감사합니다.
                        </motion.p>
                    </motion.div>

                    {/* 오른쪽: 목사님 사진 */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                        className="relative z-10"
                    >
                        {/* 회전하는 전체 컨테이너 */}
                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                                rotate: [0, 2, 0],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            className="relative w-full aspect-[4/5] max-w-md mx-auto"
                        >
                            {/* 배경 장식 */}
                            <div className="absolute inset-0 bg-gradient-to-br from-sky-400/20 to-violet-500/20 rounded-3xl" />

                            {/* 목사님 사진 - 투명 배경 유지 */}
                            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/herosection/link-img/pastor.png"
                                    alt="담임목사"
                                    fill
                                    className="object-cover object-center"
                                    priority
                                    unoptimized
                                    sizes="(max-width: 768px) 100vw, 500px"
                                />

                                {/* 그라데이션 오버레이 */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
                            </div>
                        </motion.div>

                        {/* 장식 요소 - 블러 감소 */}
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-sky-400 to-violet-500 rounded-full blur-lg opacity-30"
                        />
                        <motion.div
                            animate={{
                                y: [0, 10, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: 1,
                            }}
                            className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-violet-400 to-rose-500 rounded-full blur-lg opacity-30"
                        />
                    </motion.div>
                </div>
            </div>

            {/* 하단 웨이브 */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg
                    viewBox="0 0 1440 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                >
                    <path
                        d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
                        fill="currentColor"
                        className="text-white dark:text-slate-900"
                    />
                </svg>
            </div>
        </section>
    )
}
