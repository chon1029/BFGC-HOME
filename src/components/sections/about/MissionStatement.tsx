'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/common/Container'
import { OptimizedImage } from '@/components/common/OptimizedImage'
import { Badge } from '@/components/ui/badge'

/**
 * 시명선언 섹션 (섹션 01)
 * - 성경 구절 (느헤미야 2:1-35-36)
 * - 교회 시명 메시지
 * - 이미지 활용
 *
 * @returns 시명선언 섹션 JSX
 */
export default function MissionStatement() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <Container>
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 text-base px-6 py-2">
            <span className="text-2xl font-bold mr-2">01</span>
            시명선언
          </Badge>
          <p className="text-sm text-muted-foreground">부다페스트한인선교교회</p>
        </motion.div>

        {/* 콘텐츠 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 rounded-2xl overflow-hidden shadow-xl border border-primary/10">
            {/* 배경 이미지 (선택적) */}
            <div className="absolute inset-0 opacity-5">
              <OptimizedImage
                src="/images/vision/mission-statement.png"
                alt="시명선언 배경"
                fill
                objectFit="cover"
              />
            </div>

            <div className="relative z-10 p-8 md:p-12 space-y-8">
              {/* 성경 구절 */}
              <div className="text-center">
                <div className="inline-block">
                  <div className="relative">
                    <OptimizedImage
                      src="/images/vision/mission-statement-title.png"
                      alt="누가복음 21:35-36"
                      width={200}
                      height={60}
                      className="mx-auto mb-4"
                    />
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-primary">
                    누가복음 21:35-36
                  </p>
                </div>
              </div>

              {/* 구분선 */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

              {/* 메인 메시지 */}
              <div className="text-center space-y-4">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                    예수님의 재림을 준비하는 거룩한 성도
                    <br className="hidden md:block" />
                    세상을 변화시키는 실력 있는 믿음의 공동체
                  </span>
                </h2>

                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mt-6">
                  우리는 예수 그리스도의 재림을 소망하며,
                  <br className="hidden sm:block" />
                  말씀으로 거듭나고 성령으로 충만하여
                  <br className="hidden sm:block" />
                  세상을 변화시키는 능력 있는 교회를 꿈꿉니다.
                </p>
              </div>

              {/* 장식 요소 */}
              <div className="flex justify-center gap-2 pt-4">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-100" />
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-200" />
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
