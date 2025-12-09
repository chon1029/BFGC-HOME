'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DailyBread } from '@/types/dailyBread'
import BibleFilter from './BibleFilter'
import DailyBreadTable from './DailyBreadTable'
import DailyBreadModal from './DailyBreadModal'

// Mock Data
const MOCK_DAILY_BREADS: DailyBread[] = [
    {
        _id: '1',
        book: '창세기',
        chapterVerse: '1:1-31',
        title: '창조의 서곡, 그리고 당신을 향한 하나님의 시선',
        author: 'bfgc3',
        date: '2025-10-18',
    },
    {
        _id: '2',
        book: '레위기',
        chapterVerse: '1:1-17',
        title: '하나님께 나아가는 길',
        author: 'bfgc3',
        date: '2025-10-18',
    },
    {
        _id: '3',
        book: '마태복음',
        chapterVerse: '5:1-12',
        title: '진정한 행복이란 무엇인가',
        author: 'admin',
        date: '2025-10-17',
    },
]

export default function DailyBreadListContainer() {
    const { data: session } = useSession()
    const [selectedBook, setSelectedBook] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)

    // 필터링 로직
    const filteredItems = MOCK_DAILY_BREADS.filter(item => {
        const matchesBook = selectedBook ? item.book === selectedBook : true
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.book.includes(searchQuery)
        return matchesBook && matchesSearch
    })

    // 관리자 여부 확인 (임시)
    const isAdmin = session?.user?.email === 'admin@bfgc.org'

    return (
        <div className="space-y-8">
            {/* 1. 성경 필터 */}
            <BibleFilter
                selectedBook={selectedBook}
                onSelectBook={setSelectedBook}
            />

            {/* 2. 리스트 & 검색 & 글쓰기 */}
            <div className="space-y-4">
                <DailyBreadTable
                    items={filteredItems}
                    onItemClick={(item) => alert(`상세보기: ${item.title}`)}
                />

                <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="검색..."
                            className="pl-9 bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button
                            size="sm"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 bg-slate-200 text-slate-600 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300"
                        >
                            검색
                        </Button>
                    </div>

                    {isAdmin && (
                        <Button
                            className="bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            새글작성
                        </Button>
                    )}
                </div>
            </div>

            {/* 3. 글쓰기 모달 */}
            <DailyBreadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => alert('새 글이 등록되었습니다!')}
            />
        </div>
    )
}
