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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Trash2, ExternalLink, Eye } from "lucide-react"
import Link from 'next/link'

// Mock Data
const POSTS = [
    { id: 1, title: '이번 주 청년부 모임 안내', author: '회장단', board: '청년부', date: '2024-04-01', views: 45 },
    { id: 2, title: '중보기도 요청합니다', author: '김성도', board: '기도나눔', date: '2024-03-31', views: 12 },
    { id: 3, title: '가구 무료 나눔합니다', author: '이집사', board: '나눔장터', date: '2024-03-30', views: 89 },
    { id: 4, title: '안녕하세요 새로 왔습니다', author: '새가족', board: '가입인사', date: '2024-03-29', views: 34 },
    { id: 5, title: '다음 주 찬양 콘티', author: '찬양팀장', board: '찬양팀', date: '2024-03-28', views: 56 },
]

export default function PostsPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedBoard, setSelectedBoard] = useState('all')

    const filteredPosts = POSTS.filter(post => {
        const matchesSearch = post.title.includes(searchTerm) || post.author.includes(searchTerm)
        const matchesBoard = selectedBoard === 'all' || post.board === selectedBoard
        return matchesSearch && matchesBoard
    })

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">게시글 관리</h2>
                <p className="text-muted-foreground">
                    사이트 내 모든 게시글을 모니터링하고 관리합니다.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="제목 또는 작성자 검색..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="w-full md:w-48">
                    <Select value={selectedBoard} onValueChange={setSelectedBoard}>
                        <SelectTrigger>
                            <SelectValue placeholder="게시판 선택" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">전체 게시판</SelectItem>
                            <SelectItem value="청년부">청년부</SelectItem>
                            <SelectItem value="기도나눔">기도나눔</SelectItem>
                            <SelectItem value="나눔장터">나눔장터</SelectItem>
                            <SelectItem value="가입인사">가입인사</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="rounded-md border bg-white dark:bg-slate-900">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[400px]">제목</TableHead>
                            <TableHead>게시판</TableHead>
                            <TableHead>작성자</TableHead>
                            <TableHead>작성일</TableHead>
                            <TableHead>조회수</TableHead>
                            <TableHead className="text-right">관리</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPosts.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                        {post.title}
                                        <Link href="#" className="text-slate-400 hover:text-sky-600">
                                            <ExternalLink className="w-3 h-3" />
                                        </Link>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="font-normal">
                                        {post.board}
                                    </Badge>
                                </TableCell>
                                <TableCell>{post.author}</TableCell>
                                <TableCell>{post.date}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1 text-slate-500">
                                        <Eye className="w-3 h-3" /> {post.views}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
