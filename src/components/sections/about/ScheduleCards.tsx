'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/common/Container'
import { Badge } from '@/components/ui/badge'
import { Church, Users, Flame, Heart, Clock, MapPin } from 'lucide-react'

/**
 * 예배 정보 데이터 타입
 */
interface ScheduleItem {
  id: number
  name: string
  time: string
  location: string
  description: string
  icon: React.ElementType
  color: string
}

/**
 * 예배 시간표 데이터
 */
const schedules: ScheduleItem[] = [
  {
    id: 1,
    name: '주일 예배',
    time: '오후 3:00',
    location: '본 예배당',
    description: '온 가족이 함께 모여 하나님께 예배드리는 주일 대예배입니다. 말씀과 찬양으로 하나님을 경배합니다.',
    icon: Church,
    color: 'from-sky-400 to-sky-500',
  },
  {
    id: 2,
    name: '청소 키즈',
    time: '오후 3:00',
    location: '살롬 성전',
    description: '어린이들을 위한 특별한 예배입니다. 재미있는 찬양과 말씀으로 신앙의 기초를 배웁니다.',
    icon: Users,
    color: 'from-purple-400 to-purple-500',
  },
  {
    id: 3,
    name: '금요 기도회',
    time: '저녁 7:00',
    location: '본 예배당',
    description: '치유와 회복의 기도회입니다. 성도들이 함께 모여 간절히 기도하며 하나님의 응답을 경험합니다.',
    icon: Flame,
    color: 'from-sky-500 to-purple-400',
  },
  {
    id: 4,
    name: '여호수아 청년부',
    time: '매월 첫째 주 토요일 오후 5:00',
    location: '본 예배당',
    description: '청년들의 예배와 교제의 시간입니다. 함께 찬양하고 말씀을 나누며 신앙의 동역자로 성장합니다.',
    icon: Heart,
    color: 'from-purple-500 to-sky-400',
  },
]

/**
 * 예배 시간표 카드 섹션
 * - 4개 예배 카드 (2x2 그리드)
 * - 각 예배별 상세 설명
 *
 * @returns 시간표 섹션 JSX
 */
export default function ScheduleCards() {
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
            <span className="text-2xl font-bold mr-2">02</span>
            예배 시간표
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            함께 <span className="bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">예배</span>드리는 시간
          </h2>
          <p className="text-muted-foreground">
            각 예배의 시간과 장소를 확인하세요
          </p>
        </motion.div>

        {/* 예배 카드 그리드 */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {schedules.map((schedule, index) => (
              <motion.div
                key={schedule.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-sky-300"
              >
                {/* 상단 색상 바 */}
                <div className={`h-2 bg-gradient-to-r ${schedule.color}`} />

                {/* 카드 콘텐츠 */}
                <div className="p-8 space-y-6">
                  {/* 아이콘 & 제목 */}
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${schedule.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <schedule.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold group-hover:text-sky-500 transition-colors">
                        {schedule.name}
                      </h3>
                    </div>
                  </div>

                  {/* 시간 & 장소 */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Clock className="w-5 h-5 text-sky-500 shrink-0" />
                      <span className="font-semibold text-foreground">{schedule.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="w-5 h-5 text-purple-500 shrink-0" />
                      <span className="font-semibold text-foreground">{schedule.location}</span>
                    </div>
                  </div>

                  {/* 구분선 */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

                  {/* 설명 */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {schedule.description}
                  </p>
                </div>

                {/* 호버 효과 그라데이션 */}
                <div className={`absolute inset-0 bg-gradient-to-br ${schedule.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
              </motion.div>
            ))}
          </div>

          {/* 추가 안내 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-gradient-to-r from-sky-50 to-purple-50 rounded-xl p-6 border border-sky-200">
              <p className="text-sm text-muted-foreground">
                예배 30분 전에 도착하셔서 기도로 예배를 준비하시기 바랍니다
                <br className="hidden sm:block" />
                <span className="font-semibold text-sky-600">처음 오시는 분</span>들은 안내 데스크에서 도움을 받으실 수 있습니다
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
