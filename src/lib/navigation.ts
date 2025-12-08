// 네비게이션 메뉴 데이터 구조

/**
 * 네비게이션 메뉴 아이템 타입
 */
export interface NavItem {
  label: string           // 메뉴 표시 텍스트
  href: string           // 링크 경로
  description?: string   // 메뉴 설명 (드롭다운용)
  children?: NavItem[]   // 서브메뉴 (드롭다운)
}

/**
 * 메인 네비게이션 메뉴 데이터
 */
export const mainNavigation: NavItem[] = [
  {
    label: '홈',
    href: '/',
  },
  {
    label: '교회안내',
    href: '/guide',
    children: [
      {
        label: '인사말씀',
        href: '/guide/greeting',
        description: '담임목사 인사말',
      },
      {
        label: '교회비전',
        href: '/guide/vision',
        description: '교회의 비전과 사명',
      },
      {
        label: '새가족등록안내',
        href: '/guide/newcomer',
        description: '새가족 등록 및 안내',
      },
      {
        label: '예배시간안내',
        href: '/guide/schedule',
        description: '주일예배 및 각종 예배 시간',
      },
      {
        label: '교회오시는길',
        href: '/guide/location',
        description: '교회 위치 및 교통편',
      },
    ],
  },
  {
    label: '예배•양육',
    href: '/worship',
    children: [
      {
        label: '주일설교',
        href: '/worship/sermons',
        description: '주일 설교 및 말씀 자료',
      },
      {
        label: '일용할양식',
        href: '/worship/daily-bread',
        description: '매일 묵상 자료',
      },
      {
        label: '제자훈련',
        href: '/worship/discipleship',
        description: '성도 양육 프로그램',
      },
    ],
  },
  {
    label: '다음세대',
    href: '/next-generation',
    children: [
      {
        label: '킹스키즈',
        href: '/next-generation/kings-kids',
        description: '어린이 사역',
      },
      {
        label: '샘스쿨',
        href: '/next-generation/sam-school',
        description: '중고등부 사역',
      },
      {
        label: '여호수아 청년부',
        href: '/next-generation/joshua',
        description: '청년 사역',
      },
    ],
  },
  {
    label: '교회생활',
    href: '/life',
    children: [
      {
        label: '주보',
        href: '/life/bulletin',
        description: '주간 교회 소식',
      },
      {
        label: '사진게시판',
        href: '/life/gallery',
        description: '교회 사진 및 영상',
      },
      {
        label: '주간기도문',
        href: '/life/prayer',
        description: '이 땅을 새롭게 하는 기도',
      },
    ],
  },
  {
    label: 'Contact',
    href: '/contact',
  },
]

/**
 * 푸터 네비게이션 메뉴 데이터
 */
export const footerNavigation = {
  guide: [
    { label: '교회안내', href: '/guide' },
    { label: '인사말씀', href: '/guide/greeting' },
    { label: '교회오시는길', href: '/guide/location' },
  ],
  worship: [
    { label: '예배시간안내', href: '/guide/schedule' },
    { label: '주일설교', href: '/worship/sermons' },
    { label: '일용할양식', href: '/worship/daily-bread' },
  ],
  life: [
    { label: '새가족등록안내', href: '/guide/newcomer' },
    { label: '주보', href: '/life/bulletin' },
    { label: '사진게시판', href: '/life/gallery' },
  ],
  contact: [
    { label: 'Contact', href: '/contact' },
  ],
}

/**
 * 소셜 미디어 링크
 */
export const socialLinks = [
  {
    name: 'YouTube',
    href: 'https://youtube.com/@bfgc',
    icon: 'Youtube',
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/bfgc',
    icon: 'Facebook',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/bfgc',
    icon: 'Instagram',
  },
]

/**
 * 빠른 링크 (CTA 버튼용)
 */
export const quickLinks = [
  {
    label: '예배 시간 안내',
    href: '/guide/schedule',
    variant: 'default' as const,
  },
  {
    label: '새가족 등록',
    href: '/guide/newcomer',
    variant: 'secondary' as const,
  },
  {
    label: '주일 설교',
    href: '/worship/sermons',
    variant: 'outline' as const,
  },
]
