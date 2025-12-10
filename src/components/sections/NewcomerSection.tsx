'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const steps = [
    {
        label: '새가족등록',
        image: '/images/herosection/newcomer/registration.png',
    },
    {
        label: '새가족환영',
        image: '/images/herosection/newcomer/welcome.png',
    },
    {
        label: '1:1새가족섬김',
        image: '/images/herosection/newcomer/one-on-one.png',
    },
    {
        label: '새가족수료',
        image: '/images/herosection/newcomer/graduation.png',
    },
    {
        label: '침례식',
        image: '/images/herosection/newcomer/baptism.png',
    }
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.8 },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 10
        }
    }
}

export default function NewcomerSection() {
    return (
        <section className="py-24 w-full overflow-hidden bg-[#F9F8F3]" style={{ fontFamily: '"SC Dream", sans-serif' }}>
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 max-w-7xl mx-auto px-4 lg:px-12"> {/* 중앙 정렬, 간격 축소, 최대 너비 제한, 좌우 여백 추가 */}

                    {/* 좌측 텍스트 & 버튼 */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, margin: "-10%" }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-1/3 space-y-6 text-center lg:text-left" // 불필요한 pl 제거
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight drop-shadow-[2px_2px_3px_rgba(0,0,0,0.8)]">
                            처음오셨나요?
                        </h2>

                        <div className="space-y-1 text-gray-600 text-lg leading-relaxed">
                            <p>새가족 여러분을 주님의 이름으로 환영합니다.</p>
                            <p>방문 이후부터 새가족 등록까지의 모든 것을</p>
                            <p>자세하게 안내해 드리겠습니다.</p>
                        </div>

                        <Button
                            asChild
                            size="lg"
                            className="bg-gradient-to-r from-sky-500 to-violet-500 hover:brightness-110 text-white text-lg px-8 py-6 rounded-md drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)] hover:shadow-xl transition-all duration-300 group border-0"
                        >
                            <Link href="/guide/newcomer" className="flex items-center gap-2">
                                새가족 안내 자세히 보기
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </motion.div>

                    {/* 우측 프로세스 (순차적 애니메이션) */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, margin: "-10%" }}
                        className="lg:w-2/3 flex flex-wrap justify-center lg:justify-end items-center gap-2 md:gap-4"
                    >
                        {steps.map((step, index) => (
                            <div key={step.label} className="flex items-center">
                                {/* 단계 아이템 */}
                                <motion.div
                                    variants={itemVariants}
                                    className="flex flex-col items-center gap-3"
                                >
                                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-md flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300">
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={step.image}
                                                alt={step.label}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                    <span className="text-sm md:text-base font-bold text-gray-800">
                                        {step.label}
                                    </span>
                                </motion.div>

                                {/* 화살표 (마지막 아이템 제외) */}
                                {index < steps.length - 1 && (
                                    <motion.div
                                        variants={itemVariants}
                                        className="mx-1 md:mx-2 hidden sm:block opacity-50"
                                    >
                                        <Image
                                            src="/images/herosection/newcomer/right-arrow.png"
                                            alt="arrow"
                                            width={20}
                                            height={20}
                                            className="w-4 h-4 md:w-6 md:h-6 object-contain"
                                        />
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
