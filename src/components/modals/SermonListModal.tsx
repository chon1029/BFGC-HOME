'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Play, Calendar, User, X } from 'lucide-react'
import { Sermon, MOCK_SERMONS } from '@/lib/mock/sermon-data'
import { OptimizedImage } from '@/components/common/OptimizedImage'
import { cn } from '@/lib/utils'

interface SermonListModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSelectSermon: (sermon: Sermon) => void
    currentSermonId?: string
}

export function SermonListModal({ open, onOpenChange, onSelectSermon, currentSermonId }: SermonListModalProps) {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredSermons = MOCK_SERMONS.filter(sermon =>
        sermon.title.includes(searchTerm) ||
        sermon.preacher.includes(searchTerm) ||
        (sermon.scripture && sermon.scripture.includes(searchTerm))
    )

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-4xl max-h-[85vh] flex flex-col p-0 gap-0 bg-slate-50 dark:bg-slate-900 overflow-hidden">
                <DialogHeader className="p-6 pb-4 border-b bg-white dark:bg-slate-900 sticky top-0 z-10">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <DialogTitle className="text-2xl font-bold">설교 말씀 전체보기</DialogTitle>
                            <DialogDescription>
                                지난 설교 말씀을 다시 들으며 은혜를 나누세요.
                            </DialogDescription>
                        </div>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="설교 제목, 설교자, 성경 본문 검색..."
                            className="pl-9 bg-slate-100 dark:bg-slate-800 border-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-6">
                    {filteredSermons.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {filteredSermons.map((sermon) => (
                                <div
                                    key={sermon.id}
                                    className={cn(
                                        "group relative bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border",
                                        currentSermonId === sermon.id ? "ring-2 ring-sky-500 border-transparent" : "border-slate-100 dark:border-slate-700 hover:border-sky-200"
                                    )}
                                    onClick={() => {
                                        onSelectSermon(sermon)
                                        onOpenChange(false)
                                    }}
                                >
                                    {/* 썸네일 영역 */}
                                    <div className="relative aspect-video overflow-hidden">
                                        <OptimizedImage
                                            src={sermon.thumbnail}
                                            alt={sermon.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Play className="w-5 h-5 text-white fill-white ml-1" />
                                            </div>
                                        </div>

                                        {/* 현재 재생 중 표시 */}
                                        {currentSermonId === sermon.id && (
                                            <div className="absolute top-2 right-2 bg-sky-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse">
                                                재생 중
                                            </div>
                                        )}
                                    </div>

                                    {/* 정보 영역 */}
                                    <div className="p-4">
                                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" /> {sermon.date}
                                            </span>
                                            <span className="w-px h-3 bg-slate-300" />
                                            <span className="flex items-center gap-1">
                                                <User className="w-3 h-3" /> {sermon.preacher}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1 mb-1 group-hover:text-sky-600 transition-colors">
                                            {sermon.title}
                                        </h3>
                                        {sermon.scripture && (
                                            <p className="text-sm text-slate-500 line-clamp-1">
                                                {sermon.scripture}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                            <Search className="w-12 h-12 mb-4 opacity-20" />
                            <p>검색 결과가 없습니다.</p>
                        </div>
                    )}
                </div>

                <div className="p-4 border-t bg-white dark:bg-slate-900 flex justify-end">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        닫기
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
