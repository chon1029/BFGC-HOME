'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/common/Container'
import { OptimizedImage } from '@/components/common/OptimizedImage'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, MapPin } from 'lucide-react'

/**
 * 새가족 환영회 섹션
 * - 환영회 사진
 * - 일정 안내
 *
 * 📷 사진 추가 위치:
 * - 파일: NewcomerWelcome.tsx
 * - 라인: 48 (src 속성)
 * - 경로: /images/newcomer/welcome.jpg (또는 .png, .webp)
 * - 권장 사이즈: 1200x800px
 *
 * @returns 환영회 섹션 JSX
 */
export default function NewcomerWelcome() {
  return (
    <section className="py-16 md:py-24 bg-background">
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
            <span className="text-2xl font-bold mr-2">03</span>
            새가족 환영회
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            함께 <span className="bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">교제</span>하는 시간
          </h2>
        </motion.div>

        {/* 메인 콘텐츠 */}
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 좌측: 이미지 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {/* 📷 여기에 사진을 추가하세요! */}
                <OptimizedImage
                  src="/images/newcomer/welcome.jpg"
                  alt="새가족 환영회"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
                {/* 그라데이션 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* 장식 요소 */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-sky-400 to-purple-500 rounded-full blur-3xl opacity-20 -z-10" />
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-sky-500 rounded-full blur-3xl opacity-20 -z-10" />
            </motion.div>

            {/* 우측: 정보 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* 설명 */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">
                  매월 새가족과 함께하는
                  <br />
                  따뜻한 환영의 시간
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  새가족 환영회는 처음 오신 분들과 교회 가족들이 함께 식사하며 교제하는 시간입니다.
                  편안한 분위기에서 서로를 알아가고, 교회 생활에 대한 궁금한 점을 자유롭게 물어보실 수 있습니다.
                </p>
              </div>

              {/* 일정 정보 */}
              <div className="space-y-4 bg-gradient-to-br from-sky-50 to-purple-50 rounded-xl p-6 border border-sky-200">
                <h4 className="font-bold text-lg mb-4">환영회 일정</h4>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">매월 첫째 주 주일</p>
                    <p className="text-sm text-muted-foreground">정기적으로 진행됩니다</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">예배 후 (약 1시간 30분)</p>
                    <p className="text-sm text-muted-foreground">식사와 교제 시간 포함</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">교회 친교실</p>
                    <p className="text-sm text-muted-foreground">예배 후 안내 받으실 수 있습니다</p>
                  </div>
                </div>
              </div>

              {/* 참여 안내 */}
              <div className="bg-white rounded-xl p-6 border-2 border-dashed border-sky-300">
                <p className="text-sm text-center">
                  <span className="font-semibold text-sky-600">별도 신청 불필요!</span>
                  <br />
                  예배 후 새가족 담당자가 안내해 드립니다
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
