'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { motion } from 'framer-motion'

export interface BreadcrumbItem {
    label: string
    href: string
    icon?: React.ReactNode
}

interface BreadcrumbProps {
    items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-xl px-6 py-4 shadow-lg">
            <ol className="flex items-center space-x-2 text-sm">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1
                    const isFirst = index === 0

                    return (
                        <motion.li
                            key={item.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                            className="flex items-center"
                        >
                            {/* 링크 또는 현재 페이지 */}
                            {isLast ? (
                                <span className="flex items-center gap-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-violet-600 dark:from-sky-400 dark:to-violet-400">
                                    {isFirst && <Home className="w-4 h-4 text-sky-600 dark:text-sky-400" />}
                                    {item.icon}
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group"
                                >
                                    {isFirst && (
                                        <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    )}
                                    {item.icon}
                                    <span className="relative">
                                        {item.label}
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-sky-600 to-violet-600 group-hover:w-full transition-all duration-300" />
                                    </span>
                                </Link>
                            )}

                            {/* 구분자 */}
                            {!isLast && (
                                <ChevronRight className="w-4 h-4 mx-2 text-slate-400 dark:text-slate-600" />
                            )}
                        </motion.li>
                    )
                })}
            </ol>
        </nav>
    )
}
