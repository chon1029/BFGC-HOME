import { cn } from '@/lib/utils'

/**
 * SectionHeading 컴포넌트 Props
 */
interface SectionHeadingProps {
  title: string                  // 제목
  subtitle?: string              // 부제목 (선택)
  description?: string           // 설명 (선택)
  align?: 'left' | 'center' | 'right'  // 정렬
  className?: string             // 추가 CSS 클래스
}

/**
 * 섹션 헤딩 컴포넌트
 * - 제목, 부제목, 설명 포함
 * - 정렬 옵션 (왼쪽/중앙/오른쪽)
 * - 반응형 타이포그래피
 *
 * @param props - 헤딩 속성
 * @returns 섹션 헤딩 요소
 */
export function SectionHeading({
  title,
  subtitle,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'space-y-4',
        align === 'left' && 'text-left',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        className
      )}
    >
      {/* 부제목 */}
      {subtitle && (
        <p className="text-sm font-semibold uppercase tracking-wider text-primary-500">
          {subtitle}
        </p>
      )}

      {/* 제목 */}
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {title}
      </h2>

      {/* 설명 */}
      {description && (
        <p className={cn(
          'text-base text-muted-foreground sm:text-lg',
          align === 'center' && 'mx-auto max-w-2xl',
        )}>
          {description}
        </p>
      )}
    </div>
  )
}
