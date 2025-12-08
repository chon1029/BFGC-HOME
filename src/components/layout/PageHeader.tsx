'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface PageHeaderProps {
    showSlogan?: boolean
}

export default function PageHeader({ showSlogan = true }: PageHeaderProps) {
    if (!showSlogan) return null

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="sticky top-0 z-40 w-full h-[200px] md:h-[250px] bg-white dark:bg-slate-900"
        >
            {/* 슬로건 배경 이미지 */}
            <Image
                src="/images/logo/header-bg-2025.png"
                alt="2025년 교회 표어 - 헌신하는 교회"
                fill
                className="object-cover"
                style={{ objectPosition: 'center 80%' }}
                priority
                quality={100}
            />

            {/* 약간의 오버레이 (선택사항 - 가독성 향상) */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/30 dark:to-slate-900/30" />
        </motion.section>
    )
}
