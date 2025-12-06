import { cn } from '@/lib/utils'

/**
 * Container 컴포넌트 Props
 */
interface ContainerProps {
  children: React.ReactNode      // 자식 요소
  className?: string             // 추가 CSS 클래스
  size?: 'default' | 'narrow' | 'wide' | 'full'  // 컨테이너 크기
  padding?: boolean              // 패딩 추가 여부
  as?: 'div' | 'section' | 'article' | 'main'  // HTML 태그
}

/**
 * 반응형 컨테이너 컴포넌트
 * - 최대 너비 제한, 중앙 정렬
 * - 반응형 패딩 (모바일/태블릿/데스크톱)
 * - 사이즈 옵션 (narrow, default, wide, full)
 *
 * @param props - 컨테이너 속성
 * @returns 컨테이너 요소
 */
export function Container({
  children,
  className,
  size = 'default',
  padding = true,
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component
      className={cn(
        'mx-auto w-full',
        // 사이즈별 최대 너비
        size === 'narrow' && 'max-w-3xl',
        size === 'default' && 'max-w-7xl',
        size === 'wide' && 'max-w-[1440px]',
        size === 'full' && 'max-w-full',
        // 패딩
        padding && 'px-4 sm:px-6 lg:px-8',
        className
      )}
    >
      {children}
    </Component>
  )
}
