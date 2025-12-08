'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const menuItems = [
    {
        label: '예배시간',
        image: '/images/herosection/church-info/schedule.png',
        href: '/about/service-time',
        delay: 0.1
    },
    {
        label: '오시는길',
        image: '/images/herosection/church-info/map.png',
        href: '/about/location',
        delay: 0.2
    },
    {
        label: '다음세대',
        image: '/images/herosection/church-info/next-gen.png',
        href: '/ministry/next-gen',
        delay: 0.3
    },
    {
        label: '교회주보',
        image: '/images/herosection/church-info/bulletin.png',
        href: '/news/bulletin',
        delay: 0.4
    },
    {
        label: '일용할양식',
        image: '/images/herosection/church-info/daily-bread.png',
        href: '/word/daily',
        delay: 0.5
    }
]

export default function ServiceInfoSection() {
    return (
        <section className="py-24 bg-white w-full overflow-hidden" style={{ fontFamily: '"SC Dream", sans-serif' }}>
            <div className="container mx-auto px-4">
                {/* 상단 텍스트 - 토도독 효과 적용 */}
                <div className="text-center mb-20 space-y-4">
                    <motion.p
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: false, margin: "-10%" }}
                        transition={{ duration: 0.5, delay: 0 }}
                        className="text-gray-500 text-lg md:text-xl font-medium tracking-wide"
                    >
                        Happy Church! Happy People!
                    </motion.p>

                    <div className="space-y-2">
                        <motion.h3
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: false, margin: "-10%" }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-2xl md:text-3xl text-gray-700 font-medium"
                        >
                            예배가 중심이 된 선교적 교회
                        </motion.h3>
                        <motion.h2
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: false, margin: "-10%" }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-4xl md:text-5xl font-bold text-black tracking-tight drop-shadow-xl"
                            style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.6)' }}
                        >
                            부다페스트한인선교교회
                        </motion.h2>
                    </div>
                </div>

                {/* 아이콘 메뉴 그리드 */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 max-w-6xl mx-auto">
                    {menuItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="group flex flex-col items-center gap-6"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }} // 더 작게 시작해서 줌 효과 극대화
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: false, margin: "-10%" }} // 화면에 들어올 때마다 줌 인
                                transition={{ duration: 0.5, delay: item.delay }}
                                whileHover={{
                                    scale: 1.1,
                                    rotate: 3,
                                    transition: { duration: 0.2, delay: 0 } // 호버는 즉시 반응!
                                }}
                                className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300 bg-gray-50 flex items-center justify-center"
                            >
                                <div className="relative w-full h-full p-4">
                                    <Image
                                        src={item.image}
                                        alt={item.label}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                {/* 호버 시 오버레이 효과 */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                            </motion.div>

                            <span className="text-lg font-bold text-gray-600 group-hover:text-black group-hover:scale-105 transition-all duration-300">
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
