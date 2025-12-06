'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { footerNavigation, socialLinks } from '@/lib/navigation'

/**
 * Footer 컴포넌트 (프리미엄 버전)
 * - 그라데이션 배경
 * - 애니메이션 효과 (Framer Motion)
 * - 호버 애니메이션 (링크, 소셜 미디어)
 * - 반응형 그리드 레이아웃
 */
export default function Footer() {
  // 페이드인 애니메이션 variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <footer className="relative border-t bg-gradient-to-b from-muted/30 via-muted/50 to-muted/70 overflow-hidden">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container relative py-12 md:py-16 px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10"
        >
          {/* 교회 정보 - 2열 차지 */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            {/* 로고 */}
            <Link href="/" className="inline-flex items-center space-x-3 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                className="relative h-12 w-12"
              >
                <Image
                  src="/images/logo/main-logo.png"
                  alt="부다페스트한인선교교회 로고"
                  fill
                  className="object-contain"
                />
              </motion.div>
              <span className="text-lg font-bold text-primary-600 group-hover:text-primary-500 transition-colors">
                부다페스트한인선교교회
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed">
              헝가리에서 빛을 발하는 하나님의 공동체
              <br />
              Budapest Korean Gospel Church
            </p>

            {/* 2025 슬로건 이미지 */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative h-16 w-48"
            >
              <Image
                src="/images/logo/slogan-2025.png"
                alt="2025 교회 슬로건"
                fill
                className="object-contain object-left"
              />
            </motion.div>

            {/* 소셜 미디어 */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                // 아이콘 매핑
                const iconMap: Record<string, any> = {
                  Youtube: (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  ),
                  Facebook: (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  ),
                  Instagram: (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  ),
                }

                return (
                  <motion.div
                    key={social.name}
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link
                      href={social.href}
                      className="flex items-center justify-center h-10 w-10 rounded-full bg-muted hover:bg-primary-500 text-muted-foreground hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                      aria-label={social.name}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {iconMap[social.icon]}
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* 교회소개 */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold mb-4 text-foreground">교회소개</h3>
            <ul className="space-y-2.5 text-sm">
              {footerNavigation.about.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="relative text-muted-foreground hover:text-primary-500 transition-colors group inline-block"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 예배 */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold mb-4 text-foreground">예배</h3>
            <ul className="space-y-2.5 text-sm">
              {footerNavigation.worship.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="relative text-muted-foreground hover:text-primary-500 transition-colors group inline-block"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 연락처 */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold mb-4 text-foreground">연락처</h3>
            <ul className="space-y-3 text-sm">
              <motion.li
                whileHover={{ x: 3 }}
                className="flex items-start space-x-2.5"
              >
                <MapPin className="h-4 w-4 mt-0.5 text-primary-500 flex-shrink-0" />
                <span className="text-muted-foreground leading-relaxed">
                  1078 Budapest,<br />
                  Nefelejcs u. 9-11, Hungary
                </span>
              </motion.li>
              <motion.li
                whileHover={{ x: 3 }}
                className="flex items-center space-x-2.5"
              >
                <Phone className="h-4 w-4 text-primary-500 flex-shrink-0" />
                <a
                  href="tel:+36303658509"
                  className="text-muted-foreground hover:text-primary-500 transition-colors"
                >
                  +36 30 365 8509
                </a>
              </motion.li>
              <motion.li
                whileHover={{ x: 3 }}
                className="flex items-center space-x-2.5"
              >
                <Mail className="h-4 w-4 text-primary-500 flex-shrink-0" />
                <a
                  href="mailto:bfgc3@naver.com"
                  className="text-muted-foreground hover:text-primary-500 transition-colors"
                >
                  bfgc3@naver.com
                </a>
              </motion.li>
            </ul>

            {/* 예배 시간 정보 */}
            <div className="mt-6 pt-4 border-t border-primary-500/20">
              <p className="text-xs font-semibold mb-2 text-primary-600">예배 시간</p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                  <span>주일 오전 예배: 11:00</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                  <span>수요 예배: 19:00</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                  <span>금요 기도회: 20:00</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* 저작권 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="border-t border-primary-500/20 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} 부다페스트한인선교교회 (Budapest Korean Gospel Church).
              <br className="md:hidden" />
              <span className="hidden md:inline"> </span>
              All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <Link
                href="/privacy"
                className="hover:text-primary-500 transition-colors relative group"
              >
                개인정보처리방침
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
              </Link>
              <span>|</span>
              <Link
                href="/terms"
                className="hover:text-primary-500 transition-colors relative group"
              >
                이용약관
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
