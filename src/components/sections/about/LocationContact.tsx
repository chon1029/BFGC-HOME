'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/common/Container'
import { Badge } from '@/components/ui/badge'
import { Phone, Mail, Clock, Car, MessageCircle } from 'lucide-react'

/**
 * 추가 정보 데이터 타입
 */
interface InfoItem {
  icon: React.ElementType
  title: string
  content: string
  color: string
}

/**
 * 추가 정보 데이터
 */
const infos: InfoItem[] = [
  {
    icon: Phone,
    title: '전화 문의',
    content: '+36 20 320 1595',
    color: 'from-sky-400 to-sky-500',
  },
  {
    icon: Mail,
    title: '이메일',
    content: 'bfgc1004@gmail.com',
    color: 'from-purple-400 to-purple-500',
  },
  {
    icon: Clock,
    title: '사무실 운영 시간',
    content: '평일 10:00 - 16:00',
    color: 'from-sky-500 to-purple-400',
  },
  {
    icon: Car,
    title: '주차 안내',
    content: '교회 앞 공용 주차 가능',
    color: 'from-purple-500 to-sky-400',
  },
]

/**
 * FAQ 데이터
 */
const faqs = [
  {
    question: '처음 방문할 때 어떻게 해야 하나요?',
    answer: '교회에 도착하시면 1층 안내 데스크에서 도움을 받으실 수 있습니다. 친절하게 안내해드리겠습니다.',
  },
  {
    question: '주차는 어디에 하나요?',
    answer: '교회 앞 공용 주차장을 이용하실 수 있지만 주일에는 주차 공간이 제한적일 수 있으니 가급적 대중교통을 이용해 주세요.',
  },
  {
    question: '대중교통으로 오는 게 편한가요?',
    answer: '네, 교회는 시내 중심부에 위치하여 트램과 지하철로 쉽게 오실 수 있습니다. 트램 4, 6호선 지하철 M2선을 이용하시면 편리합니다.',
  },
]

/**
 * 연락처 & 추가 정보 섹션
 * - 전화, 이메일, 사무실 시간
 * - 주차 안내
 * - FAQ
 *
 * @returns 연락처 섹션 JSX
 */
export default function LocationContact() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-purple-50/30">
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
            <span className="text-2xl font-bold mr-2">04</span>
            연락처 & 추가 정보
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            궁금하신 점이 <span className="bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">있으신가요?</span>
          </h2>
          <p className="text-muted-foreground">
            언제든지 편하게 문의해 주세요
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-16">
          {/* 연락처 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {infos.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 text-center"
              >
                {/* 아이콘 */}
                <div className="flex justify-center mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center`}>
                    <info.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* 제목 */}
                <h3 className="font-bold text-lg mb-2">{info.title}</h3>

                {/* 내용 */}
                <p className="text-sm text-muted-foreground break-words">
                  {info.content}
                </p>
              </motion.div>
            ))}
          </div>

          {/* FAQ */}
          <div className="space-y-6">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold text-center mb-8"
            >
              자주 묻는 질문
            </motion.h3>

            <div className="space-y-4 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
                >
                  <h4 className="font-bold text-lg mb-3 flex items-start gap-2">
                    <MessageCircle className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                    {faq.question}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed pl-7">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block bg-gradient-to-r from-sky-50 to-purple-50 rounded-2xl p-8 border-2 border-sky-200">
              <p className="text-lg mb-2">
                더 궁금하신 사항이 있으시면
              </p>
              <p className="text-sm text-muted-foreground">
                전화 또는 이메일로 문의해 주시거나,
                <br className="hidden sm:block" />
                예배 시간에 직접 방문하셔서 문의하셔도 좋습니다
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
