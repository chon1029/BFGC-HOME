'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/common/Container'

/**
 * 비전 페이지 히어로 섹션
 * - 교회 비전 인트로 메시지
 * - 그라데이션 텍스트 효과
 * - Fade-in 애니메이션
 *
 * @returns 히어로 섹션 JSX
 */
export default function VisionHero() {
  return (
    <section className="relative bg-gradient-to-b from-primary/5 to-background py-20 md:py-28 overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          {/* 페이지 타이틀 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight drop-shadow-[2px_2px_3px_rgba(0,0,0,0.6)]"
          >
            교회비전 & 핵심가치
          </motion.h1>

          {/* 메인 메시지 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 max-w-3xl mx-auto" // space-y-4 제거, 문단 덩어리 간 격차만 둠
          >
            {/* 첫 번째 덩어리 (1~2번째 줄 합침) */}
            <p className="text-lg md:text-xl leading-snug md:leading-normal">
              <span className="font-semibold text-primary">부다페스트한인선교교회</span>는 이 땅에 교회가 없어서 세워진 것이 아니라
              {/* 모바일에서는 줄바꿈, PC에서는 자연스럽게 이어짐 (원하시면 <br/>로 강제 줄바꿈 가능) */}<br />
              <br className="md:hidden" />
              {' '}
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold">
                하나님의 거룩한 부르심과 긴급한 요구
              </span>
              에 의해서 세워진<br /> 비전 공동체입니다.
            </p>

            {/* 두 번째 덩어리 (3~5번째 줄 합침) */}
            <div className="space-y-1"> {/* 이 내부의 줄간격을 아주 좁게 설정 */}
              <p className="text-base md:text-lg text-muted-foreground leading-tight">
                예수님의 다시오실을 기대하며 거룩한 소망을 붙들고{' '}<br />
                <span className="font-semibold text-foreground">
                  <span className="text-primary">힘써 복음을 증거하는</span>{' '}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold">
                    선교적 교회
                  </span>,
                </span>
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-tight">
                그것이 바로 우리 부다페스트한인선교교회의 비전입니다.
              </p>
            </div>
          </motion.div>

          {/* 구분선 */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-8"
          />
        </motion.div>
      </Container>

      {/* 배경 장식 요소 */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
    </section>
  )
}
