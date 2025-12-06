'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false)

  // 스크롤 핸들러
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight * 0.85, // 85vh 지점으로 이동
      behavior: 'smooth'
    })
  }

  return (
    <section className="relative h-[85vh] w-full overflow-hidden bg-black">
      {/* 배경 레이어 그룹 */}
      <div className="absolute inset-0 z-0">
        {/* 1. 유튜브 영상 (iframe) - 페이드 인 효과 */}
        <div className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh]">
            <iframe
              src="https://www.youtube.com/embed/72T3JqNmaJ8?autoplay=1&mute=1&controls=0&loop=1&playlist=72T3JqNmaJ8&playsinline=1&rel=0&showinfo=0&modestbranding=1"
              className="w-full h-full pointer-events-none"
              allow="autoplay; encrypted-media"
              onLoad={() => setTimeout(() => setVideoLoaded(true), 500)}
              style={{ border: 'none', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* 2. 그라데이션 오버레이 (가독성 확보) */}
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-30 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-5xl mx-auto space-y-8"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-tight drop-shadow-2xl"
            style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}>
            예배와 선교에<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-400 filter brightness-125">
              헌신된 교회
            </span>
          </h1>

          <div className="space-y-2 drop-shadow-xl" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>
            <p className="text-xl md:text-3xl text-white font-bold">
              부다페스트한인선교교회에 오신 것을 환영합니다.
            </p>
            <p className="text-lg md:text-2xl text-white/90 font-medium">
              하나님의 사랑을 전하며 열방을 품는 믿음의 공동체입니다.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
            {/* 1. 예배 시간 안내 버튼 */}
            <div className="relative group rounded-full">
              {/* 호버 시 나타나는 그라데이션 테두리 (배경) */}
              <div className="absolute -inset-[2px] rounded-full bg-gradient-to-r from-sky-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]" />

              <Button
                size="lg"
                className="relative bg-white text-black hover:bg-black hover:text-white text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-bold border-2 border-transparent"
              >
                예배 시간 안내
              </Button>
            </div>

            {/* 2. 새가족 등록하기 버튼 */}
            <div className="relative group rounded-full">
              {/* 호버 시 나타나는 그라데이션 테두리 (배경) */}
              <div className="absolute -inset-[2px] rounded-full bg-gradient-to-r from-sky-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]" />

              <Button
                size="lg"
                variant="outline"
                className="relative bg-black/40 backdrop-blur-md border-2 border-white text-white hover:bg-white hover:text-black hover:border-transparent text-lg px-8 py-6 rounded-full transition-all duration-300 hover:scale-105 font-bold shadow-xl"
              >
                새가족 등록하기
              </Button>
            </div>
          </div>
        </motion.div>

        {/* 스크롤 인디케이터 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer z-30"
          onClick={scrollToContent}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center gap-2 drop-shadow-xl"
          >
            <span className="text-sm font-bold text-white uppercase tracking-widest" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>Scroll</span>
            <ChevronDown className="w-6 h-6 text-white" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
