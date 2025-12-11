'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Calendar, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MOCK_SERMONS, Sermon } from '@/lib/mock/sermon-data'
import { SermonListModal } from '@/components/modals/SermonListModal'
import { OptimizedImage } from '@/components/common/OptimizedImage'

export default function LatestSermonSection() {
    const [mainSermon, setMainSermon] = useState<Sermon>(MOCK_SERMONS[0])
    const [isModalOpen, setIsModalOpen] = useState(false)

    // 우측 리스트에는 최신 4개만 표시
    const sidebarSermons = MOCK_SERMONS.slice(0, 4)

    return (
        <section className="relative py-24 w-full overflow-hidden" style={{ fontFamily: '"SC Dream", sans-serif' }}>
            {/* 고정 배경 이미지 (Parallax Effect) */}
            <div
                className="absolute inset-0 z-0 bg-fixed bg-no-repeat"
                style={{
                    backgroundImage: "url('/images/sermon/bg-sermon.png')",
                    backgroundSize: '100% auto', // 가로폭에 맞춤
                    backgroundPosition: 'center 50%' // 위에서 50% 내려온 위치
                }}
            />

            {/* 오버레이 (투명도 60%) */}
            <div className="absolute inset-0 z-0 bg-slate-900/60 backdrop-blur-[1px]" />

            <div className="container relative z-10 mx-auto px-4 max-w-7xl">
                {/* 섹션 헤더 */}
                <div className="flex items-end justify-between mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        className="space-y-2"
                    >
                        <h3 className="text-sky-400 font-bold text-lg tracking-wide uppercase">Latest Sermons</h3>
                        <h2 className="text-4xl font-semibold text-white">최신 설교 말씀</h2>
                    </motion.div>

                    <motion.button
                        onClick={() => setIsModalOpen(true)}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        className="hidden md:flex items-center gap-2 text-gray-300 hover:text-white font-medium transition-colors"
                    >
                        설교 더보기 <span className="text-xl">→</span>
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* 좌측: 메인 영상 플레이어 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        className="lg:col-span-2 space-y-6"
                    >
                        {/* 비디오 컨테이너 */}
                        <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-black group border border-white/10">
                            <iframe
                                key={mainSermon.videoId} // ID 변경 시 리렌더링 강제
                                src={`https://www.youtube.com/embed/${mainSermon.videoId}`}
                                title={mainSermon.title}
                                className="absolute inset-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>

                        {/* 메인 영상 정보 */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-4 text-sm text-gray-300">
                                <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                                    <Calendar className="w-4 h-4 text-sky-400" /> {mainSermon.date}
                                </span>
                                <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                                    <User className="w-4 h-4 text-violet-400" /> {mainSermon.preacher}
                                </span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                                {mainSermon.title}
                            </h3>
                        </div>
                    </motion.div>

                    {/* 우측: 설교 리스트 */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        className="flex flex-col gap-4 h-full"
                    >
                        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/10 h-full overflow-y-auto max-h-[600px]">
                            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <Play className="w-5 h-5 text-sky-400 fill-current" /> 지난 설교
                            </h4>

                            <div className="space-y-4">
                                {sidebarSermons.map((sermon) => (
                                    <div
                                        key={sermon.id}
                                        onClick={() => setMainSermon(sermon)}
                                        className={cn(
                                            "group flex gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 border",
                                            mainSermon.id === sermon.id
                                                ? "bg-white/10 border-sky-500/50"
                                                : "bg-transparent border-transparent hover:bg-white/5 hover:border-white/10"
                                        )}
                                    >
                                        {/* 썸네일 */}
                                        <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-800">
                                            <OptimizedImage
                                                src={sermon.thumbnail}
                                                alt={sermon.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            {/* 재생 아이콘 오버레이 */}
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                                                <Play className="w-6 h-6 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                                            </div>
                                        </div>

                                        {/* 정보 */}
                                        <div className="flex flex-col justify-center min-w-0">
                                            <h5 className={cn(
                                                "font-bold text-sm mb-1 truncate transition-colors",
                                                mainSermon.id === sermon.id ? "text-sky-400" : "text-gray-200 group-hover:text-white"
                                            )}>
                                                {sermon.title}
                                            </h5>
                                            <p className="text-xs text-gray-400 flex items-center gap-2">
                                                <span>{sermon.preacher}</span>
                                                <span className="w-1 h-1 rounded-full bg-gray-600" />
                                                <span>{sermon.date}</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <SermonListModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                onSelectSermon={setMainSermon}
                currentSermonId={mainSermon.id}
            />
        </section>
    )
}
