'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DailyBread } from "@/types/dailyBread"
import { format } from "date-fns"
import { ko } from "date-fns/locale"

interface DailyBreadTableProps {
    items: DailyBread[]
    onItemClick: (item: DailyBread) => void
}

export default function DailyBreadTable({ items, onItemClick }: DailyBreadTableProps) {
    return (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
            <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                    <TableRow>
                        <TableHead className="w-[80px] text-center font-semibold">번호</TableHead>
                        <TableHead className="w-[180px] text-center font-semibold">성경본문</TableHead>
                        <TableHead className="text-center font-semibold">제목</TableHead>
                        <TableHead className="w-[100px] text-center font-semibold hidden md:table-cell">작성자</TableHead>
                        <TableHead className="w-[120px] text-center font-semibold hidden sm:table-cell">등록일</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                                등록된 묵상글이 없습니다.
                            </TableCell>
                        </TableRow>
                    ) : (
                        items.map((item, index) => (
                            <TableRow
                                key={item._id}
                                className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                onClick={() => onItemClick(item)}
                            >
                                <TableCell className="text-center font-medium text-slate-500">
                                    {items.length - index}
                                </TableCell>
                                <TableCell className="text-center font-medium text-slate-700 dark:text-slate-300">
                                    {item.book} {item.chapterVerse}
                                </TableCell>
                                <TableCell className="text-center sm:text-left font-semibold text-slate-900 dark:text-slate-100 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                                    {item.title}
                                </TableCell>
                                <TableCell className="text-center text-slate-500 hidden md:table-cell">
                                    {item.author}
                                </TableCell>
                                <TableCell className="text-center text-slate-500 hidden sm:table-cell text-sm">
                                    {format(new Date(item.date), 'yyyy-MM-dd')}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
