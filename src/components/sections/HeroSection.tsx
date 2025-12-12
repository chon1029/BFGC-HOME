'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import type { Swiper as SwiperType } from 'swiper';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

// 슬라이드 데이터
const SLIDES = [
  {
    id: 1,
    subtitle: "Vision 2025",
    title: "2025 표어",
    description: "이 땅위에 세워진 교회는 예수님의 영광스러운 재림의 때까지\n그 사명을 다해야 합니다. 우리 부다페스트한인선교교회는 '지속가능한 교회'로 세워지기 위해 다음세대를 세우고\n뜨겁게 헌신하는 공동체 입니다.",
    bgImage: "/images/carousel/slogan-bg.png",
    thumbnail: "/images/carousel/slogan.png",
  },
  {
    id: 2,
    subtitle: "Worship",
    title: "예배",
    description: "예배는 하나님의 백성들이 세상을 향해 '자기 정체성'을 분명하게 드러내는 것입니다. 우리 교회는 하나님의 강력한 임재를 사모하며 '영과 진리로 충만한' 예배에 헌신된 공동체 입니다.",
    bgImage: "/images/carousel/worship-bg.jpg",
    thumbnail: "/images/carousel/worship.jpg",
  },
  {
    id: 3,
    subtitle: "Mission",
    title: "선교",
    description: "교회의 사명은 '천하 만민에게 복음을 전파하는 것'입니다.\n비록 세계를 누비며 복음을 증거하지 못하지만 \n이 땅 헝가리만은 우리의 책임임을 고백하며 \n복음의 증인의 사명을 다하기 위해 헌신된 공동체 입니다.",
    bgImage: "/images/carousel/mission-bg.jpg",
    thumbnail: "/images/carousel/mission.jpg",
  },
  {
    id: 4,
    subtitle: "Discipleship",
    title: "양육",
    description: "미래세대의 희망인 우리 아이들에게 \n우리 부다페스트한인선교교회는 단순한 지식을 전달하는 곳이 아니라 전인격적인 양육을 통해 바르고 정직한 믿음의 사람으로 세우기 위해 헌신하는 공동체 입니다.",
    bgImage: "/images/carousel/nurturing-bg.jpg",
    thumbnail: "/images/carousel/nurturing.jpg",
  },
  {
    id: 5,
    subtitle: "Healing",
    title: "치유",
    description: "의학의 발달로 치료하지 못하는 질병이 거의 사라지고 있지만 내면의 질병은 점점 더 깊어지고 확대되고 있습니다. \n우리 부다페스트한인선교교회는 \n상한 심령을 치유하는 은혜의 공동체 입니다.",
    bgImage: "/images/carousel/healing-bg.jpg",
    thumbnail: "/images/carousel/healing.jpg",
  },
  {
    id: 6,
    subtitle: "Fellowship",
    title: "교제",
    description: "개인주의가 만연하여 비인간화가 심화되고 있는 때에 \n우리 부다페스트한인선교교회는 모든 세대를 향한 \n선한 이웃이 되어 지역사회를 섬기며 삶을 나누기 위해 \n활짝 열려 있는 희망의 공동체 입니다.",
    bgImage: "/images/carousel/fellowship-bg.jpg",
    thumbnail: "/images/carousel/fellowship.jpg",
  },
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [bgSwiper, setBgSwiper] = useState<SwiperType | null>(null);
  const [thumbSwiper, setThumbSwiper] = useState<SwiperType | null>(null);

  // 수동 싱크 제어 (Thumb -> BG)
  // 썸네일이 바뀌면 배경도 바꾼다. (Controller 모듈 대신 사용)
  const handleSlideChange = (swiper: SwiperType) => {
    const index = swiper.realIndex;
    setActiveIndex(index);
    if (bgSwiper) {
      bgSwiper.slideToLoop(index);
    }
  };

  // 텍스트 애니메이션 설정
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: custom * 0.05,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
    exit: { opacity: 0, y: -20, filter: 'blur(5px)', transition: { duration: 0.3 } }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black text-white">

      {/* 1. 배경 이미지 슬라이더 (Swiper Effect Fade) */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[EffectFade]}
          effect="fade"
          onSwiper={setBgSwiper}
          allowTouchMove={false} // 배경 터치 금지
          loop={true}
          className="w-full h-full"
        >
          {SLIDES.map((slide, index) => (
            <SwiperSlide key={slide.id} className="relative w-full h-full">
              {/* 배경 이미지 */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={slide.bgImage}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="100vw"
                />
              </div>

              {/* 오버레이 (가독성 확보) */}
              <div className="absolute inset-0 bg-black/40 z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent z-10" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 2. 메인 컨텐츠 (좌측 텍스트) */}
      <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center pb-20 lg:pb-0 lg:justify-center">
        <div className="max-w-2xl lg:ml-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              {/* Subtitle */}
              <motion.div
                variants={textVariants}
                custom={0}
                className="flex items-center space-x-4 text-yellow-400 tracking-[0.3em] uppercase font-bold text-sm md:text-base"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
              >
                <span className="w-10 h-[2px] bg-yellow-400 inline-block"></span>
                <span>{SLIDES[activeIndex].subtitle}</span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                variants={textVariants}
                custom={1}
                className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight text-white"
                style={{ textShadow: '0 4px 20px rgba(0,0,0,0.6)' }}
              >
                {SLIDES[activeIndex].title}
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={textVariants}
                custom={2}
                className="text-gray-200 text-base md:text-xl leading-relaxed max-w-xl break-keep font-medium whitespace-pre-line"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
              >
                {SLIDES[activeIndex].description}
              </motion.p>

              {/* Button */}
              <motion.div variants={textVariants} custom={3} className="pt-8">
                <Link href="/guide/greeting" className="group relative block w-fit px-8 py-3 bg-transparent overflow-hidden rounded-full border border-white/50 transition-all duration-300 hover:border-yellow-400 hover:text-black">
                  <div className="absolute inset-0 w-full h-full bg-yellow-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]" />
                  <div className="relative flex items-center space-x-3">
                    <span className="uppercase tracking-widest text-sm font-bold">Discover More</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 3. 우측 하단 카드 슬라이더 */}
      <div className="absolute bottom-0 right-0 z-30 w-full lg:w-[55%] h-auto pl-4 lg:pl-0 overflow-visible flex items-end pb-8 lg:pb-12">
        <Swiper
          modules={[Navigation, Autoplay]}
          onSwiper={setThumbSwiper}
          onSlideChange={handleSlideChange}
          spaceBetween={16}
          slidesPerView={1.5}
          centeredSlides={false}
          breakpoints={{
            640: { slidesPerView: 2.2, spaceBetween: 20 },
            1024: { slidesPerView: 3.2, spaceBetween: 24 },
            1400: { slidesPerView: 3.5, spaceBetween: 30 },
          }}
          grabCursor={true}
          loop={true}
          speed={800}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="!overflow-visible w-full pr-4 lg:pr-12"
        >
          {SLIDES.map((slide) => (
            <SwiperSlide key={slide.id} className="!h-auto flex items-end group cursor-pointer">
              {({ isActive }) => (
                <div
                  className={`relative w-full overflow-hidden rounded-xl transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] origin-bottom ${isActive
                    ? 'h-[280px] lg:h-[380px] shadow-2xl shadow-black/60 ring-1 ring-white/40 z-10'
                    : 'h-[160px] lg:h-[220px] opacity-70 hover:opacity-100 hover:h-[180px] lg:hover:h-[240px] z-0'
                    }`}
                >
                  {/* 썸네일 이미지 */}
                  <Image
                    src={slide.thumbnail}
                    alt={slide.title}
                    fill
                    className={`object-cover transition-transform duration-1000 ${isActive ? 'scale-110' : 'scale-100 group-hover:scale-105'
                      }`}
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />

                  {/* 그라데이션 오버레이 */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-60' : 'opacity-40'
                    }`} />

                  {/* 텍스트 정보 */}
                  <div className="absolute bottom-0 left-0 w-full p-4 lg:p-6">
                    <p className={`text-xs font-bold text-yellow-400 uppercase tracking-wider mb-1 transition-all duration-500 delay-100 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                      }`}>
                      {slide.subtitle}
                    </p>
                    <h3 className={`text-white font-bold leading-tight transition-all duration-500 ${isActive ? 'text-xl lg:text-2xl' : 'text-base lg:text-lg'
                      }`}
                      style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
                    >
                      {slide.title}
                    </h3>
                  </div>

                  {/* 활성화 상태 표시 바 */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
                    <div
                      className={`h-full bg-yellow-400 transition-all duration-[5000ms] linear ${isActive ? 'w-full' : 'w-0'
                        }`}
                    />
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}

          {/* 네비게이션 버튼 */}
          <div className="absolute -top-16 left-0 flex space-x-3 z-40 pl-1">
            <button
              className="p-3 bg-white/10 hover:bg-white text-white hover:text-black rounded-full backdrop-blur-md transition-all duration-300 border border-white/20 hover:scale-110"
              onClick={() => thumbSwiper?.slidePrev()}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              className="p-3 bg-white/10 hover:bg-white text-white hover:text-black rounded-full backdrop-blur-md transition-all duration-300 border border-white/20 hover:scale-110"
              onClick={() => thumbSwiper?.slideNext()}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </Swiper>
      </div>

      {/* 슬라이드 번호 표시 */}
      <div className="absolute bottom-8 left-8 lg:left-16 z-20 text-white/20 font-black text-6xl lg:text-9xl leading-none select-none hidden md:block pointer-events-none">
        0{activeIndex + 1}
      </div>

    </section>
  );
}
