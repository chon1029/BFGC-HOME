'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sermon } from '@/types/sermon'
import ViewToggle from './ViewToggle'
import SermonCardView from './SermonCardView'
import SermonListView from './SermonListView'
import SermonModal from './SermonModal'

// Mock Data (나중에 Sanity에서 가져올 데이터)
const MOCK_SERMONS: Sermon[] = [
    {
        _id: '1',
        title: '믿음으로 사는 삶',
        preacher: '전근일 담임목사',
        date: '2024-12-08',
        scripture: '히브리서 11:1-6',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Example URL
        category: 'sunday',
    },
    {
        _id: '2',
        title: '고난 중에 피어나는 소망',
        preacher: '전근일 담임목사',
        date: '2024-12-01',
        scripture: '로마서 5:3-5',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        category: 'sunday',
    },
    {
        _id: '3',
        title: '기도의 능력',
        preacher: '김철수 부목사',
        date: '2024-11-29',
        scripture: '야고보서 5:13-18',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        category: 'friday',
    },
    {
        _id: '4',
        title: '감사의 기적',
        preacher: '전근일 담임목사',
        date: '2024-11-24',
        scripture: '누가복음 17:11-19',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        category: 'sunday',
    },
    {
        _id: '5',
        title: '가을 특별 부흥 성회 (1일차)',
        preacher: '이영희 선교사',
        date: '2024-11-20',
        scripture: '사도행전 1:8',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        category: 'special',
    },
]

export default function SermonListContainer() {
    const { data: session } = useSession()
    const [view, setView] = useState<'card' | 'list'>('card')
    const [filter, setFilter] = useState<string>('all')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingSermon, setEditingSermon] = useState<Sermon | null>(null)

    const filteredSermons = filter === 'all'
        ? MOCK_SERMONS
        : MOCK_SERMONS.filter(s => s.category === filter)

    // 관리자 여부 확인
    const isAdmin = session?.user?.email === 'admin@bfgc.org'

    const handleCreate = () => {
        setEditingSermon(null)
        setIsModalOpen(true)
    }

    const handleEdit = (sermon: Sermon) => {
        setEditingSermon(sermon)
        setIsModalOpen(true)
    }

    const handleDelete = (sermonId: string) => {
        // TODO: Sanity 삭제 API 호출
        alert(`설교(ID: ${sermonId})가 삭제되었습니다. (Mock)`)
    }

    return (
        <div className="space-y-6">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2">
                    {['all', 'sunday', 'friday', 'special'].map((f) => (
                        <Button
                            key={f}
                            variant={filter === f ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilter(f)}
                            className="rounded-full"
                        >
                            {f === 'all' && '전체'}
                            {f === 'sunday' && '주일예배'}
                            {f === 'friday' && '금요예배'}
                            {f === 'special' && '특별성회'}
                        </Button>
                    ))}
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <ViewToggle view={view} onViewChange={setView} />

                    {/* Admin Only: Write Button */}
                    {isAdmin && (
                        <Button
                            size="sm"
                            className="bg-sky-600 hover:bg-sky-700 text-white"
                            onClick={handleCreate}
                        >
                            <Plus className="w-4 h-4 mr-1.5" />
                            설교 올리기
                        </Button>
                    )}
                </div>
            </div>

            {/* Content View */}
            {view === 'card' ? (
                <SermonCardView
                    sermons={filteredSermons}
                    isAdmin={isAdmin}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ) : (
                <SermonListView
                    sermons={filteredSermons}
                    isAdmin={isAdmin}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            {/* Sermon Modal */}
            <SermonModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                sermonToEdit={editingSermon}
            />
        </div>
    )
}
