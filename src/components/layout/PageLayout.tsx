'use client'

import { ReactNode } from 'react'
import Header from './Header'
import PageHeader from './PageHeader'
import Breadcrumb, { type BreadcrumbItem } from './Breadcrumb'
import Sidebar from './Sidebar'

interface PageLayoutProps {
    children: ReactNode
    breadcrumbs: BreadcrumbItem[]
    sidebarMenu?: 'guide' | 'worship' | 'next-generation' | 'life'
    showSlogan?: boolean
}

import ScrollToTopButton from '@/components/ui/scroll-to-top-button'

export default function PageLayout({
    children,
    breadcrumbs,
    sidebarMenu,
    showSlogan = true,
}: PageLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 relative">
            {/* 투명 헤더 (PageHeader 위에 오버레이) */}
            <Header transparent={showSlogan} />

            {/* 교회 표어 배너 */}
            <PageHeader showSlogan={showSlogan} />

            {/* 메인 컨텐츠 영역 */}
            <div className="container mx-auto px-4 py-8">
                {/* 브래드크럼 */}
                {breadcrumbs.length > 0 && (
                    <div className="mb-8">
                        <Breadcrumb items={breadcrumbs} />
                    </div>
                )}

                {/* 사이드바 + 콘텐츠 */}
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* 사이드바 (있는 경우만) */}
                    {sidebarMenu && (
                        <aside className="w-full lg:w-64 flex-shrink-0 lg:sticky lg:top-40 self-start transition-all duration-300">
                            <Sidebar menuKey={sidebarMenu} />
                        </aside>
                    )}

                    {/* 메인 콘텐츠 */}
                    <main className="flex-1 min-w-0">
                        {children}
                    </main>
                </div>
            </div>

            {/* 위로 가기 버튼 */}
            <ScrollToTopButton />
        </div>
    )
}
