'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, Users, Clock } from "lucide-react"

export default function AnalyticsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">통계 / 로그</h2>
                <p className="text-muted-foreground">
                    웹사이트 방문 통계와 시스템 로그를 확인합니다.
                </p>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">개요</TabsTrigger>
                    <TabsTrigger value="visitors">방문자 분석</TabsTrigger>
                    <TabsTrigger value="logs">시스템 로그</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">총 방문수</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">12,345</div>
                                <p className="text-xs text-muted-foreground">+18% from last month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">평균 체류시간</CardTitle>
                                <Clock className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">4분 12초</div>
                                <p className="text-xs text-muted-foreground">+2% from last month</p>
                            </CardContent>
                        </Card>
                        {/* 더 많은 카드 추가 가능 */}
                    </div>

                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>주간 방문자 추이</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <div className="h-[200px] flex items-center justify-center text-slate-400 bg-slate-50 dark:bg-slate-900 rounded-lg border border-dashed">
                                <BarChart3 className="w-8 h-8 mr-2" />
                                차트 데이터가 연동되지 않았습니다.
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="logs">
                    <Card>
                        <CardHeader>
                            <CardTitle>최근 시스템 로그</CardTitle>
                            <CardDescription>
                                관리자 및 사용자의 주요 활동 내역입니다.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    { time: '2024-04-02 14:30:00', user: 'Admin', action: '주보 업로드', ip: '192.168.1.1' },
                                    { time: '2024-04-02 13:15:22', user: '김철수', action: '로그인 성공', ip: '121.134.xx.xx' },
                                    { time: '2024-04-02 12:40:10', user: 'System', action: '자동 백업 완료', ip: 'localhost' },
                                    { time: '2024-04-02 10:20:05', user: 'Unknown', action: '로그인 실패 (비밀번호 오류)', ip: '211.45.xx.xx' },
                                ].map((log, i) => (
                                    <div key={i} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-sm">{log.action}</span>
                                            <span className="text-xs text-slate-500">{log.user} (IP: {log.ip})</span>
                                        </div>
                                        <span className="text-xs text-slate-400">{log.time}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
