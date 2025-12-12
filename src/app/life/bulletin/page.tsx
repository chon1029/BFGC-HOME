'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession } from 'next-auth/react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, Calendar, Bell, FileText, ChevronRight, Pin, Clock, MapPin, ZoomIn, Plus, LayoutGrid, List as ListIcon } from 'lucide-react'
import { OptimizedImage } from '@/components/common/OptimizedImage'
import { BulletinUploadModal } from '@/components/sections/bulletin/BulletinUploadModal'
import BulletinActionButtons from '@/components/sections/bulletin/BulletinActionButtons'

import { Bulletin } from '@/types/bulletin'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

const NOTICES = [
    {
        id: 1,
        type: 'important',
        title: '2024년 부활절 연합예배 안내',
        date: '2024.03.24',
        content: '이번 주 주일은 부활절 연합예배로 드립니다. 모든 성도님들은 10시 30분까지 본당으로 모여주시기 바랍니다.',
    },
    {
        id: 2,
        type: 'normal',
        title: '4월 정기 제직회 공고',
        date: '2024.03.28',
        content: '다음 주일 2부 예배 후 본당에서 4월 정기 제직회가 있습니다.',
    },
]

const UPCOMING_EVENTS = [
    {
        id: 1,
        title: '전교인 야외예배',
        date: '2024.05.05',
        time: '10:00 AM',
        location: '마르기트 섬',
        dDay: 'D-35',
    },
    {
        id: 2,
        title: '어버이 주일 행사',
        date: '2024.05.12',
        time: '11:00 AM',
        location: '본당',
        dDay: 'D-42',
    },
]

// ----------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------

