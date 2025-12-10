// src/app/admin/settings/page.tsx
// 관리자 설정 페이지 - 4개 탭 (사이트 관리, 팝업 & 공지, 이메일 & 알림, 복원)

'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Settings, Bell, Mail, RotateCcw } from 'lucide-react'
import SiteSettings from '@/components/admin/settings/SiteSettings'
import PopupSettings from '@/components/admin/settings/PopupSettings'
import EmailSettings from '@/components/admin/settings/EmailSettings'
import RestoreSettings from '@/components/admin/settings/RestoreSettings'

/**
 * 관리자 설정 페이지
 *
 * 4개 탭으로 구성:
 * 1. 사이트 관리 - SEO, 연락처, 예배 시간 등
 * 2. 팝업 & 공지 관리 - 템플릿 기반 팝업 생성
 * 3. 이메일 & 알림 설정 - 알림 수신자 관리
 * 4. 복원 - 개별 설정 복원
 */
export default function SettingsPage() {
    return (
        <div className="flex-1 space-y-6 p-8 pt-6 bg-slate-50 min-h-screen">
            {/* 페이지 헤더 */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-sky-400 to-purple-600 text-transparent bg-clip-text">
                        설정
                    </h2>
                    <p className="text-slate-600">사이트 전체 설정을 관리합니다</p>
                </div>
            </div>

            {/* 탭 UI */}
            <Tabs defaultValue="site" className="space-y-6">
                <TabsList className="bg-white shadow-sm border border-slate-200 p-1">
                    <TabsTrigger
                        value="site"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-sky-400 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
                    >
                        <Settings className="mr-2 h-4 w-4" />
                        사이트 관리
                    </TabsTrigger>
                    <TabsTrigger
                        value="popup"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-sky-400 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
                    >
                        <Bell className="mr-2 h-4 w-4" />
                        팝업 & 공지
                    </TabsTrigger>
                    <TabsTrigger
                        value="email"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-sky-400 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
                    >
                        <Mail className="mr-2 h-4 w-4" />
                        이메일 & 알림
                    </TabsTrigger>
                    <TabsTrigger
                        value="restore"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-sky-400 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
                    >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        복원
                    </TabsTrigger>
                </TabsList>

                {/* 1. 사이트 관리 탭 */}
                <TabsContent value="site" className="space-y-4">
                    <Card className="bg-white border-slate-200 shadow-lg">
                        <CardHeader className="border-b border-slate-100">
                            <CardTitle className="text-slate-900 text-xl">사이트 관리</CardTitle>
                            <CardDescription className="text-slate-600">
                                교회 기본 정보, SEO 설정, 연락처, 예배 시간을 관리합니다
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <SiteSettings />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* 2. 팝업 & 공지 관리 탭 */}
                <TabsContent value="popup" className="space-y-4">
                    <Card className="bg-white border-slate-200 shadow-lg">
                        <CardHeader className="border-b border-slate-100">
                            <CardTitle className="text-slate-900 text-xl">팝업 & 공지 관리</CardTitle>
                            <CardDescription className="text-slate-600">
                                공지글 작성 및 템플릿 기반 팝업을 생성합니다
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <PopupSettings />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* 3. 이메일 & 알림 설정 탭 */}
                <TabsContent value="email" className="space-y-4">
                    <Card className="bg-white border-slate-200 shadow-lg">
                        <CardHeader className="border-b border-slate-100">
                            <CardTitle className="text-slate-900 text-xl">이메일 & 알림 설정</CardTitle>
                            <CardDescription className="text-slate-600">
                                알림 수신자 및 이메일 발송 설정을 관리합니다
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <EmailSettings />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* 4. 복원 탭 */}
                <TabsContent value="restore" className="space-y-4">
                    <Card className="bg-white border-slate-200 shadow-lg">
                        <CardHeader className="border-b border-slate-100">
                            <CardTitle className="text-slate-900 text-xl">복원</CardTitle>
                            <CardDescription className="text-slate-600">
                                과거 설정 버전을 조회하고 복원합니다
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <RestoreSettings />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
