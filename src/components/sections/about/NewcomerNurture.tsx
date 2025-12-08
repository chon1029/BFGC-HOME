'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/common/Container'
import { OptimizedImage } from '@/components/common/OptimizedImage'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Calendar, Users, CheckCircle2 } from 'lucide-react'

/**
 * 양육 커리큘럼 데이터
 */
const curriculum = [
  {
    week: 1,
    title: '교회 소개 및 비전',
    description: '교회의 역사, 비전, 핵심가치를 배웁니다',
  },
  {
    week: 2,
    title: '신앙의 기초',
    description: '구원, 성경, 기도 등 기본 신앙을 배웁니다',
  },
  {
    week: 3,
    title: '교회 생활 안내',
    description: '예배, 헌금, 봉사 등 교회 생활을 배웁니다',
  },
  {
    week: 4,
    title: '소그룹 연결',
    description: '나에게 맞는 소그룹을 찾고 연결됩니다',
  },
]

/**
 * 새가족 양육 프로그램 섹션
 * - 양육 프로그램 사진
 * - 커리큘럼 안내
 *
 * 📷 사진 추가 위치:
 * - 파일: NewcomerNurture.tsx
 * - 라인: 68 (src 속성)
 * - 경로: /images/newcomer/nurture.jpg (또는 .png, .webp)
 * - 권장 사이즈: 1200x800px
 *
 * @returns 양육 프로그램 섹션 JSX
 */
export default function NewcomerNurture() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-purple-50/30">
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
            <span className="text-2xl font-bold mr-2">04</span>
            새가족 양육 프로그램
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">4주 과정</span>으로 배우는 신앙 생활
          </h2>
        </motion.div>

        {/* 메인 콘텐츠 */}
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 좌측: 정보 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 lg:order-2"
            >
              {/* 설명 */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">
                  방문자 기록카드 작성부터
                  <br />
                  소그룹 연결까지
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  새가족 양육반은 교회 생활에 필요한 모든 것을 배우는 4주 과정입니다.
                  신앙의 기초부터 교회 생활 전반을 체계적으로 안내받으실 수 있습니다.
                </p>
              </div>

              {/* 프로그램 정보 */}
              <div className="space-y-4 bg-white rounded-xl p-6 border border-purple-200 shadow-md">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">매주 주일 오후</p>
                    <p className="text-sm text-muted-foreground">4주 과정 (월 1회 개강)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">소그룹 형태</p>
                    <p className="text-sm text-muted-foreground">친밀한 분위기에서 진행됩니다</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">교재 무료 제공</p>
                    <p className="text-sm text-muted-foreground">별도 준비물 없이 참여하세요</p>
                  </div>
                </div>
              </div>

              {/* 커리큘럼 */}
              <div className="space-y-3">
                <h4 className="font-bold text-lg">주차별 커리큘럼</h4>
                {curriculum.map((item, index) => (
                  <motion.div
                    key={item.week}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-gradient-to-r from-sky-50 to-purple-50 rounded-lg border border-sky-200"
                  >
                    <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">
                        {item.week}주차: {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 우측: 이미지 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="relative lg:order-1"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {/* 📷 여기에 사진을 추가하세요! */}
                <OptimizedImage
                  src="/images/newcomer/nurture.jpg"
                  alt="새가족 양육 프로그램"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
                {/* 그라데이션 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* 장식 요소 */}
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-sky-500 rounded-full blur-3xl opacity-20 -z-10" />
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-sky-400 to-purple-500 rounded-full blur-3xl opacity-20 -z-10" />
            </motion.div>
          </div>

          {/* 등록 안내 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-gradient-to-r from-purple-50 to-sky-50 rounded-xl p-6 border border-purple-200">
              <p className="text-sm">
                새가족반 등록을 원하시면
                <br className="sm:hidden" />
                <span className="font-semibold text-purple-600"> 새가족 담당자</span>에게 문의해 주세요
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
