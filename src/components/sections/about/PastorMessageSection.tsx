'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

export default function PastorMessageSection() {
    const messages = [
        {
            question: '비전을 향한 동행(대상 29:18)',
            answer: `저희 교회는 “다음 세대를 세우며 뜨겁게 헌신하는 교회”라는 비전 아래,
    사역의 모든 영역에서 하나님의 마음을 품고 나아가고 있습니다.
    역대상 29장 18절의 말씀처럼, 다윗이 이스라엘 백성과 함께 성전 건축을 위해
    자원하는 마음으로 예물을 드렸던 것과 같이, 저희도 이 시대에
    하나님께서 우리에게 맡기신 사명을 기쁨으로 감당하고자 합니다.`,
        },
        {
            question: '왜 다음 세대인가?',
            answer: `다음 세대는 교회의 미래이자 세상의 소망입니다.
    우리는 다음 세대가 믿음 안에서 굳건히 서고, 하나님의 꿈을 꾸며,
    세상의 변화를 이끄는 리더로 성장하도록 돕는 것을 최우선 과제로 삼고 있습니다.
    교육과 양육을 통해 그들의 영적, 지적 성장을 지원하며, 복음의 진리 위에 굳건히 뿌리내리도록 돕고
    이로 인해 교회의 지속가능성을 담보하고자 합니다.`,
        },
        {
            question: '왜 선교적 교회인가?',
            answer: `교회는 건물 안에 갇혀 있는 것이 아니라, 세상 속으로 나아가 복음을 전하고
    사랑을 실천하는 공동체입니다. 우리는 예수님의 지상명령을 따라 우리가 살고 있는 땅,
    헝가리를 거룩한 하나님의 나라로 세워지도록 기도하며 뜨겁게 헌신하고 있습니다.`,
        },
        {
            question: '함께 만들어가는 공동체',
            answer: `저희 교회는 단순히 예배만 드리는 곳이 아니라, 서로 사랑하고 섬기며
    함께 성장하는 따뜻한 공동체입니다. 그래서 저희는 여러분의 삶의 여정 속에서
    동반자가 되어 드리고 싶습니다. 이 홈페이지를 통해 저희 교회의 사역과 비전을 더 깊이 알아가시고,
    함께 아름다운 믿음의 공동체를 만들어가는 기쁨을 누리시기를 소망합니다.`,
        },
    ]

    return (
        <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* 섹션 헤더 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.6)]">
                        담임목사 인사말
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-violet-500 mx-auto rounded-full" />
                </motion.div>

                {/* 메시지 카드들 */}
                <div className="space-y-8">
                    {messages.map((message, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: '-50px' }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="relative bg-gradient-to-br from-slate-50 to-sky-50/50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200/50 dark:border-slate-700/50"
                        >
                            {/* 인용 아이콘 */}
                            <div className="absolute top-6 right-6 text-sky-200 dark:text-sky-900/30">
                                <Quote className="w-12 h-12" />
                            </div>

                            {/* 질문 */}
                            <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-violet-600 dark:from-sky-400 dark:to-violet-400 mb-4">
                                {message.question}
                            </h3>

                            {/* 답변 */}
                            <div className="prose prose-slate dark:prose-invert max-w-none">
                                {message.answer.split('\n\n').map((paragraph, pIndex) => (
                                    <p
                                        key={pIndex}
                                        className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4 last:mb-0"
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            {/* 장식 라인 */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: false }}
                                transition={{ delay: index * 0.2 + 0.4, duration: 0.8 }}
                                className="mt-6 h-0.5 bg-gradient-to-r from-sky-500/50 to-violet-500/50 rounded-full origin-left"
                            />
                        </motion.div>
                    ))}
                </div>

                {/* 서명 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-12 text-center"
                >
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-2">
                        언제든 궁금한 점이 있으시거나 함께하고 싶은 마음이 생기시면 편하게 연락 주세요.
                        <br />
                        여러분과 함께, 예배의 현장에서 뜨겁게 하나님께 예배드릴 날을 기대합니다!
                    </p>
                </motion.div>
                {/* 서명 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-12 text-right"
                >
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-2">
                        부다페스트한인선교교회 담임목사
                    </p>
                    <p className="text-2xl font-bold">
                        전근일
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
