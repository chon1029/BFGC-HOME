'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { mainNavigation } from '@/lib/navigation'
import {
    MessageCircle,
    Target,
    UserPlus,
    Clock,
    MapPin,
    Book,
    Coffee,
    GraduationCap,
    Crown,
    School,
    Users,
    Newspaper,
    Camera,
    Heart,
    ChevronRight,
} from 'lucide-react'

interface SidebarProps {
    menuKey: 'guide' | 'worship' | 'next-generation' | 'life'
}

// 서브메뉴 아이콘 매핑
const subMenuIcons: Record<string, React.ElementType> = {
    // 교회안내
    greeting: MessageCircle,
    vision: Target,
    newcomer: UserPlus,
    schedule: Clock,
    location: MapPin,
    // 예배•양육
    sermons: Book,
    'daily-bread': Coffee,
    discipleship: GraduationCap,
    // 다음세대
    'kings-kids': Crown,
    'sam-school': School,
    joshua: Users,
    // 교회생활
    bulletin: Newspaper,
    gallery: Camera,
    prayer: Heart,
}

export default function Sidebar({ menuKey }: SidebarProps) {
    const pathname = usePathname()

    // 현재 메뉴 찾기
    const currentMenu = mainNavigation.find((item) => {
        if (menuKey === 'guide') return item.href === '/guide'
        if (menuKey === 'worship') return item.href === '/worship'
        if (menuKey === 'next-generation') return item.href === '/next-generation'
        if (menuKey === 'life') return item.href === '/life'
        return false
    })

    if (!currentMenu || !currentMenu.children) return null

    return (
        <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
            className="sticky top-24 h-fit"
        >
            {/* 메인 사이드바 카드 */}
            <div className="relative bg-white dark:bg-slate-900 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden">
                {/* 그라데이션 배경 효과 */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 via-transparent to-violet-50/50 dark:from-sky-950/20 dark:via-transparent dark:to-violet-950/20 pointer-events-none" />

                {/* 메뉴 헤더 */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative bg-gradient-to-r from-sky-600 to-violet-600 p-5"
                >
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        {currentMenu.label}
                    </h2>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 to-violet-400" />
                </motion.div>

                {/* 서브메뉴 리스트 */}
                <nav className="relative p-3">
                    <ul className="space-y-1">
                        {currentMenu.children.map((item, index) => {
                            const isActive = pathname === item.href
                            const iconKey = item.href.split('/').pop() || ''
                            const Icon = subMenuIcons[iconKey]

                            return (
                                <motion.li
                                    key={item.href}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        delay: index * 0.05,
                                        duration: 0.3,
                                        type: 'spring',
                                        stiffness: 120,
                                    }}
                                >
                                    <Link href={item.href} className="group relative block">
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            transition={{ duration: 0.15 }}
                                            className={cn(
                                                'relative flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200',
                                                isActive
                                                    ? 'bg-gradient-to-r from-sky-50 to-violet-50 dark:from-sky-950/30 dark:to-violet-950/30 shadow-md'
                                                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                                            )}
                                        >
                                            {/* 아이콘 */}
                                            {Icon && (
                                                <motion.div
                                                    whileHover={{ rotate: [0, -10, 10, 0] }}
                                                    transition={{ duration: 0.3 }}
                                                    className={cn(
                                                        'flex-shrink-0 transition-colors duration-200',
                                                        isActive
                                                            ? 'text-violet-600 dark:text-violet-400'
                                                            : 'text-slate-400 dark:text-slate-500 group-hover:text-sky-600 dark:group-hover:text-sky-400'
                                                    )}
                                                >
                                                    <Icon className="w-5 h-5" />
                                                </motion.div>
                                            )}

                                            {/* 메뉴 텍스트 - 호버 시 확대 + 오른쪽 이동 */}
                                            <motion.span
                                                whileHover={{ x: 4, scale: 1.05 }}
                                                transition={{ duration: 0.2, type: 'spring', stiffness: 300 }}
                                                className={cn(
                                                    'flex-1 font-medium transition-all duration-200',
                                                    isActive
                                                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-violet-600 dark:from-sky-400 dark:to-violet-400 font-bold'
                                                        : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'
                                                )}
                                            >
                                                {item.label}
                                            </motion.span>

                                            {/* 화살표 아이콘 (활성 시) */}
                                            <AnimatePresence>
                                                {isActive && (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -5 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -5 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="text-violet-600 dark:text-violet-400"
                                                    >
                                                        <ChevronRight className="w-4 h-4" />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* 호버 효과 배경 */}
                                            {!isActive && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    whileHover={{ opacity: 1 }}
                                                    transition={{ duration: 0.15 }}
                                                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-500/5 to-violet-500/5"
                                                />
                                            )}

                                            {/* 활성 상태 글로우 효과 */}
                                            {isActive && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-500/10 to-violet-500/10"
                                                />
                                            )}
                                        </motion.div>
                                    </Link>
                                </motion.li>
                            )
                        })}
                    </ul>
                </nav>
            </div>

            {/* 하단 정보 카드 */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, type: 'spring' }}
                className="mt-4 p-4 bg-gradient-to-br from-sky-50 to-violet-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg"
            >
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-violet-500 flex items-center justify-center">
                        <Heart className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {currentMenu.children.find((child) => child.href === pathname)?.description ||
                            currentMenu.children[0]?.description}
                    </p>
                </div>
            </motion.div>
        </motion.aside>
    )
}
