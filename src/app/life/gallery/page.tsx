'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession } from 'next-auth/react'
import PageLayout from '@/components/layout/PageLayout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Search, X, ZoomIn, Calendar, Layers, ChevronLeft, ChevronRight, Plus, Image as ImageIcon } from 'lucide-react'
import { OptimizedImage } from '@/components/common/OptimizedImage'
import { cn } from '@/lib/utils'
import { GalleryUploadModal } from '@/components/sections/gallery/GalleryUploadModal'
import GalleryActionButtons from '@/components/sections/gallery/GalleryActionButtons'
import { GalleryItem } from '@/types/gallery'

const CATEGORIES = ['전체', '예배', '친교', '행사', '다음세대', '선교']

// ----------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------

export default function GalleryPage() {
    const { data: session } = useSession()
    const [items, setItems] = useState<GalleryItem[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState('전체')
    const [selectedAlbum, setSelectedAlbum] = useState<GalleryItem | null>(null)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

    // 관리자 여부 확인
    const isAdmin = session?.user?.email === 'chon1029@gmail.com'

    useEffect(() => {
        // 실제 API 연동 전까지 빈 배열
        setItems([])
        setLoading(false)

        // TODO: 나중에 실제 API 호출
        // fetchGalleryItems()
    }, [])

    // 관리자 액션 핸들러
    const handleEdit = (id: string) => {
        // TODO: Sanity 수정 API 호출
        alert(`앨범(ID: ${id})을 수정합니다. (Mock)`)
    }

    const handleDelete = (id: string) => {
        // TODO: Sanity 삭제 API 호출
        alert(`앨범(ID: ${id})이 삭제되었습니다. (Mock)`)
    }

    const filteredItems = selectedCategory === '전체'
        ? items
        : items.filter(item => item.category === selectedCategory)

    // 앨범 열기
    const openAlbum = (album: GalleryItem) => {
        setSelectedAlbum(album)
        setCurrentImageIndex(0)
    }

    // 다음/이전 이미지
    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (!selectedAlbum || !selectedAlbum.images) return
        // 썸네일 + 추가 이미지들을 모두 포함하여 슬라이드
        const totalImages = [selectedAlbum.thumbnail, ...(selectedAlbum.images || [])]
        setCurrentImageIndex((prev) => (prev + 1) % totalImages.length)
    }

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (!selectedAlbum || !selectedAlbum.images) return
        const totalImages = [selectedAlbum.thumbnail, ...(selectedAlbum.images || [])]
        setCurrentImageIndex((prev) => (prev - 1 + totalImages.length) % totalImages.length)
    }

    // 현재 앨범의 모든 이미지 배열 (썸네일 + 추가 이미지)
    const currentAlbumImages = selectedAlbum
        ? [selectedAlbum.thumbnail, ...(selectedAlbum.images || [])]
        : []

    return (
        <PageLayout
            sidebarMenu="life"
            breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: '교회생활', href: '/life' },
                { label: '사진게시판', href: '/life/gallery' },
            ]}
        >
            <div className="space-y-12">

                {/* 1. Gallery Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative rounded-3xl overflow-hidden h-[300px] md:h-[400px] shadow-2xl"
                >
                    <OptimizedImage
                        src="/images/gallery-bg.jpg"
                        alt="Gallery Hero"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white space-y-4">
                        <Badge className="bg-sky-500/80 hover:bg-sky-500 backdrop-blur-md border-none text-white px-4 py-1.5 text-sm">
                            Gallery
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            아름다운<br />
                            <span className="text-sky-400">믿음의 순간들</span>
                        </h1>
                        <p className="text-slate-200 max-w-lg text-lg">
                            부다페스트 한인선교교회의 은혜로운 순간들을 기록합니다.
                            <br />함께 웃고, 기도하며 나누었던 소중한 추억들을 만나보세요.
                        </p>
                    </div>
                </motion.div>

                {/* 2. Filter & Search & Admin Button */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 sticky top-20 z-30 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-sm py-4 rounded-xl">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                                    selectedCategory === category
                                        ? "bg-gradient-to-r from-sky-500 to-purple-500 text-white shadow-md scale-105"
                                        : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                                )}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        {/* Search */}
                        <div className="relative w-full md:w-auto">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="앨범 검색..."
                                className="w-full md:w-64 pl-10 pr-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
                            />
                        </div>

                        {/* Admin Upload Button */}
                        {session && (
                            <Button
                                onClick={() => setIsUploadModalOpen(true)}
                                className="bg-sky-600 hover:bg-sky-700 text-white gap-2 shadow-lg hover:shadow-sky-500/30 transition-all"
                            >
                                <Plus className="w-4 h-4" />
                                앨범 추가
                            </Button>
                        )}
                    </div>
                </div>

                {/* 3. Masonry Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
                    </div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                    >
                        <AnimatePresence>
                            {filteredItems.map((item) => (
                                <motion.div
                                    layout
                                    key={item._id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
                                    onClick={() => openAlbum(item)}
                                >
                                    {/* 관리자 액션 버튼 (호버 시 표시) */}
                                    {isAdmin && (
                                        <div className="absolute top-2 right-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-md shadow-sm backdrop-blur-sm">
                                            <GalleryActionButtons
                                                galleryId={item._id}
                                                galleryTitle={item.title}
                                                onEdit={handleEdit}
                                                onDelete={handleDelete}
                                            />
                                        </div>
                                    )}

                                    {item.thumbnail && (
                                        <OptimizedImage
                                            src={item.thumbnail}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    )}

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <div className="flex items-center justify-between mb-2">
                                                <Badge className="bg-sky-500/90 backdrop-blur-sm border-none text-white text-xs">
                                                    {item.category}
                                                </Badge>
                                                <div className="flex items-center gap-1 text-white/90 text-xs">
                                                    <Layers className="w-3 h-3" />
                                                    {1 + (item.images?.length || 0)}
                                                </div>
                                            </div>
                                            <h3 className="text-white font-bold text-sm mb-1 line-clamp-2">{item.title}</h3>
                                            <div className="flex items-center gap-1 text-white/70 text-xs">
                                                <Calendar className="w-3 h-3" />
                                                {item.date}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {!loading && filteredItems.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center py-20 space-y-6"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                                rotate: [0, 3, -3, 0]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="flex justify-center"
                        >
                            <div className="p-6 bg-gradient-to-br from-sky-100 to-purple-100 dark:from-sky-900/30 dark:to-purple-900/30 rounded-full">
                                <ImageIcon className="w-16 h-16 text-sky-500 dark:text-sky-400" />
                            </div>
                        </motion.div>

                        <div className="space-y-3">
                            <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300">
                                등록된 사진이 없습니다
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                                사진이 업로드 되면 이곳에 아주 멋지고<br />
                                은혜로운 사진들이 보여지게 됩니다
                            </p>
                        </div>

                        {session && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                            >
                                <Button
                                    onClick={() => setIsUploadModalOpen(true)}
                                    className="bg-gradient-to-r from-sky-500 to-purple-500 hover:from-sky-600 hover:to-purple-600 text-white gap-2 shadow-lg hover:shadow-xl transition-all"
                                >
                                    <Plus className="w-4 h-4" />
                                    첫 번째 앨범 만들기
                                </Button>
                            </motion.div>
                        )}
                    </motion.div>
                )}

            </div>

            {/* 4. Lightbox Modal */}
            <AnimatePresence>
                {selectedAlbum && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
                        onClick={() => setSelectedAlbum(null)}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-6 right-6 md:top-10 md:right-10 z-[110] text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                            onClick={() => setSelectedAlbum(null)}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <div className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-8" onClick={(e) => e.stopPropagation()}>

                            <div className="relative w-full max-w-6xl aspect-[16/9] md:aspect-auto md:h-[80vh] rounded-lg overflow-hidden bg-black/50">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentImageIndex}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative w-full h-full"
                                    >
                                        {currentAlbumImages[currentImageIndex] && (
                                            <OptimizedImage
                                                src={currentAlbumImages[currentImageIndex]}
                                                alt={`${selectedAlbum.title} - ${currentImageIndex + 1}`}
                                                fill
                                                className="object-contain"
                                            />
                                        )}
                                    </motion.div>
                                </AnimatePresence>

                                {currentAlbumImages.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
                                        >
                                            <ChevronLeft className="w-6 h-6" />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
                                        >
                                            <ChevronRight className="w-6 h-6" />
                                        </button>
                                    </>
                                )}
                            </div>

                            <div className="absolute bottom-8 left-0 right-0 text-center text-white space-y-2 pointer-events-none">
                                <h2 className="text-xl md:text-2xl font-bold drop-shadow-md">{selectedAlbum.title}</h2>
                                <div className="flex items-center justify-center gap-2 text-sm text-white/70">
                                    <span>{currentImageIndex + 1} / {currentAlbumImages.length}</span>
                                </div>

                                <div className="flex justify-center gap-2 mt-4 pointer-events-auto overflow-x-auto max-w-2xl mx-auto px-4 pb-2">
                                    {currentAlbumImages.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentImageIndex(idx)}
                                            className={cn(
                                                "w-2 h-2 rounded-full transition-all flex-shrink-0",
                                                currentImageIndex === idx ? "bg-white w-4" : "bg-white/30 hover:bg-white/50"
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Upload Modal */}
            <GalleryUploadModal
                open={isUploadModalOpen}
                onOpenChange={setIsUploadModalOpen}
                onSuccess={() => { }} // Mock에서는 아무 동작 안 함
            />
        </PageLayout>
    )
}
