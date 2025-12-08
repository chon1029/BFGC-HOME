'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const features = [
    {
        id: 1,
        title: '내 영혼의 일용할 양식',
        subtitle: '하나님의 말씀으로\n감격 속에 새 날을 여는',
        verse: '"내가 주님을 의지하니, 아침마다 주님의 변함없는 사랑의 말씀을 듣게 해주십시오. 내 영혼이 주님께 의지하니, 내가 가야할 길을 알려 주십시오." (시편 143:8 새번역)',
        image: '/images/herosection/link-img/daily-bread.jpg',
        href: '/worship/daily-bread',
        color: 'from-rose-900/95 via-rose-900/80 to-transparent', // 붉은 계열
    },
    {
        id: 2,
        title: '이 땅을 새롭게 하는 기도',
        subtitle: '하나님의 도우심을\n힘써 구하며 위대함을 기대하는',
        verse: '"너는 내게 부르짖으라 내가 네게 응답하겠고 네가 알지 못하는 크고 은밀한 일을 네게 보이리라" (예레미야 33:3)',
        image: '/images/herosection/link-img/weekly-pray.jpg',
        href: '/life/prayer',
        color: 'from-indigo-950/90 via-indigo-900/75 to-transparent', // 보라/남색 계열 - 투명도 낮춤
    },
    {
        id: 3,
        title: '함께 동참하고 싶은 교회',
        subtitle: '믿음의 공동체의\n삶의 구심점이 되는 교회',
        verse: '"그들이 사도의 가르침을 받아 서로 교제하고 떡을 떼며 오로지 기도하기를 힘쓰니라" (사도행전 2:42)',
        image: '/images/herosection/link-img/contact.jpg',
        href: '/partnership/contact',
        color: 'from-slate-900/95 via-slate-900/80 to-transparent', // 무채색 계열
    }
]

export default function FeatureCardsSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: false, margin: "-100px" })

    return (
        <section className="py-12 pb-24 bg-white dark:bg-slate-950" ref={ref}>
            <div className="container px-8 md:px-12 lg:px-20 mx-auto max-w-7xl">
                <div className="flex flex-col items-end mb-12">
                    <p className="text-sm md:text-base text-slate-500 font-medium mb-1">예수님을 닮아가도록 격려하는</p>
                    <h2
                        className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white"
                        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
                    >
                        부다페스트한인선교교회
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            initial={{ opacity: 0, y: 60 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                            transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                            className="group relative h-[450px] overflow-hidden cursor-pointer bg-slate-100"
                            style={{ boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)' }}
                        >
                            {/* Background Image (Full height) */}
                            <Image
                                src={feature.image}
                                alt={feature.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Sliding Content Box (Bottom 1/3 -> Full) */}
                            <div
                                className={`absolute bottom-0 left-0 right-0 h-[35%] group-hover:h-full transition-all duration-700 ease-out bg-gradient-to-t ${feature.color}`}
                            >
                                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">

                                    {/* Title & Subtitle (Always visible, moves up on hover) */}
                                    <div className="transform transition-all duration-700 ease-out group-hover:-translate-y-4">
                                        <p className="text-sm font-medium text-white/90 mb-2 leading-relaxed whitespace-pre-line opacity-90 group-hover:opacity-100">
                                            {feature.subtitle}
                                        </p>
                                        <h3 className="text-2xl font-bold leading-tight drop-shadow-xl shadow-black">
                                            {feature.title}
                                        </h3>
                                    </div>

                                    {/* Hidden Content (Verse & Button) - Appears on hover */}
                                    <div className="overflow-hidden h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-700 ease-out delay-100">
                                        <div className="pt-6 border-t border-white/20 mt-6">
                                            <p className="text-sm text-white/90 mb-8 italic leading-relaxed">
                                                {feature.verse}
                                            </p>
                                            <Link href={feature.href}>
                                                <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-slate-900 bg-transparent transition-colors rounded-full">
                                                    바로가기
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
