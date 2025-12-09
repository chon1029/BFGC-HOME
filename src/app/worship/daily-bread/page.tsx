import PageLayout from '@/components/layout/PageLayout'
import DailyBreadListContainer from '@/components/sections/worship/DailyBreadListContainer'

export const metadata = {
    title: '일용할 양식 | 부다페스트한인선교교회',
    description: '매일 성경 말씀을 묵상하며 하나님의 뜻을 구하는 시간입니다.',
}

export default function DailyBreadPage() {
    return (
        <PageLayout
            breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: '예배•양육', href: '/worship' },
                { label: '일용할 양식', href: '/worship/daily-bread' },
            ]}
            sidebarMenu="worship"
        >
            <div className="container mx-auto px-4 pb-20">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">일용할 양식</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">
                        매일 주시는 말씀으로 하루를 시작하세요
                    </p>
                </div>
                <DailyBreadListContainer />
            </div>
        </PageLayout>
    )
}
