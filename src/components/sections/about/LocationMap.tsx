'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/common/Container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, ExternalLink, Star } from 'lucide-react'

/**
 * 지도 섹션
 * - Google Maps 임베드
 * - 주소 정보
 * - 평점 표시
 * - 큰 지도로 보기 버튼
 *
 * @returns 지도 섹션 JSX
 */
export default function LocationMap() {
  /**
   * Google Maps에서 크게 보기
   */
  const openGoogleMaps = () => {
    window.open(
      'https://www.google.com/maps/place/Budapest,+Ósvát+u.+16,+1073/@47.5015,19.0622,17z',
      '_blank'
    )
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-sky-50/30">
      <Container>
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 text-base px-6 py-2">
            <span className="text-2xl font-bold mr-2">02</span>
            지도
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            교회 <span className="bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">위치</span> 확인
          </h2>
        </motion.div>

        {/* 지도 & 정보 */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200"
          >
            {/* Google Maps */}
            <div className="relative w-full h-[400px] md:h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2695.513751466512!2d19.0701364!3d47.4993852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dc66ddb89605%3A0xd588a3077bb8a1df!2z67aA64uk7Y6Y7Iqk7Yq4IO2VnOyduOyEoOq1kOq1kO2ajA!5e0!3m2!1sko!2shu!4v1765190631425!5m2!1sko!2shu"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            {/* 지도 정보 */}
            <div className="p-8 space-y-6">
              {/* 주소 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-400 to-purple-500 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-white" fill="white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">부다페스트한인선교교회</h3>
                  <p className="text-lg text-muted-foreground">
                    Budapest, Ósvát u. 16, 1073 Hungary
                  </p>
                </div>
              </div>

              {/* 구분선 */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

              {/* 평점 & 버튼 */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* 평점 */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${star <= 4
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold">4.7</span>
                  <span className="text-sm text-muted-foreground">(22개 리뷰)</span>
                </div>

                {/* 버튼 */}
                <Button
                  onClick={openGoogleMaps}
                  size="lg"
                  className="bg-gradient-to-r from-sky-500 to-purple-500 hover:from-sky-600 hover:to-purple-600 text-white"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  큰 지도로 보기
                </Button>
              </div>
            </div>
          </motion.div>

          {/* 길찾기 안내 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <div className="inline-block bg-gradient-to-r from-purple-50 to-sky-50 rounded-xl p-6 border border-purple-200">
              <p className="text-sm text-muted-foreground">
                지도를 클릭하시면 길찾기를 이용하실 수 있습니다
                <br className="hidden sm:block" />
                <span className="font-semibold text-purple-600">Google Maps</span>에서 정확한 경로를 확인하세요
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
