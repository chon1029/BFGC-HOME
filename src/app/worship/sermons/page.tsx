import PageLayout from '@/components/layout/PageLayout'
import SermonListContainer from '@/components/sections/worship/SermonListContainer'

export const metadata = {
    title: '주일설교 | 부다페스트한인선교교회',
    description: '부다페스트한인선교교회의 주일 설교 말씀입니다.',
}

export default function SermonsPage() {
    return (
        <PageLayout
            breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: '예배•양육', href: '/worship' },
                { label: '주일설교', href: '/worship/sermons' },
            ]}
            sidebarMenu="worship"
        >
            <div className="container mx-auto px-4 pb-20">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">주일설교</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">
                        하나님의 말씀이 선포되는 은혜의 자리
                    </p>
                </div>
                <SermonListContainer />
            </div>
        </PageLayout>
    )
}
