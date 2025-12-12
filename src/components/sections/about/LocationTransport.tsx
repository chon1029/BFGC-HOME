'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/common/Container'
import { Badge } from '@/components/ui/badge'
import { TramFront, Train, Car } from 'lucide-react'

/**
 * 교통편 정보 데이터 타입
 */
interface TransportItem {
  id: number
  type: string
  route: string
  station: string
  description: string
  icon: React.ElementType
  color: string
}

/**
 * 교통편 정보 데이터
 */
const transports: TransportItem[] = [
  {
    id: 1,
    type: '트램 (Villamos)',
    route: '4호선, 6호선',
    station: 'Wesselényi utca',
    description: '트램을 이용하실 경우 4호선 또는 6호선을 타고 Wesselényi utca 역에서 하차하시면 됩니다.',
    icon: TramFront,
    color: 'from-sky-400 to-sky-500',
  },
  {
    id: 2,
    type: '지하철 (Metro)',
    route: 'M2선 (빨간선)',
    station: 'Blaha Lujza tér',
    description: '지하철을 이용하실 경우 M2 빨간선을 타고 Blaha Lujza tér 역에서 하차하신 후 도보로 이동하시면 됩니다.',
    icon: Train,
    color: 'from-purple-400 to-purple-500',
  },
  {
    id: 3,
    type: '자가용 (개인 차량)',
    route: '내비게이션 입력',
    station: '1073 Budapest, Ósvát u.16',
    description: '개인 차량으로 오실 경우 주소를 내비게이션에 입력하시면 됩니다. 교회 앞 공용 주차장을 이용하실 수 있습니다.',
    icon: Car,
    color: 'from-sky-500 to-purple-400',
  },
]

/**
 * 교통편 안내 섹션
 * - 3가지 교통편 (트램, 지하철, 자가용)
 * - 카드 스타일
 *
 * @returns 교통편 안내 섹션 JSX
 */
export default function LocationTransport() {
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
            교통편 안내
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">다양한 교통편</span>으로 오실 수 있습니다
          </h2>
          <p className="text-muted-foreground">
            부다페스트한인선교교회는 시내 중심부에 위치하여 대중교통으로 쉽게 오실 수 있습니다
          </p>
        </motion.div>

        {/* 교통편 카드 */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {transports.map((transport, index) => (
              <motion.div
                key={transport.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-sky-300"
              >
                {/* 상단 색상 바 */}
                <div className={`h-2 bg-gradient-to-r ${transport.color}`} />

                {/* 카드 콘텐츠 */}
                <div className="p-4 space-y-6">
                  {/* 아이콘 */}
                  <div className="flex justify-center">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${transport.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <transport.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* 제목 */}
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold group-hover:text-sky-500 transition-colors">
                      {transport.type}
                    </h3>
                    <p className="text-2xl font-bold text-sky-600">
                      {transport.route}
                    </p>
                  </div>

                  {/* 구분선 */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

                  {/* 역/주소 */}
                  <div className="text-center">
                    <p className="text-lg font-semibold text-purple-600">
                      {transport.station}
                    </p>
                  </div>

                  {/* 설명 */}
                  <p className="text-sm text-muted-foreground leading-relaxed text-center">
                    {transport.description}
                  </p>
                </div>

                {/* 호버 효과 */}
                <div className={`absolute inset-0 bg-gradient-to-br ${transport.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
              </motion.div>
            ))}
          </div>

          {/* 추가 안내 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-gradient-to-r from-sky-50 to-purple-50 rounded-xl p-6 border border-sky-200">
              <p className="text-sm">
                <span className="font-semibold text-sky-600">부다페스트 시내를 운행하는 지상전철을 통해</span>
                <br className="hidden sm:block" />
                편하게 찾아오실 수 있습니다
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
