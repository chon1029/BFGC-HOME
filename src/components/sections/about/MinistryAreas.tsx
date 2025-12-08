'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/common/Container'
import { Badge } from '@/components/ui/badge'
import {
  Church,
  Users,
  Heart,
  Globe,
  BookOpen,
  HandHeart,
  Cross,
  Sparkles,
} from 'lucide-react'

/**
 * 사역 영역 데이터 타입
 */
interface MinistryArea {
  id: number
  title: string                    // 사역 제목
  description: string              // 상세 설명
  icon: React.ElementType          // 아이콘 컴포넌트
  position: 'left' | 'right'       // 위치 (좌측/우측)
}

/**
 * 사역 영역 데이터
 */
const ministryAreas: MinistryArea[] = [
  // 좌측
  {
    id: 1,
    title: '은혜 충만한 예배',
    description: '만세만 주께는 은혜만에배가 바로 높음을 강력한 은혜를 강렬하는 은혜예배',
    icon: Church,
    position: 'left',
  },
  {
    id: 2,
    title: '다음세대, 청년세대 부흥',
    description: '새대인 운동에 믿는 주직과 운영 시험 다음세대, 청년세대를 위한 맞춤 시역',
    icon: Users,
    position: 'left',
  },
  {
    id: 3,
    title: '공동체성 강화',
    description: '개인주의적 성향 강화와 역량과 협력을 통한 시.지적 흐름',
    icon: Heart,
    position: 'left',
  },
  {
    id: 4,
    title: '선교열망 강화',
    description: '예배인 양육을 통해 순전한 성도들을 통해 세계 도재를 향이가 결박 복음을 증거하는 증거 끈들에',
    icon: Globe,
    position: 'left',
  },
  // 우측
  {
    id: 5,
    title: '신앙교육 및 성도관리',
    description: '강렬한이 대든의 공직에 내사회 수잎는 신앙교육 영적 성장을 위한 영농대 산업과리',
    icon: BookOpen,
    position: 'right',
  },
  {
    id: 6,
    title: '목회적 돌봄을 통한 사회적 책임',
    description: '고령화로 인하는 오랜데 대한 목적적 통합 교회로 사회 속에서 행적과 노연과 존업안 입종을 맛이하도록 책임 있는 목회적 통합',
    icon: HandHeart,
    position: 'right',
  },
  {
    id: 7,
    title: '교회 보편도상',
    description: '개인주도, 목중저도의 힌개에 사랑과 개인주의 책이가는 교회가 아닌 방평하고 성온 교회로 전환',
    icon: Cross,
    position: 'right',
  },
  {
    id: 8,
    title: '세대에 맞는 프로그램 운영',
    description: '교회 안에 있는 디당한 세대에 맞춤식 프로그램 진행 문화적글을 민여이되장한 용도로 활용',
    icon: Sparkles,
    position: 'right',
  },
]

/**
 * 사역영역 섹션 (섹션 03)
 * - 중앙 원형 강조
 * - 방사형 레이아웃
 * - 좌우 8개 사역 영역
 *
 * @returns 사역영역 섹션 JSX
 */
export default function MinistryAreas() {
  const leftAreas = ministryAreas.filter((area) => area.position === 'left')
  const rightAreas = ministryAreas.filter((area) => area.position === 'right')

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
            <span className="text-2xl font-bold mr-2">03</span>
            사역영역
          </Badge>
          <p className="text-sm text-muted-foreground">부다페스트한인선교교회</p>
        </motion.div>

        {/* 메인 콘텐츠 */}
        <div className="max-w-7xl mx-auto">
          {/* 데스크톱 레이아웃 */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-center">
            {/* 좌측 사역 영역 */}
            <div className="col-span-5 space-y-6">
              {leftAreas.map((area, index) => (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-primary/10"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <area.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{area.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 중앙 원형 */}
            <div className="col-span-2 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl">
                  <div className="text-center text-white p-4">
                    <p className="text-xs font-semibold mb-1">부다페스트한인선교교회</p>
                    <p className="text-sm font-bold leading-tight">
                      예배가 중심이 된
                      <br />
                      선교적인 교회
                    </p>
                  </div>
                </div>

                {/* 펄스 애니메이션 */}
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
              </motion.div>
            </div>

            {/* 우측 사역 영역 */}
            <div className="col-span-5 space-y-6">
              {rightAreas.map((area, index) => (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-primary/10"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <area.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{area.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 모바일/태블릿 레이아웃 */}
          <div className="lg:hidden space-y-8">
            {/* 중앙 원형 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <div className="w-56 h-56 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl">
                <div className="text-center text-white p-6">
                  <p className="text-sm font-semibold mb-2">부다페스트한인선교교회</p>
                  <p className="text-base font-bold leading-tight">
                    예배가 중심이 된
                    <br />
                    선교적인 교회
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 전체 사역 영역 (세로 나열) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ministryAreas.map((area, index) => (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="p-6 bg-white rounded-xl shadow-md border border-primary/10"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${area.position === 'left' ? 'bg-primary/10' : 'bg-accent/10'
                        }`}
                    >
                      <area.icon
                        className={`w-6 h-6 ${area.position === 'left' ? 'text-primary' : 'text-accent'
                          }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-base mb-2">{area.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
