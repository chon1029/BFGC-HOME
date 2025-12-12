'use client'

import { useState } from 'react'
import PageLayout from '@/components/layout/PageLayout'
import { BookOpen, Users, Target, Calendar, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import DiscipleshipApplicationModal from '@/components/sections/worship/DiscipleshipApplicationModal'

const trainingLevels = [
    {
        level: '성장반',
        subtitle: 'Foundation',
        description: '신앙의 기초를 다지는 첫걸음',
        duration: '12주',
        topics: ['성경 개론', '기독교 신앙의 기초', '기도와 예배', '교회생활'],
        color: 'from-green-500 to-emerald-600',
        icon: BookOpen,
    },
    {
        level: '제자반',
        subtitle: 'Discipleship',
        description: '그리스도의 제자로 세워지는 과정',
        duration: '24주',
        topics: ['성경 깊이 읽기', '제자도', '영적 성장', '섬김과 헌신'],
        color: 'from-blue-500 to-cyan-600',
        icon: Users,
    },
    {
        level: '사역자반',
        subtitle: 'Leadership',
        description: '다음 세대를 세우는 리더 양성',
        duration: '36주',
        topics: ['리더십', '성경 교수법', '목회적 돌봄', '전도와 선교'],
        color: 'from-purple-500 to-pink-600',
        icon: Target,
    },
]

export default function DiscipleshipPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <PageLayout
            breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: '예배•양육', href: '/worship' },
                { label: '제자훈련', href: '/worship/discipleship' },
            ]}
            sidebarMenu="worship"
        >
            <div className="container mx-auto px-4 pb-20">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                        제자훈련
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        그리스도의 제자로 성장하고, 다음 세대를 세우는 리더로 준비되는 체계적인 훈련 프로그램입니다.
                    </p>
                </div>

                {/* Vision Section */}
                <Card className="mb-12 border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950 dark:to-blue-950">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sky-700 dark:text-sky-300">
                            <Target className="w-6 h-6" />
                            훈련의 목적
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-slate-700 dark:text-slate-300">
                        <p className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-sky-600 mt-0.5 flex-shrink-0" />
                            <span>성경적 세계관을 가진 그리스도인으로 성장</span>
                        </p>
                        <p className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-sky-600 mt-0.5 flex-shrink-0" />
                            <span>삶 속에서 말씀을 실천하는 제자의 삶</span>
                        </p>
                        <p className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-sky-600 mt-0.5 flex-shrink-0" />
                            <span>다음 세대를 세우는 영적 리더십 함양</span>
                        </p>
                    </CardContent>
                </Card>

                {/* Training Levels */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 text-center">
                        훈련 과정
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {trainingLevels.map((training, index) => {
                            const Icon = training.icon
                            return (
                                <Card
                                    key={training.level}
                                    className="group hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-800 overflow-hidden"
                                >
                                    {/* Gradient Header */}
                                    <div className={`h-32 bg-gradient-to-br ${training.color} flex items-center justify-center relative`}>
                                        <div className="absolute top-4 right-4">
                                            <Badge className="bg-white/20 text-white border-white/30">
                                                {training.duration}
                                            </Badge>
                                        </div>
                                        <div className="text-center text-white">
                                            <Icon className="w-12 h-12 mx-auto mb-2" />
                                            <h3 className="text-2xl font-bold">{training.level}</h3>
                                            <p className="text-sm opacity-90">{training.subtitle}</p>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <CardContent className="p-6">
                                        <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
                                            {training.description}
                                        </p>
                                        <div className="space-y-2">
                                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                주요 내용
                                            </p>
                                            <ul className="space-y-1.5">
                                                {training.topics.map((topic) => (
                                                    <li
                                                        key={topic}
                                                        className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
                                                    >
                                                        <ArrowRight className="w-3.5 h-3.5 text-sky-500" />
                                                        {topic}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>

                {/* Application Section */}
                <Card className="border-2 border-sky-300 dark:border-sky-700 bg-white dark:bg-slate-900">
                    <CardHeader className="text-center pb-4">
                        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                            <Calendar className="w-6 h-6 text-sky-600" />
                            2026년 제자훈련 모집
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">모집 기간</p>
                                <p className="text-slate-600 dark:text-slate-400">2026년 1월 1일 ~ 1월 31일</p>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">훈련 시작</p>
                                <p className="text-slate-600 dark:text-slate-400">2026년 2월 첫째 주</p>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">훈련 시간</p>
                                <p className="text-slate-600 dark:text-slate-400">협의 후 결정</p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button
                                size="lg"
                                className="bg-sky-600 hover:bg-sky-700 text-white px-8"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <Users className="w-5 h-5 mr-2" />
                                신청하기
                            </Button>
                            <p className="text-xs text-slate-500 mt-3">
                                문의: 담임목사 (전근일) | 이메일: bfgc1004@gmail.com
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Application Modal */}
                <DiscipleshipApplicationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>
        </PageLayout>
    )
}
