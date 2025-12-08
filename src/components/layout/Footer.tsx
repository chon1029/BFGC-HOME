'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Youtube, Instagram, Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-slate-900 text-slate-300">
      {/* Gradient Top Border */}
      <div className="h-1 bg-gradient-to-r from-sky-400 via-purple-600 to-sky-400"></div>

      <div className="container mx-auto px-8 md:px-12 lg:px-20 py-16">
        {/* Main Footer Content - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Column 1: Church Logo & Info */}
          <div>
            {/* White Logo */}
            <div className="mb-6">
              <Image
                src="/images/logo/watermark-logo.png"
                alt="부다페스트한인선교교회 로고"
                width={180}
                height={60}
                className="brightness-0 invert"
              />
            </div>

            {/* Church Description */}
            <div className="text-sm leading-relaxed space-y-3">
              <p className="font-bold text-white">
                사도행전적 역사가 일어나는 교회<br />
                부다페스트 한인선교교회에 오신 것을 환영합니다!
              </p>
              <p className="text-xs text-slate-400">
                현재보다 미래가 더 좋은 교회, 교회의 본질과 사명을 회복하는 교회,<br />
                모든 성도들이 행복하다고 말하는 교회, 그 행복을 주변에 나누는 교회,<br />
                우리 부다페스트 한인선교교회는 지역사회와 세계를 향해<br />
                복음의 능력으로 선한 영향력을 끼치는 믿음의 사람들의 공동체입니다!!
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">빠른 링크</h4>
            <nav className="grid grid-cols-2 gap-3">
              <Link href="/worship/service" className="text-sm hover:text-sky-400 transition-colors">
                예배 안내
              </Link>
              <Link href="/about/vision" className="text-sm hover:text-sky-400 transition-colors">
                교회 소개
              </Link>
              <Link href="/about/newcomer" className="text-sm hover:text-sky-400 transition-colors">
                새가족 등록
              </Link>
              <Link href="/about/location" className="text-sm hover:text-sky-400 transition-colors">
                오시는 길
              </Link>
              <Link href="/worship/sermons" className="text-sm hover:text-sky-400 transition-colors">
                설교 아카이브
              </Link>
              <Link href="/worship/daily-bread" className="text-sm hover:text-sky-400 transition-colors">
                일용할 양식
              </Link>
              <Link href="/life/prayer" className="text-sm hover:text-sky-400 transition-colors">
                주간 기도문
              </Link>
              <Link href="/partnership/contact" className="text-sm hover:text-sky-400 transition-colors">
                문의하기
              </Link>
            </nav>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">연락처</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-sky-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-white mb-1">주소</p>
                  <p>1073 Budapest,</p>
                  <p>Osvát utca 16, Hungary</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-sky-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-white mb-1">예배 시간</p>
                  <p>주일 예배: 15:00(오후 3시)</p>
                  <p>금요 기도회: 19:00(저녁 7시)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-sky-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-white mb-1">전화</p>
                  <a href="tel:+36303658509" className="hover:text-sky-400 transition-colors">
                    +36 20 320 1595
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-sky-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-white mb-1">이메일</p>
                  <a href="mailto:bfgc3@naver.com" className="hover:text-sky-400 transition-colors">
                    bfgc1004@gamil.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 my-8"></div>

        {/* Bottom Section: Social Media + Copyright + Anti-Cult Statement */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Social Media Icons */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400 mr-2">함께하세요</span>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-gradient-to-r hover:from-sky-400 hover:to-purple-600 transition-all duration-300 group"
            >
              <Facebook className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-gradient-to-r hover:from-sky-400 hover:to-purple-600 transition-all duration-300 group"
            >
              <Youtube className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-gradient-to-r hover:from-sky-400 hover:to-purple-600 transition-all duration-300 group"
            >
              <Instagram className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
            </a>
          </div>

          {/* Copyright (Center) */}
          <div className="text-sm text-slate-400 text-center">
            <p>© {new Date().getFullYear()} 부다페스트한인선교교회. All rights reserved.</p>
            <p className="text-xs mt-1">Made with ❤️ for the Kingdom of God</p>
          </div>

          {/* Anti-Cult Statement (Right) */}
          <div className="text-sm text-slate-400 text-center md:text-right">
            <p className="font-semibold text-white">부다페스트한인선교교회는</p>
            <p className="text-xs">신천지 및 이단단체를 거부합니다</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
