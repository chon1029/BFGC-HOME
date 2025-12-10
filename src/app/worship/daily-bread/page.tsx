'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageLayout from '@/components/layout/PageLayout'
import { Calendar, BookOpen, ChevronRight, Search, ChevronDown, ChevronUp, ChevronLeft, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { DailyBreadUploadModal } from '@/components/sections/worship/DailyBreadUploadModal'
import { BIBLE_BOOKS } from '@/lib/constants/bible'
import Link from 'next/link'
import { cn } from '@/lib/utils'

// ----------------------------------------------------------------------
// Mock Data (Sanity 연동 전)
// ----------------------------------------------------------------------

const DAILY_BREADS = [
    {
        id: '1',
        date: '2024-04-02',
        title: '하나님의 형상대로',
        book: '창세기',
        chapterVerse: '1:26-31',
        keyVerse: '하나님이 자기 형상 곧 하나님의 형상대로 사람을 창조하시되 남자와 여자를 창조하시고',
        summary: '우리는 하나님의 걸작품입니다. 오늘 하루도 존귀한 자녀로서의 정체성을 기억합시다.',
    },
    {
        id: '2',
        date: '2024-04-01',
        title: '새로운 시작을 위한 기도',
        book: '창세기',
        chapterVerse: '1:1-5',
        keyVerse: '태초에 하나님이 천지를 창조하시니라',
        summary: '혼돈과 공허 속에서 빛을 만드신 하나님의 창조 사역을 묵상합니다.',
    },
    {
        id: '3',
        date: '2024-03-31',
        title: '부활의 아침에',
        book: '마태복음',
        chapterVerse: '28:1-10',
        keyVerse: '그가 여기 계시지 않고 그가 말씀하시던 대로 살아나셨느니라',
        summary: '부활의 기쁨과 소망을 나누는 거룩한 아침입니다.',
    },
    {
        id: '4',
        date: '2024-03-30',
        title: '십자가의 길',
        book: '마가복음',
        chapterVerse: '15:21-32',
        keyVerse: '구레네 사람 시몬이 억지로 십자가를 지고 예수님을 따랐던 그 길을 묵상합니다.',
        summary: '십자가의 길을 함께 걷는 우리의 믿음을 돌아봅니다.',
    },
    {
        id: '5',
        date: '2024-03-29',
        title: '겟세마네 동산의 기도',
        book: '마가복음',
        chapterVerse: '14:32-42',
        keyVerse: '아바 아버지, 아버지께는 모든 것이 가능하오니',
        summary: '예수님의 간절한 기도를 통해 우리의 기도를 배웁니다.',
    },
]

const ITEMS_PER_PAGE = 10

export default function DailyBreadPage() {
    const [selectedBook, setSelectedBook] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [isFilterOpen, setIsFilterOpen] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    const filteredBreads = DAILY_BREADS.filter(item => {
        const matchesBook = selectedBook ? item.book === selectedBook : true
        const matchesSearch = item.title.includes(searchTerm) || item.summary.includes(searchTerm)
        return matchesBook && matchesSearch
    })

    const totalPages = Math.ceil(filteredBreads.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const currentBreads = filteredBreads.slice(startIndex, endIndex)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleBookSelect = (bookName: string | null) => {
        setSelectedBook(bookName)
        setCurrentPage(1)
    }

    return (
        <PageLayout
            sidebarMenu="worship"
            breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: '예배•양육', href: '/worship' },
                { label: '일용할 양식', href: '/worship/daily-bread' },
            ]}
        >
            <div className="space-y-8 max-w-6xl mx-auto">

                {/* 1. Hero Section */}
                <div className="relative w-full h-[400px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: 'url("/images/daily-bread/prayer-hands.jpg")' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent" />

                    <div className="relative z-10 h-full flex flex-col justify-center items-start text-left px-8 md:px-16 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-4"
                        >
                            <div className="inline-block px-4 py-1.5 bg-amber-500 text-white text-sm font-bold rounded-full shadow-lg">
                                Daily Bread
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
                                <span className="text-white">일용할</span>
                                <br />
                                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                                    양식
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-gray-200 font-light max-w-2xl leading-relaxed border-l-4 border-amber-500 pl-4">
                                "사람이 떡으로만 살 것이 아니요<br />
                                하나님의 입으로부터 나오는 모든 말씀으로 살 것이라"
                                <span className="block text-sm text-amber-300 mt-2">- 마태복음 4:4 -</span>
                            </p>
                        </motion.div>
                    </div>

                    <div className="absolute bottom-6 right-6 z-20">
                        <DailyBreadUploadModal />
                    </div>
                </div>

                {/* 2. Bible Books Filter */}
                <Card className="border-none shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
                    <div
                        className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                    >
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-amber-600" />
                            성경별 모아보기
                        </h3>
                        <div className="flex items-center gap-2">
                            {selectedBook ? (
                                <>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleBookSelect(null);
                                        }}
                                        className="px-3 py-1 text-sm font-medium rounded-full transition-colors bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                                    >
                                        전체 보기
                                    </button>
                                    <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">
                                        {selectedBook} 선택됨
                                    </Badge>
                                </>
                            ) : (
                                <Badge variant="outline" className="text-slate-500">
                                    전체 보기
                                </Badge>
                            )}
                            {isFilterOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                        </div>
                    </div>

                    <AnimatePresence>
                        {isFilterOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <CardContent className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800">
                                    <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2 mt-4">
                                        {BIBLE_BOOKS.map((book) => {
                                            const count = DAILY_BREADS.filter(b => b.book === book.name).length
                                            const isActive = selectedBook === book.name
                                            const hasContent = count > 0

                                            return (
                                                <button
                                                    key={book.id}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (hasContent) handleBookSelect(isActive ? null : book.name);
                                                    }}
                                                    disabled={!hasContent}
                                                    className={cn(
                                                        "relative flex items-center justify-center h-10 rounded-lg text-sm font-medium transition-all duration-200",
                                                        isActive
                                                            ? "bg-amber-600 text-white shadow-md scale-105 z-10"
                                                            : hasContent
                                                                ? "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-50 hover:text-amber-700 border border-slate-200 dark:border-slate-700"
                                                                : "bg-slate-50 dark:bg-slate-800/30 text-slate-300 dark:text-slate-700 cursor-default"
                                                    )}
                                                >
                                                    {book.abbr}
                                                    {hasContent && (
                                                        <span className={cn(
                                                            "absolute -top-1 -right-1 w-3 h-3 rounded-full text-[8px] flex items-center justify-center",
                                                            isActive ? "bg-white text-amber-600" : "bg-amber-100 text-amber-600"
                                                        )}>
                                                            {count}
                                                        </span>
                                                    )}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </CardContent>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Card>

                {/* 3. Search & List */}
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="relative w-full md:max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                placeholder="제목, 본문, 내용 검색..."
                                className="pl-9 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-amber-500"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value)
                                    setCurrentPage(1)
                                }}
                            />
                        </div>
                        <div className="text-sm text-slate-500">
                            총 <span className="font-bold text-amber-600">{filteredBreads.length}</span>개의 묵상
                        </div>
                    </div>

                    <div className="grid gap-4">
                        <AnimatePresence mode="popLayout">
                            {currentBreads.length > 0 ? (
                                currentBreads.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link href={`/worship/daily-bread/${item.id}`}>
                                            <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-800 hover:border-amber-200 dark:hover:border-amber-900 overflow-hidden">
                                                <CardContent className="p-0 flex flex-col md:flex-row">
                                                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 flex flex-col justify-center items-center md:w-32 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-700 group-hover:bg-amber-50/50 dark:group-hover:bg-amber-900/10 transition-colors">
                                                        <span className="text-sm text-slate-500 font-medium">{item.date.split('-')[0]}</span>
                                                        <span className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                                                            {item.date.split('-')[1]}.{item.date.split('-')[2]}
                                                        </span>
                                                    </div>

                                                    <div className="p-6 flex-1 flex flex-col justify-center space-y-3">
                                                        <div className="flex items-center gap-2">
                                                            <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 group-hover:bg-amber-100 transition-colors px-3 py-1">
                                                                {item.book} {item.chapterVerse}
                                                            </Badge>
                                                        </div>
                                                        <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                                                            {item.title}
                                                        </h4>
                                                        <p className="text-slate-600 dark:text-slate-400 line-clamp-1 group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors">
                                                            {item.keyVerse}
                                                        </p>
                                                    </div>

                                                    <div className="hidden md:flex items-center justify-center px-6 text-slate-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all">
                                                        <ChevronRight className="w-6 h-6" />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-20 text-slate-500 bg-slate-50 dark:bg-slate-900 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                                    <p className="text-lg mb-2">검색 결과가 없습니다.</p>
                                    {(selectedBook || searchTerm) && (
                                        <Button
                                            variant="link"
                                            onClick={() => {
                                                setSelectedBook(null)
                                                setSearchTerm('')
                                                setCurrentPage(1)
                                            }}
                                            className="mt-2 text-amber-600"
                                        >
                                            전체 보기
                                        </Button>
                                    )}
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* 4. Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 pt-8">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handlePageChange(1)}
                                disabled={currentPage === 1}
                                className="h-9 w-9"
                            >
                                <ChevronsLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="h-9 w-9"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>

                            <div className="flex gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                    if (
                                        page === 1 ||
                                        page === totalPages ||
                                        (page >= currentPage - 1 && page <= currentPage + 1)
                                    ) {
                                        return (
                                            <Button
                                                key={page}
                                                variant={currentPage === page ? "default" : "outline"}
                                                size="icon"
                                                onClick={() => handlePageChange(page)}
                                                className={cn(
                                                    "h-9 w-9",
                                                    currentPage === page && "bg-amber-600 hover:bg-amber-700 text-white"
                                                )}
                                            >
                                                {page}
                                            </Button>
                                        )
                                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                                        return <span key={page} className="flex items-center px-2">...</span>
                                    }
                                    return null
                                })}
                            </div>

                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="h-9 w-9"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handlePageChange(totalPages)}
                                disabled={currentPage === totalPages}
                                className="h-9 w-9"
                            >
                                <ChevronsRight className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>

            </div>
        </PageLayout>
    )
}
