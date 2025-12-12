import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * OptimizedImage 컴포넌트 Props
 */
interface OptimizedImageProps {
  src: string                    // 이미지 경로
  alt: string                    // 대체 텍스트 (접근성)
  width?: number                 // 너비 (선택)
  height?: number                // 높이 (선택)
  fill?: boolean                 // 부모 컨테이너 채우기
  priority?: boolean             // 우선 로딩 (Hero 이미지용)
  className?: string             // 추가 CSS 클래스
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'  // 객체 맞춤 방식
  quality?: number               // 이미지 품질 (1-100)
  sizes?: string                 // 반응형 사이즈
  style?: React.CSSProperties    // 인라인 스타일
}

/**
 * 최적화된 이미지 컴포넌트
 * - Next.js Image 컴포넌트 래퍼
 * - WebP 자동 변환, 반응형, Lazy loading
 * - 접근성 (alt 텍스트 필수)
 *
 * @param props - 이미지 속성
 * @returns Next.js Image 컴포넌트
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className,
  objectFit = 'cover',
  quality = 90,
  sizes,
  style,
}: OptimizedImageProps) {
  // fill 모드
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={quality}
        sizes={sizes || '100vw'}
        className={cn(
          objectFit === 'cover' && 'object-cover',
          objectFit === 'contain' && 'object-contain',
          objectFit === 'fill' && 'object-fill',
          objectFit === 'none' && 'object-none',
          objectFit === 'scale-down' && 'object-scale-down',
          className
        )}
        style={style}
      />
    )
  }

  // 고정 크기 모드
  if (width && height) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={quality}
        sizes={sizes}
        className={cn(
          objectFit === 'cover' && 'object-cover',
          objectFit === 'contain' && 'object-contain',
          className
        )}
        style={style}
      />
    )
  }

  // 기본값: width/height 필요
  console.warn('OptimizedImage: width와 height 또는 fill prop이 필요합니다.')
  return null
}
