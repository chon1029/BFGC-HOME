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
    label: '교회소개',
    href: '/about',
    children: [
      {
        label: '인사말',
        href: '/about/greeting',
        description: '담임목사 인사말',
      },
      {
        label: '교회연혁',
        href: '/about/history',
        description: '교회의 역사와 발자취',
      },
      {
        label: '섬기는 사람들',
        href: '/about/staff',
        description: '목회자 및 교역자 소개',
      },
      {
        label: '찾아오시는 길',
        href: '/about/location',
        description: '교회 위치 및 교통편',
      },
    ],
  },
  {
    label: '예배',
    href: '/worship',
    children: [
      {
        label: '예배시간',
        href: '/worship/schedule',
        description: '주일예배 및 각종 예배 시간',
      },
      {
        label: '설교말씀',
        href: '/worship/sermons',
        description: '주일 설교 및 말씀 자료',
      },
      {
        label: '온라인 예배',
        href: '/worship/online',
        description: '실시간 온라인 예배',
      },
    ],
  },
  {
    label: '사역',
    href: '/ministry',
    children: [
      {
        label: '선교',
        href: '/ministry/mission',
        description: '국내외 선교 사역',
      },
      {
        label: '양육',
        href: '/ministry/discipleship',
        description: '성도 양육 프로그램',
      },
      {
        label: '치유',
        href: '/ministry/healing',
        description: '치유 및 회복 사역',
      },
      {
        label: '다음세대',
        href: '/ministry/next-generation',
        description: '어린이·청소년 사역',
      },
    ],
  },
  {
    label: '공동체',
    href: '/community',
    children: [
      {
        label: '교제',
        href: '/community/fellowship',
        description: '구역·소그룹 모임',
      },
      {
        label: '새가족',
        href: '/community/newcomer',
        description: '새가족 등록 및 안내',
      },
      {
        label: '갤러리',
        href: '/community/gallery',
        description: '교회 사진 및 영상',
      },
    ],
  },
  {
    label: '알림',
    href: '/notice',
    children: [
      {
        label: '주보',
        href: '/notice/bulletin',
        description: '주간 교회 소식',
      },
      {
        label: '일정',
        href: '/notice/calendar',
        description: '교회 행사 일정',
      },
      {
        label: '매일성경',
        href: '/notice/daily-bread',
        description: '매일 묵상 자료',
      },
    ],
  },
]

/**
 * 푸터 네비게이션 메뉴 데이터
 */
export const footerNavigation = {
  about: [
    { label: '교회소개', href: '/about' },
    { label: '인사말', href: '/about/greeting' },
    { label: '찾아오시는 길', href: '/about/location' },
  ],
  worship: [
    { label: '예배시간', href: '/worship/schedule' },
    { label: '설교말씀', href: '/worship/sermons' },
    { label: '온라인예배', href: '/worship/online' },
  ],
  community: [
    { label: '새가족', href: '/community/newcomer' },
    { label: '교제', href: '/community/fellowship' },
    { label: '갤러리', href: '/community/gallery' },
  ],
  notice: [
    { label: '주보', href: '/notice/bulletin' },
    { label: '일정', href: '/notice/calendar' },
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
    href: '/worship/schedule',
    variant: 'default' as const,
  },
  {
    label: '새가족 등록',
    href: '/community/newcomer',
    variant: 'secondary' as const,
  },
  {
    label: '온라인 예배',
    href: '/worship/online',
    variant: 'outline' as const,
  },
]
