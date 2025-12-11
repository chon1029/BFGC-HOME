'use client'

import PageLayout from '@/components/layout/PageLayout'
import SermonListContainer from '@/components/sections/worship/SermonListContainer'

/**
 * 주일설교 목록 페이지
 * - 카드/리스트 뷰 전환 기능
 * - 관리자 수정/삭제 기능 (호버 시 아이콘 표시)
 * - 검색 및 필터링
 */
export default function SermonsPage() {
    return (
        <PageLayout
            sidebarMenu="worship"
            breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: '예배•양육', href: '/worship' },
                { label: '주일설교', href: '/worship/sermons' },
            ]}
        >
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">주일설교</h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        하나님의 말씀으로 한 주를 살아가는 힘을 얻으세요.
                    </p>
                </div>

                {/* Sermon List Container (카드/리스트 뷰, 관리자 기능 포함) */}
                <SermonListContainer />
            </div>
        </PageLayout>
    )
}
