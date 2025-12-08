'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/common/Container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Phone, Mail, MessageCircle, ChevronUp } from 'lucide-react'

/**
 * FAQ 데이터
 */
const faqs = [
  {
    question: '처음 방문하면 무엇을 해야 하나요?',
    answer: '예배 후 안내 데스크에서 방문자 기록카드를 작성해 주시면 됩니다. 새가족 담당자가 친절하게 안내해 드립니다.',
  },
  {
    question: '새가족반은 언제 진행되나요?',
    answer: '매월 첫째 주에 개강하며, 주일 오후에 4주 과정으로 진행됩니다. 중간에 합류하셔도 괜찮습니다.',
  },
  {
    question: '예배 복장은 어떻게 해야 하나요?',
    answer: '편안한 복장으로 오시면 됩니다. 격식을 차리지 않으셔도 괜찮습니다.',
  },
  {
    question: '주차는 어디에 하나요?',
    answer: '교회 앞 공용 주차장을 이용하실 수 있습니다. 자세한 위치는 오시는 길 페이지를 참고해 주세요.',
  },
]

/**
 * 연락처 & FAQ 섹션
 * - 자주 묻는 질문
 * - 담당자 연락처
 * - CTA 버튼
 *
 * @returns 연락처 섹션 JSX
 */
export default function NewcomerContact() {
  /**
   * 페이지 상단으로 스크롤 (환영 Hero로 이동)
   */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
            <span className="text-2xl font-bold mr-2">05</span>
            문의하기
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            궁금한 점이 <span className="bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">있으신가요?</span>
          </h2>
          <p className="text-muted-foreground">
            자주 묻는 질문을 확인하시거나 담당자에게 문의해 주세요
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-16">
          {/* FAQ 섹션 */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:border-sky-300 transition-colors"
              >
                <h3 className="font-bold text-lg mb-3 flex items-start gap-2">
                  <MessageCircle className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-muted-foreground leading-relaxed pl-7">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>

          {/* 연락처 섹션 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-sky-50 via-purple-50 to-sky-50 rounded-2xl p-8 md:p-12 border-2 border-sky-200 shadow-xl"
          >
            <div className="text-center space-y-8">
              {/* 제목 */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                  더 궁금하신 점이 있으신가요?
                </h3>
                <p className="text-muted-foreground">
                  새가족 담당자가 친절하게 안내해 드립니다
                </p>
              </div>

              {/* 연락처 정보 */}
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {/* 전화 */}
                <div className="bg-white rounded-xl p-6 shadow-md border border-sky-200">
                  <Phone className="w-8 h-8 text-sky-500 mx-auto mb-3" />
                  <p className="font-semibold mb-2">전화 문의</p>
                  <a
                    href="tel:+36123456789"
                    className="text-sm text-sky-600 hover:text-sky-700 transition-colors font-medium"
                  >
                    +36 12 345 6789
                  </a>
                </div>

                {/* 이메일 */}
                <div className="bg-white rounded-xl p-6 shadow-md border border-purple-200">
                  <Mail className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                  <p className="font-semibold mb-2">이메일 문의</p>
                  <a
                    href="mailto:newcomer@bfgc.com"
                    className="text-sm text-purple-600 hover:text-purple-700 transition-colors font-medium"
                  >
                    newcomer@bfgc.com
                  </a>
                </div>
              </div>

              {/* CTA 버튼 */}
              <div className="pt-4">
                <Button
                  onClick={scrollToTop}
                  size="lg"
                  className="bg-gradient-to-r from-sky-500 to-purple-500 hover:from-sky-600 hover:to-purple-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ChevronUp className="w-5 h-5 mr-2" />
                  처음으로 돌아가기
                </Button>
              </div>

              {/* 추가 안내 */}
              <p className="text-sm text-muted-foreground">
                예배 시간에 직접 방문하셔서 문의하셔도 좋습니다
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
