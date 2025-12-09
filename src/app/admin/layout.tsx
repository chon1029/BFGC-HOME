import { AdminSidebar, MobileSidebar } from '@/components/admin/AdminSidebar'
import { UserNav } from '@/components/admin/UserNav' // We'll create this next
import { Separator } from '@/components/ui/separator'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Desktop Sidebar */}
            <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50">
                <AdminSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 md:pl-64 flex flex-col">
                {/* Header */}
                <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-white px-6 shadow-sm dark:bg-slate-900 dark:border-slate-800">
                    <MobileSidebar />
                    <div className="flex flex-1 items-center justify-between">
                        <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
                            관리자 대시보드
                        </h1>
                        <div className="flex items-center gap-4">
                            {/* 여기에 알림 아이콘 등 추가 가능 */}
                            <UserNav />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
