'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/common/Container'
import { Badge } from '@/components/ui/badge'

/**
 * 예배 안내 메시지 섹션
 * - "신령과 진정으로 드리는 예배"
 * - "기도로 예배를 준비합니다" 강조
 *
 * @returns 메시지 섹션 JSX
 */
export default function ScheduleMessage() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-sky-50/30">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* 섹션 헤더 */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-base px-6 py-2">
              <span className="text-2xl font-bold mr-2">01</span>
              예배 안내
            </Badge>
          </div>

          {/* 메인 메시지 */}
          <div className="text-center space-y-8">
            {/* 제목 */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold"
            >
              신령과 진정으로 드리는 예배
            </motion.h2>

            {/* 구분선 */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-32 h-1 bg-gradient-to-r from-sky-400 to-purple-500 mx-auto"
            />

            {/* 강조 메시지 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-4"
            >
              <p className="text-xl md:text-2xl leading-relaxed">
                부다페스트한인선교교회 성도는
              </p>
              <p className="text-2xl md:text-3xl font-bold">
                <span className="bg-gradient-to-r from-sky-500 to-purple-500 bg-clip-text text-transparent">
                  기도로 예배를 준비
                </span>
                합니다
              </p>
            </motion.div>

            {/* 설명 텍스트 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-br from-sky-50 to-purple-50 rounded-2xl p-8 border border-sky-200"
            >
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                예배는 하나님을 만나는 거룩한 시간입니다.
                <br className="hidden sm:block" />
                우리는 예배 전 기도로 마음을 준비하며, 성령의 임재 가운데 하나님께 영광을 돌립니다.
                <br className="hidden sm:block" />
                모든 성도님들의 적극적인 참여와 헌신을 통해 하나님께서 기뻐하시는 예배를 드립니다.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