export default function BulletinPage() {
    const { data: session } = useSession()
    const [bulletins, setBulletins] = useState<Bulletin[]>([])
    const [loading, setLoading] = useState(true)
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
    const [editingBulletin, setEditingBulletin] = useState<Bulletin | null>(null)

    // 관리자 여부 확인
    const isAdmin = session?.user?.email === 'admin@bfgc.org'

    const fetchBulletins = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/bulletin')
            if (!response.ok) throw new Error('Failed to fetch bulletins')
            const data = await response.json()
            setBulletins(data)
        } catch (error) {
            console.error('Error fetching bulletins:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBulletins()
    }, [])

    const latestBulletin = bulletins[0]
    const pastBulletins = bulletins.slice(1)

    // PDF 다운로드 핸들러
    const handleDownload = (fileUrl?: string) => {
        if (!fileUrl) return
        window.open(fileUrl, '_blank')
    }

    // 관리자 액션 핸들러
    const handleEdit = (id: string) => {
        const bulletinToEdit = bulletins.find(b => b._id === id)
        if (bulletinToEdit) {
            setEditingBulletin(bulletinToEdit)
            setIsUploadModalOpen(true)
        }
    }

    const { toast } = useToast()

    // ...

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/bulletin/${id}`, {
                method: 'DELETE',
            })

            if (response.ok) {
                toast({
                    title: "삭제 완료",
                    description: "주보가 성공적으로 삭제되었습니다.",
                })
                fetchBulletins() // 목록 새로고침
            } else {
                throw new Error('Failed to delete')
            }
        } catch (error) {
            console.error('Delete error:', error)
            toast({
                variant: "destructive",
                title: "삭제 실패",
                description: "삭제 중 오류가 발생했습니다.",
            })
        }
    }

    return (
        <PageLayout
            sidebarMenu="life"
            breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: '교회생활', href: '/life' },
                { label: '주보', href: '/life/bulletin' },
            ]}
        >
            <div className="space-y-12">

                {/* 1. 히어로 섹션 (최신 주보) */}
                {latestBulletin ? (
                    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-12 items-center">
                            {/* 좌측: 주보 정보 */}
                            <div className="lg:col-span-7 space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-sm font-medium">
                                    <Calendar className="w-4 h-4" />
                                    {latestBulletin.date} 주보
                                </div>

                                <div className="space-y-2">
                                    <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                                        {latestBulletin.title}
                                    </h1>
                                    <p className="text-slate-400 text-lg">{latestBulletin.volume}</p>
                                </div>

                                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-sky-500/20 rounded-lg">
                                            <FileText className="w-5 h-5 text-sky-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-400 mb-1">이번 주 설교</p>
                                            <h3 className="text-xl font-bold text-white">{latestBulletin.sermonTitle || '설교 제목 없음'}</h3>
                                            <p className="text-slate-300 mt-1">
                                                {latestBulletin.preacher} • {latestBulletin.scripture}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 pt-4">
                                    {/* PDF 다운로드 링크 (Sanity File URL은 별도 쿼리로 가져와야 정확함. 임시로 # 처리) */}
                                    <Button className="bg-sky-600 hover:bg-sky-700 text-white gap-2 h-12 px-6 text-lg shadow-lg shadow-sky-900/20">
                                        <Download className="w-5 h-5" />
                                        PDF 다운로드
                                    </Button>
                                </div>
                            </div>

                            {/* 우측: 주보 썸네일 */}
                            <div className="lg:col-span-5 flex justify-center lg:justify-end">
                                <motion.div
                                    initial={{ opacity: 0, y: 20, rotate: 5 }}
                                    animate={{ opacity: 1, y: 0, rotate: 3 }}
                                    transition={{ duration: 0.8 }}
                                    className="relative w-64 md:w-80 aspect-[1/1.414] bg-white rounded-lg shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 cursor-pointer group"
                                    onClick={() => handleDownload(latestBulletin.pdfFile)}
                                >
                                    {/* 관리자 액션 버튼 (호버 시 표시) */}
                                    {isAdmin && (
                                        <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-md shadow-sm backdrop-blur-sm"
                                            onClick={(e) => e.stopPropagation()} // 부모 클릭 방지
                                        >
                                            <BulletinActionButtons
                                                bulletinId={latestBulletin._id}
                                                bulletinTitle={latestBulletin.title}
                                                onEdit={handleEdit}
                                                onDelete={handleDelete}
                                            />
                                        </div>
                                    )}

                                    {latestBulletin.thumbnail && (
                                        <OptimizedImage
                                            src={latestBulletin.thumbnail}
                                            alt="주보 표지"
                                            fill
                                            className="object-cover rounded-lg"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end justify-center pb-6">
                                        <span className="text-white font-medium flex items-center gap-2">
                                            <ZoomIn className="w-5 h-5" /> 크게 보기 (PDF)
                                        </span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </section>
                ) : (
                    <div className="text-center py-20 bg-slate-100 dark:bg-slate-900 rounded-3xl">
                        <p className="text-slate-500">등록된 주보가 없습니다.</p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* 2. 공지사항 및 지난 주보 */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* 공지사항 */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <Bell className="w-6 h-6 text-sky-600" />
                                    교회 소식
                                </h2>
                            </div>
                            <div className="space-y-4">
                                {NOTICES.map((notice) => (
                                    <div key={notice.id} className={`group relative bg-white dark:bg-slate-900 rounded-xl p-6 border transition-all hover:shadow-md ${notice.type === 'important' ? 'border-sky-200 bg-sky-50/30 dark:border-sky-900' : 'border-slate-100 dark:border-slate-800'}`}>
                                        {notice.type === 'important' && <Pin className="absolute top-4 right-4 w-5 h-5 text-sky-500 fill-sky-500 rotate-45" />}
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                {notice.type === 'important' && <Badge className="bg-red-500 border-none">필독</Badge>}
                                                <span className="text-sm text-slate-500">{notice.date}</span>
                                            </div>
                                            <h3 className="text-lg font-bold group-hover:text-sky-600 transition-colors">{notice.title}</h3>
                                            <p className="text-slate-600 dark:text-slate-400">{notice.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 지난 주보 아카이브 */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <FileText className="w-6 h-6 text-slate-600" />
                                    지난 주보
                                </h2>
                                <div className="flex items-center gap-2">
                                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={cn("p-2 rounded-md transition-all", viewMode === 'grid' ? "bg-white dark:bg-slate-700 shadow-sm text-sky-600" : "text-slate-400 hover:text-slate-600")}
                                        >
                                            <LayoutGrid className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={cn("p-2 rounded-md transition-all", viewMode === 'list' ? "bg-white dark:bg-slate-700 shadow-sm text-sky-600" : "text-slate-400 hover:text-slate-600")}
                                        >
                                            <ListIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                    {session && (
                                        <Button onClick={() => {
                                            setEditingBulletin(null) // 등록 모드로 초기화
                                            setIsUploadModalOpen(true)
                                        }} size="sm" className="bg-sky-600 hover:bg-sky-700 text-white gap-1">
                                            <Plus className="w-4 h-4" /> 등록
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {pastBulletins.length > 0 ? (
                                viewMode === 'grid' ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                        {pastBulletins.map((bulletin) => (
                                            <motion.div
                                                key={bulletin._id}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                className="group cursor-pointer relative"
                                                onClick={() => handleDownload(bulletin.pdfFile)}
                                            >
                                                <div className="relative aspect-[1/1.414] bg-slate-200 rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 mb-3">
                                                    {/* 관리자 액션 버튼 (호버 시 표시) */}
                                                    {isAdmin && (
                                                        <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-md shadow-sm backdrop-blur-sm">
                                                            <BulletinActionButtons
                                                                bulletinId={bulletin._id}
                                                                bulletinTitle={bulletin.title}
                                                                onEdit={handleEdit}
                                                                onDelete={handleDelete}
                                                            />
                                                        </div>
                                                    )}

                                                    {bulletin.thumbnail && (
                                                        <OptimizedImage
                                                            src={bulletin.thumbnail}
                                                            alt={bulletin.title}
                                                            fill
                                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                    )}
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                        <Download className="text-white w-8 h-8 drop-shadow-md" />
                                                    </div>
                                                </div>
                                                <h3 className="font-bold text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-sky-600 transition-colors">
                                                    {bulletin.title}
                                                </h3>
                                                <p className="text-sm text-slate-500">{bulletin.date}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {pastBulletins.map((bulletin) => (
                                            <div
                                                key={bulletin._id}
                                                className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl hover:border-sky-200 transition-colors group cursor-pointer relative"
                                                onClick={() => handleDownload(bulletin.pdfFile)}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-16 bg-slate-200 rounded overflow-hidden relative flex-shrink-0">
                                                        {bulletin.thumbnail && (
                                                            <OptimizedImage
                                                                src={bulletin.thumbnail}
                                                                alt={bulletin.title}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 transition-colors">
                                                            {bulletin.title}
                                                        </h3>
                                                        <p className="text-sm text-slate-500">{bulletin.date} • {bulletin.volume}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    {/* 관리자 액션 버튼 */}
                                                    {isAdmin && (
                                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <BulletinActionButtons
                                                                bulletinId={bulletin._id}
                                                                bulletinTitle={bulletin.title}
                                                                onEdit={handleEdit}
                                                                onDelete={handleDelete}
                                                            />
                                                        </div>
                                                    )}
                                                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-sky-600">
                                                        <Download className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )
                            ) : (
                                <div className="text-center py-10 text-slate-500">지난 주보가 없습니다.</div>
                            )}
                        </div>
                    </div>

                    {/* 3. 주요 행사 (사이드바) */}
                    <div className="lg:col-span-4 space-y-6">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Calendar className="w-6 h-6 text-purple-600" />
                            주요 행사
                        </h2>

                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 space-y-6">
                            {UPCOMING_EVENTS.map((event, index) => (
                                <div key={event.id} className="relative pl-6 border-l-2 border-slate-100 dark:border-slate-800 last:pb-0 pb-6">
                                    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 bg-white dark:bg-slate-900 ${index === 0 ? 'border-purple-500' : 'border-slate-300'}`} />
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">{event.date}</span>
                                            <Badge variant="outline" className="text-xs font-normal border-purple-200 text-purple-700 bg-purple-50">{event.dDay}</Badge>
                                        </div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">{event.title}</h4>
                                        <div className="flex flex-col gap-1 text-sm text-slate-500 mt-2">
                                            <div className="flex items-center gap-2"><Clock className="w-3 h-3" /> {event.time}</div>
                                            <div className="flex items-center gap-2"><MapPin className="w-3 h-3" /> {event.location}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <Button variant="outline" className="w-full border-dashed border-slate-300 text-slate-500 hover:text-purple-600 hover:border-purple-300">
                                전체 일정 보기
                            </Button>
                        </div>
                    </div>

                </div>
            </div>

            <BulletinUploadModal
                open={isUploadModalOpen}
                onOpenChange={(open) => {
                    setIsUploadModalOpen(open)
                    if (!open) setEditingBulletin(null) // 모달 닫힐 때 초기화
                }}
                onSuccess={() => {
                    fetchBulletins()
                    setIsUploadModalOpen(false)
                }}
                initialData={editingBulletin}
            />
        </PageLayout>
    )
}
