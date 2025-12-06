# 부다페스트한인선교교회 홈페이지 - 디자인 시스템

**버전**: v1.0.0
**최종 수정**: 2025-12-06
**작성자**: 마스터님 & 코딩
**상태**: 확정

---

## 🎨 디자인 철학

### 핵심 가치
- **신뢰**: 안정적이고 믿을 수 있는 디자인
- **열정**: 생동감 있고 따뜻한 분위기
- **현대성**: 모던하면서도 접근하기 쉬운 UI
- **명확성**: 정보를 쉽고 빠르게 찾을 수 있는 구조

### 디자인 원칙
1. **일관성**: 모든 페이지에서 동일한 디자인 언어
2. **단순성**: 불필요한 요소 제거, 핵심만 표현
3. **계층**: 정보의 중요도에 따른 시각적 계층 구조
4. **접근성**: 모든 사용자가 쉽게 사용할 수 있는 디자인

---

## 🎨 컬러 시스템

### 브랜드 컬러

#### Primary (주 색상) - 보라/남색
```css
--primary-50: #f0efff;
--primary-100: #e0deff;
--primary-200: #c7c3ff;
--primary-300: #a39eff;
--primary-400: #7b70ff;
--primary-500: #0c076d;  /* 메인 */
--primary-600: #090555;
--primary-700: #06033d;
--primary-800: #040228;
--primary-900: #02011a;
```

**사용 예시**:
- 헤더 배경
- 주요 버튼
- 링크 텍스트
- 아이콘 강조
- 섹션 배경 (연한 톤)

#### Accent (강조 색상) - 오렌지
```css
--accent-50: #fff5f0;
--accent-100: #ffe8dc;
--accent-200: #ffd4c3;
--accent-300: #ffb89a;
--accent-400: #ff9466;
--accent-500: #fb5800;  /* 메인 */
--accent-600: #c84600;
--accent-700: #953400;
--accent-800: #632300;
--accent-900: #3e1600;
```

**사용 예시**:
- CTA 버튼
- 중요한 알림
- 호버 효과
- 강조 텍스트
- 아이콘 포인트

### Neutral (중성 색상)
```css
--neutral-50: #fafafa;
--neutral-100: #f5f5f5;
--neutral-200: #e5e5e5;
--neutral-300: #d4d4d4;
--neutral-400: #a3a3a3;
--neutral-500: #737373;
--neutral-600: #525252;
--neutral-700: #404040;
--neutral-800: #262626;
--neutral-900: #171717;
```

**사용 예시**:
- 본문 텍스트 (900)
- 보조 텍스트 (600)
- 테두리 (300)
- 배경 (50, 100)
- 비활성 요소 (400)

### Semantic Colors (의미 색상)
```css
/* Success - 성공 */
--success: #10b981;
--success-light: #d1fae5;
--success-dark: #065f46;

/* Warning - 경고 */
--warning: #f59e0b;
--warning-light: #fef3c7;
--warning-dark: #92400e;

/* Error - 오류 */
--error: #ef4444;
--error-light: #fee2e2;
--error-dark: #991b1b;

/* Info - 정보 */
--info: #3b82f6;
--info-light: #dbeafe;
--info-dark: #1e3a8a;
```

### Tailwind CSS 설정
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0efff',
          100: '#e0deff',
          200: '#c7c3ff',
          300: '#a39eff',
          400: '#7b70ff',
          500: '#0c076d',
          600: '#090555',
          700: '#06033d',
          800: '#040228',
          900: '#02011a',
          DEFAULT: '#0c076d',
        },
        accent: {
          50: '#fff5f0',
          100: '#ffe8dc',
          200: '#ffd4c3',
          300: '#ffb89a',
          400: '#ff9466',
          500: '#fb5800',
          600: '#c84600',
          700: '#953400',
          800: '#632300',
          900: '#3e1600',
          DEFAULT: '#fb5800',
        },
      },
    },
  },
}
```

---

## 📝 타이포그래피

### 폰트 패밀리

#### 메인 폰트: SC Dream (에스코어 드림)
```css
@font-face {
  font-family: 'SC Dream';
  src: url('/fonts/SCDream1.woff2') format('woff2');
  font-weight: 100;
  font-display: swap;
}
/* ... 200~900 반복 */
```

**특징**:
- 한글 전용 폰트
- 9가지 웨이트 (100, 200, 300, 400, 500, 600, 700, 800, 900)
- 깔끔하고 현대적인 느낌

#### 폴백 폰트
```css
font-family: 'SC Dream', 'Noto Sans KR', -apple-system, BlinkMacSystemFont,
             'Segoe UI', sans-serif;
