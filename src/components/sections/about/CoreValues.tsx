'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/common/Container'
import { OptimizedImage } from '@/components/common/OptimizedImage'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

/**
 * 핵심가치 데이터 타입
 */
interface CoreValue {
  id: number
  title: string                    // 핵심가치 제목
  description: string              // 상세 설명
  color: string                    // 버튼 색상
}

/**
 * 핵심가치 데이터
 */
const coreValues: CoreValue[] = [
  {
    id: 1,
    title: '영성회복',
    description: '세상의 가치가 아닌 천국의 가치를 우선으로 하는 복음주의 신앙의 회복',
    color: 'bg-blue-500',
  },
  {
    id: 2,
    title: '공동체성회복',
    description: '예수님의 재림을 준비하는 선교적 교회 공동체의 가치를 공유',
    color: 'bg-purple-500',
  },
  {
    id: 3,
    title: '지속가능교회',
    description: '지속가능을 위해 다음세대와 청년세대를 위한 구체적이고 집약적인 사역 전개',
    color: 'bg-indigo-500',
  },
  {
    id: 4,
    title: '목회적돌봄',
    description: '고령화 사회 속에서 행복한 노년과 존엄한 임종을 맞이하도록 책임 있는 목회적 돌봄',
    color: 'bg-teal-500',
  },
]

/**
 * 핵심가치 섹션 (섹션 02)
 * - 4개 원형 버튼 (좌측)
 * - 인터랙티브 카드 전환 (우측)
 * - 탭 인터페이스
 *
 * @returns 핵심가치 섹션 JSX
 */
export default function CoreValues() {
  const [activeValue, setActiveValue] = useState(0)

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-primary/5">
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
            <span className="text-2xl font-bold mr-2">02</span>
            핵심가치
          </Badge>
          <p className="text-sm text-muted-foreground">부다페스트한인선교교회</p>
        </motion.div>

        {/* 메인 콘텐츠 */}
        <div className="max-w-6xl mx-auto">
          {/* 데스크톱 레이아웃 */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-center">
            {/* 좌측: 원형 버튼 */}
            <div className="col-span-5 space-y-4">
              {coreValues.map((value, index) => (
                <motion.button
                  key={value.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setActiveValue(index)}
                  className={cn(
                    'w-full flex items-center gap-4 p-6 rounded-2xl transition-all duration-300',
                    'border-2 hover:scale-105',
                    activeValue === index
                      ? 'border-primary bg-primary text-white shadow-lg'
                      : 'border-gray-200 bg-white hover:border-primary/50'
                  )}
                >
                  <div
                    className={cn(
                      'w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl shrink-0',
                      activeValue === index ? 'bg-white/20' : value.color
                    )}
                  >
                    {String(value.id).padStart(2, '0')}
                  </div>
                  <span className="text-lg font-semibold">{value.title}</span>
                </motion.button>
              ))}
            </div>

            {/* 중앙: 화살표 */}
            <div className="col-span-2 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-6xl text-primary font-bold"
              >
                »
              </motion.div>
            </div>

            {/* 우측: 카드 */}
            <div className="col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeValue}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  {/* 리본 카드 배경 이미지 */}
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <OptimizedImage
                      src="/images/vision/value-card.png"
                      alt={coreValues[activeValue].title}
                      width={500}
                      height={300}
                      className="w-full h-auto"
                    />

                    {/* 텍스트 오버레이 */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90 flex items-center justify-center p-8">
                      <div className="text-center text-white space-y-4">
                        <h3 className="text-3xl font-bold">
                          {activeValue + 1}. {coreValues[activeValue].title}
                        </h3>
                        <p className="text-lg leading-relaxed">
                          {coreValues[activeValue].description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* 모바일/태블릿 레이아웃 */}
          <div className="lg:hidden space-y-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-primary/10"
              >
                {/* 버튼 헤더 */}
                <button
                  onClick={() => setActiveValue(index)}
                  className={cn(
                    'w-full flex items-center gap-4 p-6 transition-colors',
                    activeValue === index ? 'bg-primary text-white' : 'bg-white'
                  )}
                >
                  <div
                    className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0',
                      activeValue === index ? 'bg-white/20' : value.color
                    )}
                  >
                    {String(value.id).padStart(2, '0')}
                  </div>
                  <span className="text-lg font-semibold text-left">{value.title}</span>
                </button>

                {/* 확장 콘텐츠 */}
                <AnimatePresence>
                  {activeValue === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
                        <p className="text-base leading-relaxed text-foreground">
                          {value.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
