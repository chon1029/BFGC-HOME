'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/common/Container'
import { Badge } from '@/components/ui/badge'
import { FileText, Gift, BookOpen, Heart } from 'lucide-react'

/**
 * 등록 절차 단계 데이터 타입
 */
interface Step {
  id: number
  title: string
  description: string
  icon: React.ElementType
  color: string
}

/**
 * 등록 절차 4단계 데이터
 */
const steps: Step[] = [
  {
    id: 1,
    title: '방문자 기록카드 작성',
    description: '예배 후 안내 데스크에서 방문자 기록카드를 작성해 주세요. 간단한 인적사항과 연락처를 적어주시면 됩니다.',
    icon: FileText,
    color: 'from-sky-400 to-sky-500',
  },
  {
    id: 2,
    title: '환영 인사 및 선물 증정',
    description: '담당 목회자와 새가족 팀이 따뜻하게 인사드리며, 감사의 마음을 담은 작은 선물을 드립니다.',
    icon: Gift,
    color: 'from-purple-400 to-purple-500',
  },
  {
    id: 3,
    title: '새가족반 안내',
    description: '교회 소개와 신앙 기초를 배우는 새가족반(4주 과정)에 초대합니다. 교회 생활에 필요한 모든 것을 안내받으실 수 있습니다.',
    icon: BookOpen,
    color: 'from-sky-500 to-purple-400',
  },
  {
    id: 4,
    title: '지속적인 관심과 돌봄',
    description: '새가족 담당 목회자가 정기적으로 연락드리며, 소그룹 연결과 교회 생활 적응을 도와드립니다.',
    icon: Heart,
    color: 'from-purple-500 to-sky-400',
  },
]

/**
 * 등록 절차 안내 섹션 (4단계)
 *
 * @returns 등록 절차 섹션 JSX
 */
export default function RegistrationSteps() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <Container>
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 text-base px-6 py-2">
            <span className="text-2xl font-bold mr-2">01</span>
            등록 절차 안내
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            간단한 <span className="bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">4단계</span>로 등록하세요
          </h2>
          <p className="text-muted-foreground">
            처음 방문하신 분들을 위한 친절한 안내 절차입니다
          </p>
        </motion.div>

        {/* 타임라인 (데스크톱) */}
        <div className="hidden lg:block max-w-6xl mx-auto">
          <div className="relative">
            {/* 연결선 */}
            <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-purple-400 to-sky-400" />

            {/* 단계 카드 */}
            <div className="grid grid-cols-4 gap-8 relative">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* 아이콘 원 */}
                  <div className="flex justify-center mb-6">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg relative z-10`}>
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* 카드 */}
                  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                    <div className="text-center mb-4">
                      <span className="text-4xl font-bold text-gray-200">
                        {String(step.id).padStart(2, '0')}
                      </span>
                      <h3 className="text-lg font-bold mt-2">{step.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* 모바일/태블릿 레이아웃 */}
        <div className="lg:hidden space-y-6 max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* 연결선 (마지막 제외) */}
              {index < steps.length - 1 && (
                <div className="absolute left-10 top-20 bottom-0 w-1 bg-gradient-to-b from-sky-400 to-purple-400 -z-10" />
              )}

              <div className="flex gap-4">
                {/* 아이콘 */}
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg shrink-0`}>
                  <step.icon className="w-10 h-10 text-white" />
                </div>

                {/* 카드 */}
                <div className="flex-1 bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <div className="mb-3">
                    <span className="text-3xl font-bold text-gray-200">
                      {String(step.id).padStart(2, '0')}
                    </span>
                    <h3 className="text-lg font-bold mt-1">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
