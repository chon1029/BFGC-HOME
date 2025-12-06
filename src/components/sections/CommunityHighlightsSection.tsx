'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, Heart, MessageCircle, Calendar, Users, Camera, FileText, CreditCard, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const highlights = [
    {
        id: 1,
        type: 'image',
        title: '가을 야외 예배',
        category: '행사',
        date: '2025.10.15',
        image: '/images/community_gathering.jpg',
        size: 'large', // col-span-2 row-span-2
    },
    {
        id: 2,
        type: 'testimony',
        title: '하나님의 은혜로 채워진 지난 1년',
        author: '김철수 성도',
        content: '처음 교회에 왔을 때의 낯설음이 이제는 따뜻한 가족의 품처럼 느껴집니다...',
        category: '간증',
        size: 'medium', // col-span-1 row-span-1
    },
    {
        id: 3,
        type: 'notice',
        title: '청년부 겨울 수련회',
        date: '2025.12.20 - 22',
        location: '비전센터',
        category: '청년부',
        size: 'medium',
    },
    {
        id: 4,
        type: 'stats',
        count: '120+',
        label: '이번 주 참석 인원',
        icon: Users,
        size: 'small',
    },
    {
        id: 5,
        type: 'link',
        title: '갤러리 더보기',
        icon: Camera,
        size: 'small',
    }
]

export default function CommunityHighlightsSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    }

    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden" ref={ref}>
            <div className="container px-4 md:px-6 mx-auto">
                <motion.div
                    className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="max-w-2xl">
                        <Badge variant="outline" className="mb-4 text-primary border-primary/20 bg-primary/5">
                            Community & Fellowship
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
                            함께 나누는 기쁨
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300">
                            부다페스트 한인선교교회의 생생한 소식과 성도님들의 은혜로운 이야기를 나눕니다.
                        </p>
                    </div>

                    <Button variant="ghost" className="group hidden md:flex">
                        소식 전체보기 <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[280px]"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {/* Main Image Card - Large */}
                    <motion.div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl shadow-sm" variants={itemVariants}>
                        <Image
                            src="/images/community_gathering.jpg"
                            alt="Community Gathering"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end text-white">
                            <Badge className="w-fit mb-3 bg-primary hover:bg-primary/90">행사</Badge>
                            <h3 className="text-2xl font-bold mb-2">2024 봄 야외 예배</h3>
                            <p className="text-white/80 line-clamp-2">
                                함께하면 행복한 믿음의 공동체가 아름다운 자연 속에서 전 교인이 함께 모여 하나님을 찬양하고 교제하는 뜻깊은 시간이었습니다.
                            </p>
                        </div>
                    </motion.div>

                    {/* Online Offering Card (Replaces Testimony) */}
                    <motion.div className="md:col-span-1 md:row-span-1" variants={itemVariants}>
                        <Card className="h-full bg-white dark:bg-slate-800 border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                            <CardContent className="p-6 flex flex-col h-full">
                                <div className="flex items-center justify-center gap-2 mb-4 text-orange-500">
                                    <Heart className="h-5 w-5 fill-orange-500" />
                                    <span className="font-semibold text-sm">온라인 헌금</span>
                                </div>
                                <h3 className="font-bold text-lg mb-2 group-hover:text-primary text-center justify-center transition-colors">
                                    기쁨으로 드리는 예물
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 text-center justify-center text-sm mb-auto">
                                    나와 내 백성이 무엇이기에 이처럼 즐거운 마음으로 드릴 힘이 있었나이까 모든 것이 주께로 말미암았사오니 우리가 주의 손에서 받은 것으로 주께 드렸을 뿐이니이다(역대상 29:14)
                                </p>
                                <div className="mt-4 flex items-center text-sm text-primary justify-center font-medium">
                                    헌금 안내 보기 <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Notice Card - Colored */}
                    <motion.div className="md:col-span-1 md:row-span-1" variants={itemVariants}>
                        <Card className="h-full bg-blue-600 text-white border-none shadow-sm relative overflow-hidden group cursor-pointer">
                            <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl transition-transform group-hover:scale-150 duration-700" />
                            <CardContent className="p-6 flex flex-col h-full relative z-10">
                                <Badge variant="secondary" className="w-fit mb-auto bg-white/20 text-white hover:bg-white/30 border-none">
                                    청년부
                                </Badge>
                                <div>
                                    <h3 className="font-bold text-xl mb-2">겨울 수련회</h3>
                                    <div className="space-y-1 text-blue-100 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            <span>12.20(금) - 22(일)</span>
                                        </div>
                                        <p>주제: "Rise Up!"</p>
                                    </div>
                                </div>
                                <ArrowRight className="absolute bottom-6 right-6 h-6 w-6 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Bulletin Download Card (Replaces Stats) */}
                    <motion.div className="md:col-span-1 md:row-span-1" variants={itemVariants}>
                        <Card className="h-full bg-slate-100 dark:bg-slate-800 border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                            <CardContent className="p-6 flex flex-col items-center justify-center h-full text-center">
                                <div className="h-12 w-12 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 mb-4 group-hover:scale-110 transition-transform shadow-sm">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <div className="text-lg font-bold text-slate-900 dark:text-white mb-1">주보 다운로드</div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">2025년 12월 첫째주</p>
                                <Badge variant="secondary" className="bg-white/50 hover:bg-white text-xs">
                                    <Download className="h-3 w-3 mr-1" /> PDF 받기
                                </Badge>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Gallery Link Card */}
                    <motion.div className="md:col-span-1 md:row-span-1" variants={itemVariants}>
                        <Card className="h-full bg-slate-900 dark:bg-slate-800 text-white border-none shadow-sm group cursor-pointer overflow-hidden">
                            <CardContent className="p-0 h-full relative">
                                <Image
                                    src="/images/community_gathering.png"
                                    alt="Gallery Background"
                                    fill
                                    className="object-cover opacity-50 group-hover:opacity-30 transition-opacity scale-150 blur-sm"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10">
                                    <Camera className="h-8 w-8 mb-3 text-white/80 group-hover:scale-110 transition-transform" />
                                    <h3 className="font-bold text-lg text-center">갤러리 더보기</h3>
                                    <p className="text-xs text-white/60 mt-1">지난 사역 사진들</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                </motion.div>

                <div className="mt-8 text-center md:hidden">
                    <Button variant="outline" className="w-full">
                        소식 전체보기 <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </section>
    )
}
