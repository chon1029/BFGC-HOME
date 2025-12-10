'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
    LayoutDashboard,
    Users,
    FileText,
    Settings,
    BarChart3,
    ShieldAlert,
    LogOut,
    Menu,
    Home
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { signOut } from 'next-auth/react'

const sidebarItems = [
    {
        title: '대시보드',
        href: '/admin',
        icon: LayoutDashboard,
        variant: 'default',
    },
    {
        title: '회원 관리',
        href: '/admin/users',
        icon: Users,
        variant: 'ghost',
    },
    {
        title: '게시글 관리',
        href: '/admin/posts',
        icon: FileText,
        variant: 'ghost',
    },
    {
        title: '통계 / 로그',
        href: '/admin/analytics',
        icon: BarChart3,
        variant: 'ghost',
    },
    {
        title: '스팸 차단',
        href: '/admin/spam',
        icon: ShieldAlert,
        variant: 'ghost',
    },
    {
        title: '설정',
        href: '/admin/settings',
        icon: Settings,
        variant: 'ghost',
    },
]

interface AdminSidebarProps {
    className?: string
}

export function AdminSidebar({ className }: AdminSidebarProps) {
    const pathname = usePathname()

    return (
        <div className={cn("pb-12 min-h-screen bg-slate-900 text-white", className)}>
            <div className="space-y-4 py-4">
                <div className="px-4 py-2">
                    <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight text-sky-400">
                        BFGC Admin
                    </h2>
                    <p className="px-2 text-xs text-slate-400">
                        교회 행정 관리 시스템
                    </p>
                </div>

                {/* 홈으로 돌아가기 버튼 */}
                <div className="px-3">
                    <Link href="/">
                        <Button
                            variant="outline"
                            className="w-full justify-start border-sky-600 text-sky-400 hover:bg-sky-600 hover:text-white transition-colors"
                        >
                            <Home className="mr-2 h-4 w-4" />
                            🏠 홈으로 돌아가기
                        </Button>
                    </Link>
                </div>

                <div className="px-3 py-2">
                    <div className="space-y-1">
                        {sidebarItems.map((item) => (
                            <Link key={item.href} href={item.href}>
                                <Button
                                    variant={pathname === item.href ? "secondary" : "ghost"}
                                    className={cn(
                                        "w-full justify-start",
                                        pathname === item.href
                                            ? "bg-slate-800 text-white hover:bg-slate-700"
                                            : "text-slate-400 hover:text-white hover:bg-slate-800"
                                    )}
                                >
                                    <item.icon className="mr-2 h-4 w-4" />
                                    {item.title}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="absolute bottom-4 px-7 w-full">
                <Button
                    variant="destructive"
                    className="w-full justify-start"
                    onClick={() => signOut({ callbackUrl: '/' })}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    로그아웃
                </Button>
            </div>
        </div>
    )
}

export function MobileSidebar() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" className="md:hidden">
                    <Menu className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-slate-900 w-72 border-r-slate-800">
                <AdminSidebar />
            </SheetContent>
        </Sheet>
    )
}
