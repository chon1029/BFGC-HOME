'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Eye, FileText, AlertTriangle, ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            {/* 1. 통계 카드 섹션 */}
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

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* 2. 최근 활동 로그 (Timeline) */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>최근 활동 로그</CardTitle>
                        <CardDescription>
                            사용자들의 주요 활동 내역입니다.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {[
                                { user: "김철수", action: "새 설교 영상을 업로드했습니다.", time: "2분 전", avatar: "K" },
                                { user: "이영희", action: "회원가입을 완료했습니다.", time: "15분 전", avatar: "L" },
                                { user: "박지민", action: "자유게시판에 글을 남겼습니다.", time: "1시간 전", avatar: "P" },
                                { user: "Admin", action: "주보 파일을 업데이트했습니다.", time: "3시간 전", avatar: "A" },
                                { user: "Unknown", action: "로그인 실패 (비밀번호 5회 오류)", time: "5시간 전", avatar: "?" },
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

                {/* 3. 스팸 모니터링 (Recent Posts) */}
                <Card className="col-span-3 border-red-100 dark:border-red-900/50">
                    <CardHeader className="bg-red-50/50 dark:bg-red-900/10">
                        <CardTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5" />
                            최근 게시글 모니터링
                        </CardTitle>
                        <CardDescription>
                            광고성 글이 의심되면 즉시 차단하세요.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            {[
                                { title: "이번 주 청년부 모임 안내", author: "회장단", status: "normal" },
                                { title: "★급전 필요하신 분★ 100% 승인", author: "대출왕", status: "spam" },
                                { title: "안녕하세요 새로 가입했습니다", author: "뉴비", status: "normal" },
                                { title: "카지노 잭팟 터지는 법 공개", author: "잭팟", status: "spam" },
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
                        <Button variant="outline" className="w-full mt-4 text-xs">
                            전체 게시글 보기
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
