'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/common/Container'
import { Badge } from '@/components/ui/badge'
import { Car, Bus, MapPin, Info } from 'lucide-react'

/**
 * 추가 안내 정보 데이터 타입
 */
interface InfoItem {
  id: number
  title: string
  description: string
  icon: React.ElementType
  color: string
  details: string[]
}

/**
 * 추가 안내 정보 데이터
 */
const infos: InfoItem[] = [
  {
    id: 1,
    title: '예배 참석 안내',
    description: '처음 오시는 분들을 위한 안내입니다',
    icon: Info,
    color: 'from-sky-400 to-sky-500',
    details: [
      '예배 30분 전 도착을 권장합니다',
      '예배 전 기도 시간이 있습니다',
      '안내 데스크에서 도움을 받으실 수 있습니다',
      '편안한 복장으로 오셔도 괜찮습니다',
    ],
  },
  {
    id: 2,
    title: '주차 안내',
    description: '교회 주차 정보를 안내합니다',
    icon: Car,
    color: 'from-purple-400 to-purple-500',
    details: [
      '교회 앞 공용 주차장을 이용하실 수 있습니다',
      '주일에는 주차 공간이 제한적일 수 있습니다',
      '가급적 대중교통을 이용해 주세요',
      '자세한 위치는 오시는 길 페이지를 참고하세요',
    ],
  },
  {
    id: 3,
    title: '교통편 안내',
    description: '교회 오시는 방법을 안내합니다',
    icon: Bus,
    color: 'from-sky-500 to-purple-400',
    details: [
      '지하철/버스 등 대중교통 이용 가능',
      '교회 근처 정류장에서 도보 5분',
      '자세한 경로는 오시는 길 페이지 참고',
      '문의사항은 교회 사무실로 연락주세요',
    ],
  },
  {
    id: 4,
    title: '예배당 위치',
    description: '예배당 위치 정보입니다',
    icon: MapPin,
    color: 'from-purple-500 to-sky-400',
    details: [
      '본 예배당: 주일예배, 금요기도회, 여호수아청년부',
      '살롬 성전: 청소 키즈',
      '건물 입구에서 안내 표지판을 따라오세요',
      '처음 오시는 분은 안내원에게 문의하세요',
    ],
  },
]

/**
 * 추가 안내 정보 섹션
 * - 예배 참석 안내
 * - 주차 정보
 * - 교통편 안내
 * - 예배당 위치
 *
 * @returns 추가 안내 섹션 JSX
 */
export default function ScheduleInfo() {
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
            <span className="text-2xl font-bold mr-2">03</span>
            방문 안내
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            처음 오시는 분들을 위한 <span className="bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">안내</span>
          </h2>
          <p className="text-muted-foreground">
            예배 참석에 필요한 정보를 확인하세요
          </p>
        </motion.div>

        {/* 안내 카드 그리드 */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {infos.map((info, index) => (
              <motion.div
                key={info.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-sky-300"
              >
                {/* 아이콘 & 제목 */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center shrink-0`}>
                    <info.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{info.title}</h3>
                    <p className="text-sm text-muted-foreground">{info.description}</p>
                  </div>
                </div>

                {/* 구분선 */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-6" />

                {/* 상세 정보 */}
                <ul className="space-y-3">
                  {info.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${info.color} shrink-0 mt-2`} />
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* 연락처 안내 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-gradient-to-r from-purple-50 to-sky-50 rounded-xl p-6 border border-purple-200">
              <p className="text-sm">
                더 궁금하신 사항은
                <br className="sm:hidden" />
                <span className="font-semibold text-purple-600"> 교회 사무실</span>로 문의해 주세요
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
