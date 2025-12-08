'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/common/Container'
import { MapPin } from 'lucide-react'

/**
 * 오시는 길 Hero 섹션
 * - 타이틀
 * - 서브타이틀
 * - 그라데이션 배경
 *
 * @returns Hero 섹션 JSX
 */
export default function LocationHero() {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-sky-50 via-purple-50 to-sky-50 overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          {/* 아이콘 */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-400 to-purple-500 flex items-center justify-center shadow-lg">
              <MapPin className="w-10 h-10 text-white" fill="white" />
            </div>
          </motion.div>

          {/* 메인 타이틀 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold"
          >
            오시는 길
          </motion.h1>

          {/* 구분선 */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-24 h-1 bg-gradient-to-r from-sky-400 to-purple-500 mx-auto"
          />

          {/* 서브타이틀 */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground"
          >
            쉽게 찾아오실 수 있습니다
          </motion.p>

          {/* 주소 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="inline-block bg-white rounded-xl px-8 py-4 shadow-md border border-sky-200"
          >
            <p className="text-lg font-semibold">
              <span className="bg-gradient-to-r from-sky-500 to-purple-500 bg-clip-text text-transparent">
                Budapest, Ósvát u. 16, 1073
              </span>
            </p>
          </motion.div>
        </motion.div>
      </Container>

      {/* 배경 장식 */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl -z-10" />
    </section>
  )
}