```

### 폰트 스케일

#### 데스크톱 (1024px+)
```css
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;        /* 48px */
--text-6xl: 3.75rem;     /* 60px */
--text-7xl: 4.5rem;      /* 72px */
```

#### 모바일 (0-767px)
```css
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 2rem;        /* 32px */
--text-4xl: 2.5rem;      /* 40px */
--text-5xl: 3rem;        /* 48px */
```

### 폰트 웨이트
```css
--font-thin: 100;
--font-extralight: 200;
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
--font-black: 900;
```

### 사용 가이드라인

| 요소 | 크기 (Desktop) | 크기 (Mobile) | 웨이트 | 색상 |
|------|----------------|---------------|--------|------|
| H1 (메인 타이틀) | 7xl (72px) | 4xl (40px) | 700 | primary-900 |
| H2 (섹션 제목) | 5xl (48px) | 3xl (32px) | 700 | primary-900 |
| H3 (서브 제목) | 3xl (30px) | 2xl (24px) | 600 | primary-800 |
| H4 | 2xl (24px) | xl (20px) | 600 | primary-800 |
| H5 | xl (20px) | lg (18px) | 600 | primary-700 |
| H6 | lg (18px) | base (16px) | 600 | primary-700 |
| Body (본문) | base (16px) | base (16px) | 400 | neutral-900 |
| Body Small | sm (14px) | sm (14px) | 400 | neutral-700 |
| Caption | xs (12px) | xs (12px) | 400 | neutral-600 |
| Button Text | base (16px) | base (16px) | 600 | white |
| Link | base (16px) | base (16px) | 500 | primary-500 |

### 줄 높이 (Line Height)
```css
--leading-none: 1;
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;
```

---

## 📏 간격 시스템 (Spacing)

### 스페이스 스케일
```css
--spacing-0: 0;
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-5: 1.25rem;   /* 20px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-10: 2.5rem;   /* 40px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
--spacing-20: 5rem;     /* 80px */
--spacing-24: 6rem;     /* 96px */
--spacing-32: 8rem;     /* 128px */
```

### 사용 가이드
- **컴포넌트 내부 패딩**: 4, 6, 8
- **컴포넌트 간 간격**: 8, 12, 16
- **섹션 패딩**: 16, 20, 24 (모바일: 8, 12, 16)
- **컨테이너 좌우 여백**: 4 (모바일), 6 (태블릿), 8 (데스크톱)

---

## 🎯 레이아웃

### 컨테이너
```css
.container {
  width: 100%;
  max-width: 1280px;    /* 최대 너비 */
  margin: 0 auto;
  padding: 0 1rem;      /* 모바일 */
}

@media (min-width: 768px) {
  .container {
    padding: 0 1.5rem;  /* 태블릿 */
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 2rem;    /* 데스크톱 */
  }
}
```

### 그리드 시스템
```css
/* 12 컬럼 그리드 */
.grid-cols-12 { grid-template-columns: repeat(12, 1fr); }

/* 반응형 그리드 */
.grid-responsive {
  grid-template-columns: 1fr;           /* 모바일: 1열 */
}

@media (min-width: 768px) {
  .grid-responsive {
    grid-template-columns: repeat(2, 1fr);  /* 태블릿: 2열 */
  }
}

@media (min-width: 1024px) {
  .grid-responsive {
    grid-template-columns: repeat(3, 1fr);  /* 데스크톱: 3열 */
  }
}
```

### 브레이크포인트
```typescript
const breakpoints = {
  sm: '640px',     // 스마트폰
  md: '768px',     // 태블릿
  lg: '1024px',    // 데스크톱
  xl: '1280px',    // 대형 데스크톱
  '2xl': '1536px', // 초대형 화면
}
```

---

## 🎨 컴포넌트 스타일

### 버튼

#### Primary Button
```tsx
<Button className="
  bg-primary-500 hover:bg-primary-600
  text-white font-semibold
  px-6 py-3 rounded-lg
  transition-all duration-300
  shadow-md hover:shadow-lg
  active:scale-95
">
  버튼 텍스트
</Button>
```

#### Secondary Button (Accent)
```tsx
<Button className="
  bg-accent-500 hover:bg-accent-600
  text-white font-semibold
  px-6 py-3 rounded-lg
  transition-all duration-300
  shadow-md hover:shadow-lg
  active:scale-95
">
  강조 버튼
</Button>
```

#### Outline Button
```tsx
<Button variant="outline" className="
  border-2 border-primary-500
  text-primary-500 hover:bg-primary-50
  font-semibold px-6 py-3 rounded-lg
  transition-all duration-300
">
  아웃라인 버튼
