'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/common/Container'
import { OptimizedImage } from '@/components/common/OptimizedImage'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2 } from 'lucide-react'

/**
 * 사진 가이드 단계 데이터 타입
 */
interface GuideStep {
  id: number
  image: string
  title: string
  description: string
}

/**
 * 사진 가이드 6단계 데이터
 *
 * 📝 수정 가능: 각 단계의 title과 description을 실제 내용에 맞게 수정해주세요
 */
const guideSteps: GuideStep[] = [
  {
    id: 1,
    image: '/images/herosection/link-img/location-1.gif',
    title: 'Step 1: \n4번 6번 트램 하차',
    description: '부다페스트 시내를 운행하는 지상전철을 흔히 트램이라고 합니다.트램 4번 혹은 6번을 타고 사진에 보이는대로 베셀리니역(Wesselényi utca)에 내립니다.',
  },
  {
    id: 2,
    image: '/images/herosection/link-img/location-2.gif',
    title: 'Step 2: \n횡단보도 확인',
    description: '주변을 살펴보고 아래의 사진에 보이는 횡단보도를 두 번 건넙니다(세로, 가로 방향).',
  },
  {
    id: 3,
    image: '/images/herosection/link-img/location-3.gif',
    title: 'Step 3: \n횡단보도 건넌 후',
    description: '횡단보도를 두 번 건너고 왼쪽 방향으로 5미터 정도 앞으로 걸어갑니다.',
  },
  {
    id: 4,
    image: '/images/herosection/link-img/location-4.gif',
    title: 'Step 4: \n우측으로 돌면 보이는 전경',
    description: '보도 블럭을 따라 우측 방향으로 진행하면 아래와 같은 거리의 전경이 보입니다.',
  },
  {
    id: 5,
    image: '/images/herosection/link-img/location-5.gif',
    title: 'Step 5: \n주소표지판 확인',
    description: '오른쪽으로 꺾어서 건물의 벽을 살펴보면 아래와 같이 거리명이 적힌 안내표지를 보실 수 있습니다.',
  },
  {
    id: 6,
    image: '/images/herosection/link-img/location-6.gif',
    title: 'Step 6: \n교회 도착',
    description: '약 40-50미터 정도 직진하시면 다음과 같은 교회표지판이 보입니다.문을 열고 들어오시면 예배로 헌신된 선교적 교회, 부다페스트한인선교교회에 입장하실 수 있습니다.',
  },
]

/**
 * 사진 가이드 섹션
 * - 6단계 사진 가이드
 * - 타임라인 스타일
 * - 각 단계별 설명
 *
 * @returns 사진 가이드 섹션 JSX
 */
export default function LocationGuide() {
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
            찾아오시는 방법
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">사진으로</span> 쉽게 찾아오세요
          </h2>
          <p className="text-muted-foreground">
            6단계로 간단하게 교회까지 오실 수 있습니다
          </p>
        </motion.div>

        {/* 안내 메시지 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-gradient-to-r from-sky-50 to-purple-50 rounded-2xl p-8 border border-sky-200 text-center">
            <p className="text-lg leading-relaxed">
              부다페스트 시내를 운행하는 <span className="font-semibold text-sky-600">지상전철</span>을 통해
              편하게 찾아오실 수 있습니다.
              <br className="hidden sm:block" />
              트램 <span className="font-semibold text-purple-600">4번 혹은 6번</span>을 타고
              시내에 보이는 다른 <span className="font-semibold text-sky-600">베셀리니역(Wesselényi utca)</span>에
              내립니다.
            </p>
          </div>
        </motion.div>

        {/* 사진 가이드 타임라인 */}
        <div className="max-w-5xl mx-auto">
          <div className="space-y-12">
            {guideSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* 연결선 (마지막 제외) */}
                {index < guideSteps.length - 1 && (
                  <div className="hidden lg:block absolute left-12 top-24 bottom-0 w-1 bg-gradient-to-b from-sky-400 to-purple-400 -z-10" />
                )}

                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  {/* 좌측: 번호 & 텍스트 */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center gap-4">
                      {/* 번호 아이콘 */}
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sky-400 to-purple-500 flex items-center justify-center shadow-lg shrink-0">
                        <CheckCircle2 className="w-12 h-12 text-white" fill="white" />
                      </div>

                      {/* 제목 */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold whitespace-pre-line">{step.title}</h3>
                      </div>
                    </div>

                    {/* 설명 */}
                    <p className="text-muted-foreground leading-relaxed pl-28 lg:pl-0">
                      {step.description}
                    </p>
                  </div>

                  {/* 우측: 이미지 */}
                  <div className="lg:col-span-7">
                    <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white hover:shadow-2xl transition-shadow duration-300">
                      <OptimizedImage
                        src={step.image}
                        alt={step.title}
                        width={800}
                        height={600}
                        className="w-full h-auto"
                      />
                      {/* 이미지 번호 오버레이 */}
                      <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-purple-500 flex items-center justify-center shadow-lg">
                        <span className="text-2xl font-bold text-white">{step.id}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 도착 안내 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-purple-50 to-sky-50 rounded-xl p-8 border-2 border-purple-200">
            <p className="text-xl font-semibold mb-2">
              🎉 교회에 도착하셨습니다!
            </p>
            <p className="text-sm text-muted-foreground">
              처음 오시는 분은 안내 데스크에서 도움을 받으실 수 있습니다
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
