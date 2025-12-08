'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/common/Container'
import { OptimizedImage } from '@/components/common/OptimizedImage'

/**
 * 예배시간 안내 Hero 섹션
 * - 흑백 배경 이미지
 * - 타이틀 오버레이
 * - 그라데이션 효과
 *
 * @returns Hero 섹션 JSX
 */
export default function ScheduleHero() {
  return (
    <section className="relative h-[400px] md:h-[500px] overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0">
        <OptimizedImage
          src="/images/herosection/link-img/schedule-bg.png"
          alt="예배시간 안내"
          fill
          className="object-cover"
          priority
        />
        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* 텍스트 콘텐츠 */}
      <Container className="relative h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white space-y-4"
        >
          {/* 메인 타이틀 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold"
          >
            예배시간 안내
          </motion.h1>

          {/* 구분선 */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-1 bg-gradient-to-r from-sky-400 to-purple-500 mx-auto"
          />

          {/* 교회명 */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-white/90"
          >
            부다페스트한인선교교회
          </motion.p>
        </motion.div>
      </Container>
    </section>
  )
}
