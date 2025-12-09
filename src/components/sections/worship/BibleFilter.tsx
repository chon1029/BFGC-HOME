'use client'

import { useState } from 'react'
import { BIBLE_BOOKS } from '@/lib/bible-data'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface BibleFilterProps {
    selectedBook: string | null
    onSelectBook: (book: string | null) => void
}

export default function BibleFilter({ selectedBook, onSelectBook }: BibleFilterProps) {
    const [isExpanded, setIsExpanded] = useState(true)

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            {/* Header */}
            <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 dark:text-slate-100">성경별 모아보기</h3>
                    {selectedBook && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400">
                            {selectedBook} 선택됨
                        </span>
                    )}
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
            </div>

            {/* Filter Grid */}
            <div className={cn(
                "transition-all duration-300 ease-in-out",
                isExpanded ? "max-h-[1000px] opacity-100 border-t border-slate-100 dark:border-slate-800" : "max-h-0 opacity-0"
            )}>
                <div className="p-4 space-y-6">
                    {/* 전체 보기 버튼 */}
                    <Button
                        variant={selectedBook === null ? "default" : "outline"}
                        size="sm"
                        onClick={() => onSelectBook(null)}
                        className={cn(
                            "font-bold",
                            selectedBook === null ? "bg-sky-600 hover:bg-sky-700" : "hover:bg-slate-100 dark:hover:bg-slate-800"
                        )}
                    >
                        전체
                    </Button>

                    {/* 구약 */}
                    <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Old Testament (구약)</h4>
                        <div className="flex flex-wrap gap-1.5">
                            {BIBLE_BOOKS.filter(b => b.type === 'old').map((book) => (
                                <button
                                    key={book.id}
                                    onClick={() => onSelectBook(book.name === selectedBook ? null : book.name)}
                                    className={cn(
                                        "px-3 py-1.5 text-sm rounded-md transition-all duration-200 border",
                                        selectedBook === book.name
                                            ? "bg-sky-50 border-sky-200 text-sky-700 font-semibold shadow-sm dark:bg-sky-900/20 dark:border-sky-800 dark:text-sky-300"
                                            : "bg-white border-slate-200 text-slate-600 hover:border-sky-200 hover:text-sky-600 hover:bg-sky-50/50 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:border-sky-800 dark:hover:text-sky-400"
                                    )}
                                >
                                    {book.abbr}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 신약 */}
                    <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">New Testament (신약)</h4>
                        <div className="flex flex-wrap gap-1.5">
                            {BIBLE_BOOKS.filter(b => b.type === 'new').map((book) => (
                                <button
                                    key={book.id}
                                    onClick={() => onSelectBook(book.name === selectedBook ? null : book.name)}
                                    className={cn(
                                        "px-3 py-1.5 text-sm rounded-md transition-all duration-200 border",
                                        selectedBook === book.name
                                            ? "bg-rose-50 border-rose-200 text-rose-700 font-semibold shadow-sm dark:bg-rose-900/20 dark:border-rose-800 dark:text-rose-300"
                                            : "bg-white border-slate-200 text-slate-600 hover:border-rose-200 hover:text-rose-600 hover:bg-rose-50/50 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:border-rose-800 dark:hover:text-rose-400"
                                    )}
                                >
                                    {book.abbr}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
