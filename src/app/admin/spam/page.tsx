'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShieldAlert, Plus, X, AlertTriangle } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function SpamPage() {
    const [bannedKeywords, setBannedKeywords] = useState(['카지노', '도박', '대출', '성인', '광고'])
    const [newKeyword, setNewKeyword] = useState('')

    const addKeyword = () => {
        if (newKeyword && !bannedKeywords.includes(newKeyword)) {
            setBannedKeywords([...bannedKeywords, newKeyword])
            setNewKeyword('')
        }
    }

    const removeKeyword = (keyword: string) => {
        setBannedKeywords(bannedKeywords.filter(k => k !== keyword))
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-red-600 flex items-center gap-2">
                    <ShieldAlert className="w-8 h-8" />
                    스팸 차단 관리
                </h2>
                <p className="text-muted-foreground">
                    악성 게시글 및 댓글을 자동으로 필터링하기 위한 설정을 관리합니다.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* 1. 금지어 설정 */}
                <Card>
                    <CardHeader>
                        <CardTitle>금지어 설정</CardTitle>
                        <CardDescription>
                            게시글이나 댓글에 포함될 경우 자동으로 차단하거나 관리자 승인을 받도록 합니다.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-2">
                            <Input
                                placeholder="금지어 입력..."
                                value={newKeyword}
                                onChange={(e) => setNewKeyword(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && addKeyword()}
                            />
                            <Button onClick={addKeyword} variant="secondary">
                                <Plus className="w-4 h-4" /> 추가
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-2">
                            {bannedKeywords.map((keyword) => (
                                <Badge key={keyword} variant="outline" className="pl-3 pr-1 py-1 text-sm border-red-200 bg-red-50 text-red-700">
                                    {keyword}
                                    <button onClick={() => removeKeyword(keyword)} className="ml-2 hover:bg-red-200 rounded-full p-0.5 transition-colors">
                                        <X className="w-3 h-3" />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* 2. 차단된 IP 관리 */}
                <Card>
                    <CardHeader>
                        <CardTitle>차단된 IP 목록</CardTitle>
                        <CardDescription>
                            악성 행위로 인해 접근이 차단된 IP 주소입니다.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {[
                                { ip: '123.45.67.89', reason: '도배 시도', date: '2024-04-01' },
                                { ip: '210.111.22.33', reason: '해킹 시도 감지', date: '2024-03-28' },
                                { ip: '58.123.45.xx', reason: '스팸 게시글 작성', date: '2024-03-25' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-3 border rounded-lg bg-slate-50 dark:bg-slate-900">
                                    <div>
                                        <div className="font-mono text-sm font-bold">{item.ip}</div>
                                        <div className="text-xs text-slate-500">{item.reason}</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-slate-400">{item.date}</span>
                                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">해제</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* 3. 스팸 의심 활동 */}
                <Card className="md:col-span-2 border-red-100 dark:border-red-900/50">
                    <CardHeader className="bg-red-50/50 dark:bg-red-900/10">
                        <CardTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5" />
                            최근 차단 내역
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="text-sm text-slate-500 text-center py-8">
                            최근 24시간 동안 차단된 내역이 없습니다.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
