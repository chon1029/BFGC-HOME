'use client'

import { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, MoreHorizontal, Shield, UserX, Mail } from "lucide-react"

// Mock Data
const USERS = [
    { id: 1, name: '김철수', email: 'kim@example.com', role: 'user', joinedAt: '2024-01-15', status: 'active' },
    { id: 2, name: '이영희', email: 'lee@example.com', role: 'admin', joinedAt: '2023-11-20', status: 'active' },
    { id: 3, name: '박지민', email: 'park@example.com', role: 'user', joinedAt: '2024-02-10', status: 'active' },
    { id: 4, name: '최민수', email: 'choi@example.com', role: 'user', joinedAt: '2024-03-05', status: 'suspended' },
    { id: 5, name: '정수정', email: 'jung@example.com', role: 'user', joinedAt: '2024-03-20', status: 'active' },
]

export default function UsersPage() {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredUsers = USERS.filter(user =>
        user.name.includes(searchTerm) || user.email.includes(searchTerm)
    )

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">회원 관리</h2>
                <p className="text-muted-foreground">
                    가입된 회원들의 정보를 조회하고 관리합니다.
                </p>
            </div>

            <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="이름 또는 이메일 검색..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button variant="outline">엑셀 다운로드</Button>
            </div>

            <div className="rounded-md border bg-white dark:bg-slate-900">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[250px]">사용자</TableHead>
                            <TableHead>권한</TableHead>
                            <TableHead>상태</TableHead>
                            <TableHead>가입일</TableHead>
                            <TableHead className="text-right">관리</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{user.name}</span>
                                        <span className="text-xs text-muted-foreground">{user.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {user.role === 'admin' ? (
                                        <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200">관리자</Badge>
                                    ) : (
                                        <Badge variant="outline" className="text-slate-600">일반회원</Badge>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {user.status === 'active' ? (
                                        <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">활동중</Badge>
                                    ) : (
                                        <Badge variant="destructive">정지됨</Badge>
                                    )}
                                </TableCell>
                                <TableCell>{user.joinedAt}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>작업</DropdownMenuLabel>
                                            <DropdownMenuItem>
                                                <Mail className="mr-2 h-4 w-4" /> 이메일 보내기
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Shield className="mr-2 h-4 w-4" /> 권한 변경
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600">
                                                <UserX className="mr-2 h-4 w-4" /> 강제 탈퇴
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
