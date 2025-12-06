import { cn } from '@/lib/utils'
import { OptimizedImage } from './OptimizedImage'
import { Container } from './Container'

/**
 * PageHero 컴포넌트 Props
 */
interface PageHeroProps {
  title: string                   // 페이지 제목
  subtitle?: string               // 부제목 (선택)
  description?: string            // 설명 (선택)
  backgroundImage?: string        // 배경 이미지 경로
  overlay?: boolean               // 배경 오버레이 추가
  height?: 'small' | 'medium' | 'large'  // 높이
  className?: string              // 추가 CSS 클래스
}

/**
 * 페이지 히어로 컴포넌트
 * - 서브 페이지 상단 배너
 * - 배경 이미지 옵션
 * - 오버레이 효과
 * - 반응형 높이
 *
 * @param props - 히어로 속성
 * @returns 페이지 히어로 섹션
 */
export function PageHero({
  title,
  subtitle,
  description,
  backgroundImage,
  overlay = true,
  height = 'medium',
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        'relative flex items-center justify-center overflow-hidden',
        // 높이별 클래스
        height === 'small' && 'min-h-[200px] sm:min-h-[250px]',
        height === 'medium' && 'min-h-[300px] sm:min-h-[400px]',
        height === 'large' && 'min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]',
        className
      )}
    >
      {/* 배경 이미지 */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src={backgroundImage}
            alt={`${title} 배경 이미지`}
            fill
            objectFit="cover"
            priority
            className="brightness-50"
          />
        </div>
      )}

      {/* 오버레이 */}
      {overlay && (
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 to-black/40" />
      )}

      {/* 콘텐츠 */}
      <Container className="relative z-20 py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          {/* 부제목 */}
          {subtitle && (
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-300">
              {subtitle}
            </p>
          )}

          {/* 제목 */}
          <h1 className={cn(
            'text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl',
            backgroundImage ? 'text-white' : 'text-foreground'
          )}>
            {title}
          </h1>

          {/* 설명 */}
          {description && (
            <p className={cn(
              'text-base sm:text-lg md:text-xl leading-relaxed',
              backgroundImage ? 'text-gray-200' : 'text-muted-foreground'
            )}>
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  )
}
