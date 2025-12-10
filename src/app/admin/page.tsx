'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Eye, FileText, AlertTriangle, ArrowUpRight, Mic2, BookOpen, Image as ImageIcon, Newspaper, Settings, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// ----------------------------------------------------------------------
// Quick Actions Data
// ----------------------------------------------------------------------
const QUICK_ACTIONS = [
    {
        title: '설교 관리',
        description: '주일 설교 및 특별 집회 영상 업로드',
        icon: Mic2,
        href: '/worship/sermons',
        color: 'text-red-500',
        bg: 'bg-red-50 dark:bg-red-900/20',
    },
    {
        title: '주간 기도문',
        description: '이번 주 기도제목 작성 및 발행',
        icon: FileText,
        href: '/admin/weekly-prayer/create', // 유일하게 admin 내부에 있는 기능
        color: 'text-violet-500',
        bg: 'bg-violet-50 dark:bg-violet-900/20',
    },
    {
        title: '묵상(QT) 나눔',
        description: '매일성경 묵상 본문 및 해설 등록',
        icon: BookOpen,
        href: '/worship/daily-bread',
        color: 'text-amber-500',
        bg: 'bg-amber-50 dark:bg-amber-900/20',
    },
    {
        title: '갤러리 관리',
        description: '교회 행사 사진 및 앨범 업로드',
        icon: ImageIcon,
        href: '/life/gallery',
        color: 'text-sky-500',
        bg: 'bg-sky-50 dark:bg-sky-900/20',
    },
    {
        title: '주보 업로드',
        description: '이번 주 주보 PDF 및 썸네일 등록',
        icon: Newspaper,
        href: '/life/bulletin',
        color: 'text-green-500',
        bg: 'bg-green-50 dark:bg-green-900/20',
    },
    {
        title: '사이트 설정',
        description: '기본 정보 수정 및 관리자 계정 관리',
        icon: Settings,
        href: '/settings',
        color: 'text-slate-500',
        bg: 'bg-slate-50 dark:bg-slate-800',
    },
]

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            {/* 1. Header */}
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">
                    부다페스트 한인선교교회 관리자 페이지입니다.
                </p>
            </div>

            {/* 2. Statistics Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">총 방문자 수</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2,350</div>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                            <span className="text-green-500 font-medium">+12%</span>
                            <span className="ml-1">지난달 대비</span>
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">신규 가입자</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+48</div>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                            <span className="text-green-500 font-medium">+5%</span>
                            <span className="ml-1">지난주 대비</span>
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">새 게시글</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <span className="text-slate-500">오늘 올라온 글</span>
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-red-500">스팸 의심</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">3</div>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <span className="text-red-500 font-medium">조치 필요</span>
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* 3. Quick Actions Grid */}
            <div>
                <h3 className="text-lg font-semibold mb-4">바로가기 (Quick Actions)</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {QUICK_ACTIONS.map((action, index) => (
                        <Link key={index} href={action.href}>
                            <Card className="hover:shadow-md transition-shadow cursor-pointer border-slate-200 dark:border-slate-800 h-full">
                                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                    <div className={`p-2 rounded-lg ${action.bg}`}>
                                        <action.icon className={`w-6 h-6 ${action.color}`} />
                                    </div>
                                    <div className="space-y-1">
                                        <CardTitle className="text-base">{action.title}</CardTitle>
                                    </div>
                                    <ExternalLink className="w-4 h-4 ml-auto text-slate-400" />
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>{action.description}</CardDescription>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

            {/* 4. Recent Activity Log */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>최근 활동 로그</CardTitle>
                        <CardDescription>
                            관리자 및 사용자들의 주요 활동 내역입니다.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {[
                                { user: "Admin", action: "주보 파일을 업데이트했습니다.", time: "10분 전", avatar: "A" },
                                { user: "김철수", action: "새 설교 영상을 업로드했습니다.", time: "1시간 전", avatar: "K" },
                                { user: "System", action: "주간 데이터 백업 완료", time: "3시간 전", avatar: "S" },
                                { user: "이영희", action: "회원가입을 완료했습니다.", time: "5시간 전", avatar: "L" },
                                { user: "Unknown", action: "로그인 실패 (비밀번호 5회 오류)", time: "어제", avatar: "?" },
                            ].map((log, i) => (
                                <div key={i} className="flex items-center">
                                    <Avatar className="h-9 w-9">
                                        <AvatarFallback>{log.avatar}</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">{log.user}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {log.action}
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium text-xs text-muted-foreground">
                                        {log.time}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Spam Monitoring */}
                <Card className="col-span-3 border-red-100 dark:border-red-900/50">
                    <CardHeader className="bg-red-50/50 dark:bg-red-900/10">
                        <CardTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5" />
                            최근 게시글 모니터링
                        </CardTitle>
                        <CardDescription>
                            스팸으로 의심되는 활동을 확인하세요.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            {[
                                { title: "이번 주 청년부 모임 안내", author: "회장단", status: "normal" },
                                { title: "★급전 필요하신 분★ 100% 승인", author: "대출왕", status: "spam" },
                                { title: "안녕하세요 새로 가입했습니다", author: "뉴비", status: "normal" },
                            ].map((post, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-white dark:bg-slate-950 shadow-sm">
                                    <div className="flex flex-col gap-1 overflow-hidden">
                                        <span className="font-medium text-sm truncate">{post.title}</span>
                                        <span className="text-xs text-slate-500">{post.author}</span>
                                    </div>
                                    {post.status === 'spam' ? (
                                        <Button size="sm" variant="destructive" className="h-7 text-xs px-2">
                                            차단
                                        </Button>
                                    ) : (
                                        <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">
                                            정상
                                        </Badge>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
