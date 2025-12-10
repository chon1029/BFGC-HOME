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

// 오늘의 말씀 데이터 (31일치)
const bibleVerses = [
    { text: "태초에 하나님이 천지를 창조하시니라", source: "창세기 1:1" },
    { text: "여호와는 나의 목자시니 내게 부족함이 없으리로다", source: "시편 23:1" },
    { text: "두려워하지 말라 내가 너와 함께 함이라 놀라지 말라 나는 네 하나님이 됨이라", source: "이사야 41:10" },
    { text: "내게 능력 주시는 자 안에서 내가 모든 것을 할 수 있느니라", source: "빌립보서 4:13" },
    { text: "항상 기뻐하라 쉬지 말고 기도하라 범사에 감사하라", source: "데살로니가전서 5:16-18" },
    { text: "너희는 먼저 그의 나라와 그의 의를 구하라", source: "마태복음 6:33" },
    { text: "수고하고 무거운 짐 진 자들아 다 내게로 오라 내가 너희를 쉬게 하리라", source: "마태복음 11:28" },
    { text: "사람이 마음으로 자기의 길을 계획할지라도 그의 걸음을 인도하시는 이는 여호와시니라", source: "잠언 16:9" },
    { text: "너의 행사를 여호와께 맡기라 그리하면 네가 경영하는 것이 이루어지리라", source: "잠언 16:3" },
    { text: "오직 성령이 너희에게 임하시면 너희가 권능을 받고... 내 증인이 되리라 하시니라", source: "사도행전 1:8" },
    { text: "믿음은 바라는 것들의 실상이요 보이지 않는 것들의 증거니", source: "히브리서 11:1" },
    { text: "사랑은 오래 참고 사랑은 온유하며 시기하지 아니하며", source: "고린도전서 13:4" },
    { text: "너희 중에 누구든지 지혜가 부족하거든... 하나님께 구하라", source: "야고보서 1:5" },
    { text: "볼지어다 내가 문 밖에 서서 두드리노니 누구든지 내 음성을 듣고 문을 열면...", source: "요한계시록 3:20" },
    { text: "나의 힘이신 여호와여 내가 주를 사랑하나이다", source: "시편 18:1" },
    { text: "주의 말씀은 내 발에 등이요 내 길에 빛이니이다", source: "시편 119:105" },
    { text: "너는 마음을 다하여 여호와를 신뢰하고 네 명철을 의지하지 말라", source: "잠언 3:5" },
    { text: "하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니...", source: "요한복음 3:16" },
    { text: "내가 너를 지명하여 불렀나니 너는 내 것이라", source: "이사야 43:1" },
    { text: "여호와를 앙망하는 자는 새 힘을 얻으리니", source: "이사야 40:31" },
    { text: "아무 것도 염려하지 말고 다만 모든 일에 기도와 간구로...", source: "빌립보서 4:6" },
    { text: "그가 찔림은 우리의 허물 때문이요 그가 상함은 우리의 죄악 때문이라", source: "이사야 53:5" },
    { text: "진리를 알지니 진리가 너희를 자유롭게 하리라", source: "요한복음 8:32" },
    { text: "구하라 그리하면 너희에게 주실 것이요 찾으라 그리하면 찾아낼 것이요", source: "마태복음 7:7" },
    { text: "네 시작은 미약하였으나 네 나중은 심히 창대하리라", source: "욥기 8:7" },
    { text: "여호와는 네게 복을 주시고 너를 지키시기를 원하며", source: "민수기 6:24" },
    { text: "내가 산을 향하여 눈을 들리라 나의 도움이 어디서 올까", source: "시편 121:1" },
    { text: "하나님은 우리의 피난처시요 힘이시니 환난 중에 만날 큰 도움이시라", source: "시편 46:1" },
    { text: "너희는 세상의 소금이니... 너희는 세상의 빛이라", source: "마태복음 5:13-14" },
    { text: "그리스도의 평강이 너희 마음을 주장하게 하라", source: "골로새서 3:15" },
    { text: "만일 하나님이 우리를 위하시면 누가 우리를 대적하리요", source: "로마서 8:31" },
]

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

    // 오늘의 말씀 선택 (날짜 기반)
    const todayVerse = bibleVerses[new Date().getDate() % bibleVerses.length]

    if (!currentMenu || !currentMenu.children) return null

    return (
        <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
            className="sticky top-24 h-fit space-y-6"
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

                                            {/* 메뉴 텍스트 */}
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

                                            {/* 화살표 아이콘 */}
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

            {/* 오늘의 말씀 카드 (오로라 글래스 스타일) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, type: 'spring' }}
                className="relative overflow-hidden rounded-2xl shadow-lg group"
            >
                {/* 배경 */}
                <div className="absolute inset-0 bg-white dark:bg-slate-900" />
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                {/* 오로라 효과 */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-sky-400/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

                {/* 콘텐츠 */}
                <div className="relative p-6 text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-sky-200/50 dark:border-sky-700/50 shadow-sm mb-4">
                        <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
                        <span className="text-xs font-bold bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">
                            오늘의 말씀
                        </span>
                    </div>

                    <div className="relative mb-4">
                        <span className="absolute -top-2 -left-1 text-4xl text-sky-500/20 font-serif">“</span>
                        <p className="text-slate-700 dark:text-slate-300 font-serif leading-relaxed px-2 break-keep">
                            {todayVerse.text}
                        </p>
                        <span className="absolute -bottom-4 -right-1 text-4xl text-purple-500/20 font-serif">”</span>
                    </div>

                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-2">
                        - {todayVerse.source} -
                    </p>
                </div>
            </motion.div>
        </motion.aside>
    )
}