</Button>
```

#### Ghost Button
```tsx
<Button variant="ghost" className="
  text-primary-500 hover:bg-primary-50
  font-medium px-6 py-3 rounded-lg
  transition-all duration-300
">
  고스트 버튼
</Button>
```

### 카드

#### Basic Card
```tsx
<Card className="
  bg-white rounded-xl shadow-md
  overflow-hidden
  hover:shadow-xl transition-shadow duration-300
">
  <CardContent className="p-6">
    {/* 콘텐츠 */}
  </CardContent>
</Card>
```

#### Image Card
```tsx
<Card className="
  bg-white rounded-xl overflow-hidden
  hover:shadow-xl transition-all duration-300
  group cursor-pointer
">
  <div className="relative h-48 overflow-hidden">
    <Image
      src="/image.jpg"
      alt="설명"
      className="object-cover group-hover:scale-110 transition-transform duration-300"
    />
  </div>
  <CardContent className="p-6">
    <h3 className="text-xl font-bold mb-2">제목</h3>
    <p className="text-neutral-600">설명</p>
  </CardContent>
</Card>
```

### 입력 필드

#### Text Input
```tsx
<Input
  type="text"
  placeholder="이름을 입력하세요"
  className="
    w-full px-4 py-3
    border border-neutral-300
    rounded-lg
    focus:border-primary-500 focus:ring-2 focus:ring-primary-200
    transition-all duration-200
  "
/>
```

#### Textarea
```tsx
<Textarea
  placeholder="내용을 입력하세요"
  className="
    w-full px-4 py-3
    border border-neutral-300
    rounded-lg
    focus:border-primary-500 focus:ring-2 focus:ring-primary-200
    transition-all duration-200
    resize-none
  "
  rows={5}
/>
```

---

## 🎬 애니메이션

### 기본 트랜지션
```css
/* 빠른 트랜지션 (버튼, 호버) */
transition: all 0.2s ease-in-out;

/* 중간 트랜지션 (카드, 모달) */
transition: all 0.3s ease-in-out;

/* 느린 트랜지션 (페이지 전환) */
transition: all 0.5s ease-in-out;
```

### Framer Motion 애니메이션

#### 페이드인
```typescript
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
}
```

#### 슬라이드업
```typescript
const slideUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}
```

#### 스케일
```typescript
const scale = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.3 }
}
```

#### 순차 애니메이션
```typescript
const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}
```

---

## 🖼️ 이미지 & 미디어

### 이미지 비율
- **Hero 배경**: 16:9 또는 21:9
- **설교 썸네일**: 16:9
- **갤러리 사진**: 4:3 또는 1:1
- **프로필 사진**: 1:1 (정사각형)

### 이미지 최적화
- **포맷**: WebP (PNG/JPG 폴백)
- **품질**: 90%
- **반응형 크기**:
  - Mobile: 640px
  - Tablet: 1024px
  - Desktop: 1920px
- **Lazy Loading**: 모든 이미지 (Hero 제외)

---

## ♿ 접근성 (Accessibility)

### 색상 대비
- **텍스트 / 배경**: 최소 4.5:1 (AA)
- **대형 텍스트 / 배경**: 최소 3:1 (AA)
- **인터랙티브 요소**: 명확한 포커스 상태

### 포커스 상태
```css
/* 포커스 링 */
.focus-visible:focus {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}
```

### Alt 텍스트
- 모든 이미지에 의미있는 한국어 alt 텍스트
- 장식용 이미지: `alt=""`

### ARIA 레이블
- 버튼: `aria-label` 명확히
- 네비게이션: `<nav aria-label="메인 메뉴">`
- 랜드마크: `<main>`, `<header>`, `<footer>` 사용

---

## 📱 반응형 디자인

### 모바일 (0-767px)
- 1열 레이아웃
- 폰트 크기 축소 (H1: 40px)
- 패딩/마진 축소
- 터치 타겟 최소 44x44px
- 햄버거 메뉴

### 태블릿 (768-1023px)
- 2열 레이아웃
- 중간 폰트 크기
- 중간 패딩/마진
- 데스크톱 메뉴 or 햄버거

### 데스크톱 (1024px+)
- 3-4열 레이아웃
- 최대 폰트 크기 (H1: 72px)
- 넓은 패딩/마진
- 풀 네비게이션

---

## 🎨 다크 모드 (선택 사항)

추후 필요 시 추가 가능:
```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: var(--neutral-900);
    --foreground: var(--neutral-50);
    --primary: /* 조정된 primary 색상 */;
  }
}
```

---

## 🔄 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| v1.0.0 | 2025-12-06 | 초기 작성 | 마스터님 & 코딩 |

---

**이 문서는 프로젝트의 모든 디자인 표준을 정의합니다.**
