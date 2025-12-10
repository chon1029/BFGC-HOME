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
    description: '펜데믹 후에도 온라인예배 비중 높음 \n강력한 은혜를 경험하는 현장예배 강화',
    icon: Church,
    position: 'left',
  },
  {
    id: 2,
    title: '다음세대, 청년세대 부흥',
    description: '시대와 문화에 맞는 조직과 운영 시행 \n다음세대, 청년세대를 위한 맞춤 사역',
    icon: Users,
    position: 'left',
  },
  {
    id: 3,
    title: '공동체성 강화',
    description: '개인주의적 성향 강화 \n연합과 협력을 통한 시.지적 흐름',
    icon: Heart,
    position: 'left',
  },
  {
    id: 4,
    title: '선교역량 강화',
    description: '예배와 양육을 통해 훈련된 성도들을 통해 \n힘써 복음을 증거하게 하는 증거공동체',
    icon: Globe,
    position: 'left',
  },
  // 우측
  {
    id: 5,
    title: '신앙교육 및 성도관리',
    description: '강력한 이단들의 공격에 대처할 수 있는 \n신앙교육 영적성장을 위한 양육과 신앙적 관리',
    icon: BookOpen,
    position: 'right',
  },
  {
    id: 6,
    title: '목회적 돌봄을 통한 사회적 책임',
    description: '고령화로 인한 노인에 대한 목회적 돌봄 \n다음세대, 청년세대의 진학/취업/창업지원',
    icon: HandHeart,
    position: 'right',
  },
  {
    id: 7,
    title: '교회 브랜드화',
    description: '개인전도, 축호전도의 힌계(사생활, 개인주의) 찾아가는 교회가 아닌 방문하고 싶은 교회 전환',
    icon: Cross,
    position: 'right',
  },
  {
    id: 8,
    title: '세대에 맞는 프로그램 운영',
    description: '교회 안에 있는 디당한 세대에 맞춤식 프로그램 진행 문화공간을 만들어 다양한 용도로 활용',
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
    <section className="py-16 md:py-24 bg-gradient-to-b from-sky-50/50 to-purple-50/50 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl" />
      </div>

      <Container>
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-sky-500/10 to-purple-500/10 backdrop-blur-md border border-sky-500/20 shadow-lg mb-4">
            <span className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">03</span>
            <span className="text-base font-bold text-slate-800 dark:text-slate-200">사역영역</span>
          </div>
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
                  className="flex items-start gap-4 p-6 bg-white/60 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-all border border-sky-100 hover:border-sky-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <area.icon className="w-6 h-6 text-sky-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2 text-slate-800">{area.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
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
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-sky-500 to-purple-600 flex items-center justify-center shadow-2xl z-10 relative">
                  <div className="text-center text-white p-4">
                    <p className="text-xs font-semibold mb-1 opacity-90">부다페스트한인선교교회</p>
                    <p className="text-sm font-bold leading-tight">
                      예배가 중심이 된
                      <br />
                      선교적인 교회
                    </p>
                  </div>
                </div>

                {/* 펄스 애니메이션 */}
                <div className="absolute inset-0 rounded-full bg-sky-500/30 animate-ping" />
                <div className="absolute -inset-4 rounded-full border border-sky-200/50 animate-pulse" />
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
                  className="flex items-start gap-4 p-6 bg-white/60 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-all border border-purple-100 hover:border-purple-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <area.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2 text-slate-800">{area.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
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
              <div className="w-56 h-56 rounded-full bg-gradient-to-br from-sky-500 to-purple-600 flex items-center justify-center shadow-2xl relative">
                <div className="text-center text-white p-6 z-10">
                  <p className="text-sm font-semibold mb-2 opacity-90">부다페스트한인선교교회</p>
                  <p className="text-base font-bold leading-tight">
                    예배가 중심이 된
                    <br />
                    선교적인 교회
                  </p>
                </div>
                <div className="absolute inset-0 rounded-full bg-sky-500/30 animate-ping" />
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
                  className={`p-6 bg-white/60 backdrop-blur-md rounded-xl shadow-md border ${area.position === 'left' ? 'border-sky-100' : 'border-purple-100'
                    }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${area.position === 'left' ? 'bg-sky-100' : 'bg-purple-100'
                        }`}
                    >
                      <area.icon
                        className={`w-6 h-6 ${area.position === 'left' ? 'text-sky-600' : 'text-purple-600'
                          }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-base mb-2 text-slate-800">{area.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
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
