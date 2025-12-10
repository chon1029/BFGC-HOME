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
    color: 'bg-sky-500',
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
    color: 'bg-violet-500',
  },
  {
    id: 4,
    title: '목회적돌봄',
    description: '고령화 사회 속에서 행복한 노년과 존엄한 임종을 맞이하도록 책임 있는 목회적 돌봄',
    color: 'bg-fuchsia-500',
  },
]

export default function CoreValues() {
  const [activeValue, setActiveValue] = useState(0)

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-sky-500/5">
      <Container>
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-sky-500/10 to-purple-500/10 backdrop-blur-md border border-sky-500/20 shadow-lg mb-4">
            <span className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">02</span>
            <span className="text-base font-bold text-slate-800 dark:text-slate-200">핵심가치</span>
          </div>
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
                      ? 'border-sky-500 bg-gradient-to-r from-sky-500 to-purple-500 text-white shadow-lg'
                      : 'border-gray-200 bg-white hover:border-sky-300'
                  )}
                >
                  <div
                    className={cn(
                      'w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl shrink-0 transition-colors',
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
            <div className="col-span-2 flex justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeValue}
                  initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
                  animate={{ clipPath: 'inset(0 0 0 0)', opacity: 1 }}
                  exit={{ clipPath: 'inset(0 0 0 100%)', opacity: 0 }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                  className="text-6xl text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-purple-500 font-bold"
                >
                  »
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 우측: 카드 */}
            <div className="col-span-5 h-full min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeValue}
                  initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
                  animate={{ clipPath: 'inset(0 0 0 0)', opacity: 1 }}
                  exit={{ clipPath: 'inset(0 0 0 100%)', opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-full rounded-3xl"
                >
                  {/* 카드 컨테이너 (오로라 글래스 스타일) */}
                  <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl bg-white/80 backdrop-blur-xl border border-white/50">

                    {/* 오로라 배경 효과 */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                    {/* 큰 숫자 배경 */}
                    <div className="absolute -bottom-8 -right-8 text-[10rem] font-black text-slate-900/10 select-none leading-none tracking-tighter">
                      {String(activeValue + 1).padStart(2, '0')}
                    </div>

                    {/* 장식 아이콘 */}
                    <div className="absolute top-8 right-8 text-sky-500/40">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                      </svg>
                    </div>

                    {/* 콘텐츠 */}
                    <div className="relative z-10 h-full flex flex-col justify-center p-10 space-y-6">
                      <div className="space-y-2">
                        <span className={cn(
                          "inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/50 backdrop-blur-sm border border-white/20 shadow-sm",
                          coreValues[activeValue].color.replace('bg-', 'text-').replace('500', '600')
                        )}>
                          Core Value {String(activeValue + 1).padStart(2, '0')}
                        </span>
                        <h3 className="text-3xl md:text-4xl font-bold text-slate-800">
                          {coreValues[activeValue].title}
                        </h3>
                      </div>

                      <div className="w-12 h-1 rounded-full bg-gradient-to-r from-sky-500 to-purple-500" />

                      <p className="text-lg text-slate-600 leading-relaxed font-medium">
                        {coreValues[activeValue].description}
                      </p>
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
