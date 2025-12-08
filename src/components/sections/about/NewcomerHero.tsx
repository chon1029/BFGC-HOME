'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/common/Container'
import { Heart, Users, Sparkles } from 'lucide-react'

/**
 * 새가족 환영 Hero 섹션
 * - 따뜻한 환영 메시지
 * - 그라데이션 배경
 * - 애니메이션 효과
 *
 * @returns Hero 섹션 JSX
 */
export default function NewcomerHero() {
  return (
    <section className="relative bg-gradient-to-b from-sky-50 via-purple-50 to-background py-20 md:py-28 overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          {/* 환영 아이콘 */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-400 to-purple-500 flex items-center justify-center shadow-lg">
              <Heart className="w-8 h-8 text-white" fill="white" />
            </div>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-sky-500 flex items-center justify-center shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-500 to-purple-400 flex items-center justify-center shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          {/* 메인 타이틀 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            <span className="bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[3px_3px_2px_rgba(0,0,0,0.8)]">
              환영합니다!
            </span>
          </motion.h1>

          {/* 환영 메시지 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-4"
          >
            <p className="text-xl md:text-2xl font-semibold">
              부다페스트한인선교교회에 오신 여러분을
              <br />
              진심으로 환영합니다
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              저희 교회에 방문해 주신 분들을 예수님의 사랑으로 환영하며,
              <br className="hidden sm:block" />
              하나님의 은혜와 축복이 함께하시길 기도합니다.
            </p>
          </motion.div>

          {/* 구분선 */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="w-24 h-1 bg-gradient-to-r from-sky-400 to-purple-500 mx-auto"
          />

          {/* 안내 텍스트 */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-sm md:text-base text-muted-foreground"
          >
            아래 안내를 따라 새가족으로 등록하시면
            <br className="sm:hidden" />
            다양한 혜택과 프로그램을 만나보실 수 있습니다
          </motion.p>
        </motion.div>
      </Container>

      {/* 배경 장식 요소 */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl -z-10" />
    </section>
  )
}
