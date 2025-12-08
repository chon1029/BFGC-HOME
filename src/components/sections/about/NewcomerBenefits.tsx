'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/common/Container'
import { Badge } from '@/components/ui/badge'
import { Users, GraduationCap, Coffee, UserCheck, MapPin } from 'lucide-react'

/**
 * 새가족 혜택 데이터 타입
 */
interface Benefit {
  id: number
  title: string
  description: string
  icon: React.ElementType
  color: string
}

/**
 * 새가족 혜택/프로그램 데이터
 */
const benefits: Benefit[] = [
  {
    id: 1,
    title: '새가족 환영회',
    description: '매월 첫째 주 예배 후 새가족 환영회를 진행합니다. 따뜻한 식사와 교제의 시간을 통해 교회 가족들과 만나보세요.',
    icon: Coffee,
    color: 'from-sky-400 to-sky-500',
  },
  {
    id: 2,
    title: '새가족 양육 프로그램',
    description: '4주 과정의 새가족반을 통해 교회 소개, 신앙 기초, 교회 생활 안내를 받으실 수 있습니다.',
    icon: GraduationCap,
    color: 'from-purple-400 to-purple-500',
  },
  {
    id: 3,
    title: '소그룹 연결',
    description: '나이와 관심사에 맞는 소그룹(셀)에 연결되어 깊이 있는 신앙 생활과 따뜻한 교제를 나눌 수 있습니다.',
    icon: Users,
    color: 'from-sky-500 to-purple-400',
  },
  {
    id: 4,
    title: '멘토링 프로그램',
    description: '믿음의 선배들이 1:1 또는 소그룹으로 신앙 생활을 도와드리며, 궁금한 점을 편하게 물어보실 수 있습니다.',
    icon: UserCheck,
    color: 'from-purple-500 to-sky-400',
  },
  {
    id: 5,
    title: '교회 투어',
    description: '교회 건물과 주요 시설을 안내받고, 각 부서와 사역을 소개받으실 수 있습니다.',
    icon: MapPin,
    color: 'from-sky-400 to-purple-500',
  },
]

/**
 * 새가족 혜택/프로그램 섹션
 *
 * @returns 혜택 섹션 JSX
 */
export default function NewcomerBenefits() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-sky-50/30">
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
            <span className="text-2xl font-bold mr-2">02</span>
            새가족 혜택
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            새가족을 위한 <span className="bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">특별한 혜택</span>
          </h2>
          <p className="text-muted-foreground">
            여러분의 신앙 생활을 위해 준비한 다양한 프로그램입니다
          </p>
        </motion.div>

        {/* 혜택 카드 그리드 */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-sky-200"
              >
                {/* 아이콘 */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>

                {/* 제목 */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-sky-500 transition-colors">
                  {benefit.title}
                </h3>

                {/* 설명 */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>

                {/* 호버 효과 그라데이션 */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
              </motion.div>
            ))}
          </div>

          {/* 추가 안내 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-gradient-to-r from-sky-50 to-purple-50 rounded-xl p-6 border border-sky-200">
              <p className="text-sm text-muted-foreground">
                모든 프로그램은 <span className="font-semibold text-sky-600">무료</span>로 제공되며,
                <br className="hidden sm:block" />
                참여를 원하시면 새가족 담당자에게 문의해 주세요
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
