import { Metadata } from "next"
import Image from "next/image"

import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/components/settings/SidebarNav"
import PageLayout from "@/components/layout/PageLayout"

export const metadata: Metadata = {
    title: "설정",
    description: "내 계정 및 프로필 설정을 관리합니다.",
}

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <PageLayout breadcrumbs={[{ label: '설정', href: '/settings/profile' }]}>
            <div className="container py-10 px-4 md:px-8">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">설정</h2>
                    <p className="text-muted-foreground">
                        내 프로필과 계정 설정을 관리하세요.
                    </p>
                </div>
                <Separator className="my-6" />
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="-mx-4 lg:w-1/5">
                        <SidebarNav />
                    </aside>
                    <div className="flex-1 lg:max-w-2xl">{children}</div>
                </div>
            </div>
        </PageLayout>
    )
}
