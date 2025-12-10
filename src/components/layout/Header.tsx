'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown, User, LogOut, Settings, LayoutDashboard } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession, signOut } from 'next-auth/react'
import { mainNavigation } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

/**
 * Header 컴포넌트
 * - transparent: PageHeader 위에 투명하게 오버레이 (컬러 로고 + 검정 텍스트)
 * - 기본: 홈페이지용 (화이트 로고 + 화이트 텍스트)
 */
interface HeaderProps {
  transparent?: boolean
}

export default function Header({ transparent = false }: HeaderProps) {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 모바일 메뉴 토글
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)
  const closeMobileMenu = () => setMobileMenuOpen(false)

  // 모바일 메뉴 토글 시 스크롤 잠금
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 z-[100] w-full transition-all duration-500',
        transparent
          ? 'bg-transparent border-b border-transparent py-4'
          : scrolled
            ? 'bg-black/90 backdrop-blur-md border-b border-white/10 shadow-lg py-2'
            : 'bg-transparent border-b border-transparent py-4'
      )}
    >
      <div className="container flex items-center justify-between px-4 md:px-6">
        {/* 로고 */}
        <Link href="/" className="flex items-center group" onClick={closeMobileMenu}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative h-[60px] w-[180px] flex-shrink-0"
          >
            <Image
              src="/images/logo/main-logo.png"
              alt="부다페스트한인선교교회 로고"
              fill
              className={cn(
                "object-contain transition-all duration-500",
                transparent ? "" : "brightness-0 invert"
              )}
              priority
            />
          </motion.div>
        </Link>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden lg:flex items-center space-x-12">
          {mainNavigation.map((item) => (
            <div
              key={item.label}
              className="relative group h-full flex items-center"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className={cn(
                  "relative flex items-center py-2 text-lg font-bold transition-all duration-500",
                  transparent ? "text-slate-900 hover:text-slate-700" : "text-white/90 hover:text-white"
                )}
              >
                {/* 텍스트 내용 */}
                <span className={cn(
                  "relative z-10 transition-all duration-300",
                  transparent
                    ? "group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-sky-600 group-hover:to-violet-600"
                    : "group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-sky-400 group-hover:to-violet-400"
                )}>
                  {item.label}
                </span>

                {item.children && (
                  <ChevronDown
                    className={cn(
                      'ml-1 h-4 w-4 transition-transform duration-300',
                      transparent ? 'text-slate-600 group-hover:text-violet-600' : 'text-white/70 group-hover:text-violet-300',
                      activeDropdown === item.label && 'rotate-180'
                    )}
                  />
                )}

                {/* 언더라인 애니메이션 */}
                <span className="absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left bg-gradient-to-r from-sky-400 to-violet-400" />
              </Link>

              {/* 드롭다운 메뉴 */}
              <AnimatePresence>
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "w-64 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl border",
                        scrolled
                          ? "bg-[#111111]/95 border-white/10" // 다크 테마
                          : "bg-black/80 border-white/10" // 초기: 반투명 블랙
                      )}
                    >
                      <div className="py-2">
                        {item.children.map((child, index) => (
                          <motion.div
                            key={child.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              href={child.href}
                              className="block px-5 py-3 group/item transition-colors relative overflow-hidden hover:bg-white/5"
                            >
                              <div className="absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-sky-500/10 to-violet-500/10" />

                              <div className="relative z-10 font-medium transition-colors flex items-center justify-between text-gray-300 group-hover/item:text-white">
                                {child.label}
                                <span className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 text-violet-400">
                                  →
                                </span>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* 로그인/사용자 메뉴 */}
        <div className="hidden lg:flex items-center">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex items-center gap-2 p-1 pr-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
                >
                  <Avatar className="h-8 w-8 border border-white/20">
                    <AvatarImage src={session.user?.image || ''} alt={session.user?.name || ''} />
                    <AvatarFallback className="bg-sky-500 text-white">
                      {session.user?.name?.[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className={cn(
                    "text-sm font-medium",
                    transparent ? "text-slate-900" : "text-white"
                  )}>
                    {session.user?.name}
                  </span>
                  <ChevronDown className={cn(
                    "h-4 w-4 opacity-50",
                    transparent ? "text-slate-900" : "text-white"
                  )} />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-xl border-slate-200 dark:bg-slate-900/95 dark:border-slate-800">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/admin" className="flex items-center w-full">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>관리자 대시보드</span>
                    <span className="ml-auto text-xs tracking-widest text-slate-500">⌘D</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/settings" className="flex items-center w-full">
                    <User className="mr-2 h-4 w-4" />
                    <span>프로필 / 설정</span>
                    <span className="ml-auto text-xs tracking-widest text-slate-500">⌘S</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20"
                  onClick={() => signOut()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>로그아웃</span>
                  <span className="ml-auto text-xs tracking-widest text-slate-500">⇧⌘Q</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-[1px] rounded-xl overflow-hidden group transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-violet-400 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

              <Link
                href="/login"
                className={cn(
                  "relative block px-6 py-2 rounded-[10px] font-bold text-sm tracking-wide transition-all duration-500",
                  scrolled
                    ? "bg-black text-white group-hover:bg-black/80"
                    : "bg-black/40 backdrop-blur-sm text-white group-hover:bg-black/60"
                )}
              >
                <span className="bg-gradient-to-r from-sky-200 to-violet-200 bg-clip-text text-transparent group-hover:text-white transition-all duration-300">
                  로그인
                </span>
              </Link>
            </motion.div>
          )}
        </div>

        {/* 모바일 메뉴 버튼 */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={cn(
            "lg:hidden p-2 rounded-full transition-colors",
            transparent ? "text-slate-900 hover:bg-slate-100" : "text-white hover:bg-white/10"
          )}
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </motion.button>
      </div>

      {/* 모바일 메뉴 */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={closeMobileMenu}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-[#0a0a0a] border-l border-white/10 z-50 lg:hidden shadow-2xl overflow-y-auto"
            >
              <div className="p-6 space-y-8">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-white">Menu</span>
                  <button
                    onClick={closeMobileMenu}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* 모바일 사용자 정보 */}
                {session && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                    <Avatar className="h-10 w-10 border border-white/20">
                      <AvatarImage src={session.user?.image || ''} alt={session.user?.name || ''} />
                      <AvatarFallback className="bg-sky-500 text-white">
                        {session.user?.name?.[0] || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate">{session.user?.name}</p>
                      <p className="text-xs text-gray-400 truncate">{session.user?.email}</p>
                    </div>
                  </div>
                )}

                <nav className="space-y-6">
                  {mainNavigation.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="block text-2xl font-bold text-gray-300 hover:text-white transition-colors mb-2"
                      >
                        {item.label}
                      </Link>
                      {item.children && (
                        <div className="pl-4 space-y-3 border-l border-white/10 ml-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={closeMobileMenu}
                              className="block text-base text-gray-500 hover:text-sky-300 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </nav>

                <div className="pt-8 border-t border-white/10 space-y-3">
                  {session ? (
                    <>
                      <Link
                        href="/admin"
                        onClick={closeMobileMenu}
                        className="flex items-center justify-center w-full py-4 rounded-xl bg-white/5 text-white hover:bg-white/10 font-bold text-lg transition-colors border border-white/10"
                      >
                        <LayoutDashboard className="mr-2 h-5 w-5" />
                        관리자 대시보드
                      </Link>
                      <button
                        onClick={() => {
                          signOut()
                          closeMobileMenu()
                        }}
                        className="flex items-center justify-center w-full py-4 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 font-bold text-lg transition-colors border border-red-500/20"
                      >
                        <LogOut className="mr-2 h-5 w-5" />
                        로그아웃
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      onClick={closeMobileMenu}
                      className="flex items-center justify-center w-full py-4 rounded-xl bg-gradient-to-r from-sky-600 to-violet-600 text-white font-bold text-lg shadow-lg shadow-violet-900/20"
                    >
                      로그인
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
