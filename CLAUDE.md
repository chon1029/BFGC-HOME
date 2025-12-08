# 부다페스트한인선교교회 홈페이지 프로젝트 - 작업 원칙

**버전**: v1.0.0
**최종 수정**: 2025-12-06
**작성자**: 마스터님 & 코딩
**상태**: 진행중

---

## 📌 프로젝트 개요

### 기본 정보
- **프로젝트명**: 부다페스트한인선교교회 공식 홈페이지
- **현재 사이트**: www.bfgc3.mycafe24.com (WordPress)
- **목표**: WordPress → Next.js 14 완전 마이그레이션
- **핵심 가치**: 모던하고 강력하며 임팩트 있는 교회 홈페이지
- **배포 환경**: cafe24.com 호스팅

### 프로젝트 목적
1. **반응형 문제 해결**: WordPress Elementor 플러그인의 모바일 반응형 이슈 완전 해결
2. **성능 개선**: 빠른 로딩 속도와 최적화된 사용자 경험
3. **유지보수성**: 플러그인 의존도 제거, 완전한 코드 제어
4. **현대적 디자인**: 강렬한 임팩트와 부드러운 애니메이션

---

## 🌐 핵심 작업 원칙

### 원칙 1: 완전한 한국어 우선 사용

**기본 규칙**:
- ✅ **모든 대화**: 한국어로만 진행
- ✅ **코드 주석**: 100% 한국어 필수
- ✅ **문서/설명**: 모든 문서는 한국어
- ✅ **변수명/함수명**: 영어 (기술적 필수 - camelCase, PascalCase)
- ⚠️ **기술 용어**: 불가피한 경우만 영어 허용

**좋은 코드 예시**:
```typescript
// ✅ 올바른 예시
// 설교 카드 컴포넌트 - 설교 정보를 카드 형태로 표시합니다
interface SermonCardProps {
  title: string        // 설교 제목
  date: string         // 설교 날짜
  preacher: string     // 설교자
  thumbnail: string    // 썸네일 이미지 URL
}

function SermonCard({ title, date, preacher, thumbnail }: SermonCardProps) {
  // 클릭 시 설교 상세 페이지로 이동
  const handleClick = () => {
    router.push(`/worship/sermons/${id}`)
  }

  return (
    // 설교 카드 UI
    <Card onClick={handleClick}>
      {/* 썸네일 이미지 */}
      <Image src={thumbnail} alt={title} />
      {/* 설교 정보 */}
      <CardContent>
        <h3>{title}</h3>
        <p>{date} | {preacher}</p>
      </CardContent>
    </Card>
  )
}
```

```typescript
// ❌ 잘못된 예시
// Sermon card component
function SermonCard({ title, date }: SermonCardProps) {
  // Click handler
  const handleClick = () => { ... }
}
```

---

### 원칙 2: 즉시 코딩 금지 프로토콜

**작업 프로세스**:

```
1. 명령 수신
   ↓
2. 🛑 잠깐! 코딩 금지
   ↓
3. 이해한 내용 피드백 (한국어)
   ↓
4. 💡 개선사항/아이디어 제안 (필수!)
   ↓
5. 마스터님 승인 대기
   ↓
6. "실행" / "고" / "시작" / "OK" 등 명령 확인
   ↓
7. ✅ 코딩 시작
```

**대화 예시**:

```
마스터님: "랜딩 페이지 Hero 섹션 만들어줘"

코딩:
"알겠습니다! Hero 섹션 제작 요청이시군요.

📋 이해한 내용:
- 2025 모토 5가지 핵심 가치 (예배, 선교, 양육, 치유, 교제)
- Framer Motion 애니메이션 효과
- 반응형 디자인 (모바일/태블릿/데스크톱)
- 그라데이션 배경 + 교회 브랜드 컬러

💡 개선 제안:
1. 스크롤 인디케이터 추가 - 사용자에게 아래 콘텐츠 안내
2. 비디오 배경 옵션 - 교회 영상을 배경으로 (모바일은 이미지)
3. CTA 버튼 2개 추가:
   - 주 버튼: "예배 시간 안내"
   - 보조 버튼: "새가족 등록하기"
4. 페이지 로드 시 순차적 애니메이션 (제목 → 설명 → 버튼)

이렇게 진행해도 될까요? 실행하시겠습니까?"

마스터님: "실행"

코딩: "작업 시작합니다! 🚀"
```

**중요**: 반드시 마스터님의 승인 후에만 코드 작성을 시작합니다.

---

### 원칙 3: Phase 완료 보고 시스템

**완료 보고 규칙**:
- ✅ **Phase 단위 보고**: Phase 전체 완료 시에만 보고서 작성
- ❌ **세부 작업 보고 금지**: Phase 1-1, 1-2 같은 개별 보고서 작성 안 함
- 📊 **이유**: 토큰 사용 최소화, 핵심만 기록

**완료 프로세스**:
```
1. Phase 전체 작업 완료
   ↓
2. 완료보고서 작성 (템플릿 사용)
   ↓
3. docs/phase-X-complete.md 저장
   ↓
4. tasks.md 체크박스 업데이트 [x]
   ↓
5. PROGRESS.md 진행률 업데이트
   ↓
6. 마스터님께 완료 보고
```

**보고서 필수 항목**:
- 📌 작업 개요 (Phase 번호, 이름, 날짜, 시간)
- ✅ 완료된 작업 목록
- 📁 생성/수정된 파일 목록
- 🧪 테스트 결과
- 🚨 이슈 & 해결 (발생한 경우만)
- 📝 다음 Phase 준비사항

---

## 🛠️ 기술 스택

### 프론트엔드
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Components**: Shadcn UI
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Font**: SC Dream (에스코어 드림)

### 도구 & 라이브러리
- **Image Optimization**: next/image
- **SEO**: next-seo
- **Analytics**: (추후 결정)

### 배포
- **Hosting**: cafe24.com
- **Build**: Static Export (SSG)

---

## 🎨 디자인 원칙

### 브랜드 컬러
- **Sky Blue**: `#38bdf8` (스카이 블루) - 생동감, 희망, 투명함
- **Purple**: `#a855f7` (퍼플) - 영성, 신비, 고귀함
- **Gradient**: 스카이 블루 → 퍼플 그라데이션 - 교회의 정체성을 표현하는 핵심 디자인 요소
- **Background**: `#ffffff` (화이트) - 깔끔함, 순수

### 타이포그래피
- **메인 폰트**: SC Dream (에스코어 드림)
- **웨이트**: 100 ~ 900 (전체 범위)
- **폴백**: Noto Sans KR, sans-serif

### 디자인 철학
1. **모바일 퍼스트**: 모바일에서 먼저 완벽하게 작동
2. **접근성**: WCAG 2.1 AA 준수
3. **성능**: 빠른 로딩 (<3초 on 3G)
4. **애니메이션**: 부드럽고 의미 있는 인터랙션
5. **일관성**: 모든 페이지에서 통일된 디자인 시스템

---

## 📁 프로젝트 구조 규칙

```
bfgc-website/
├── app/                    # Next.js App Router 페이지
│   ├── (routes)/          # 라우트 그룹
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 홈페이지
├── components/            # 리액트 컴포넌트
│   ├── ui/               # Shadcn UI 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트 (Header, Footer)
│   ├── sections/         # 페이지 섹션 컴포넌트
│   └── forms/            # 폼 컴포넌트
├── lib/                  # 유틸리티 함수
├── types/                # TypeScript 타입 정의
├── styles/               # 전역 스타일
├── public/               # 정적 파일
│   └── images/          # 이미지 파일
├── docs/                 # 프로젝트 문서
│   ├── phase-X-complete.md
│   └── decisions/       # 주요 결정사항
├── CLAUDE.md            # 이 파일
├── requirements.md      # 요구사항 명세
├── design.md            # 디자인 시스템
├── tasks.md             # 작업 목록
└── PROGRESS.md          # 진행 현황
```

### 네이밍 규칙
- **컴포넌트**: PascalCase (예: `HeroSection.tsx`)
- **유틸함수**: camelCase (예: `formatDate.ts`)
- **타입/인터페이스**: PascalCase (예: `SermonCardProps`)
- **상수**: UPPER_SNAKE_CASE (예: `MAX_SERMONS`)
- **폴더**: kebab-case (예: `next-gen/`)

---

## ✅ 코드 품질 기준

### 필수 준수 사항
1. **ESLint**: 모든 ESLint 규칙 통과
2. **TypeScript**: strict 모드, any 사용 금지
3. **주석**: 모든 컴포넌트와 함수에 한국어 주석
4. **재사용성**: DRY 원칙, 컴포넌트 재사용
5. **반응형**: 모바일/태블릿/데스크톱 모두 테스트
6. **접근성**: semantic HTML, ARIA 속성
7. **성능**: 이미지 최적화, lazy loading

### 컴포넌트 작성 기준
```typescript
// ✅ 올바른 컴포넌트 구조

'use client'  // 클라이언트 컴포넌트인 경우

import { ... } from '...'

// Props 인터페이스 정의 (컴포넌트 위에)
interface ComponentNameProps {
  // Props 설명
}

/**
 * 컴포넌트 설명
 *
 * @param props - Props 설명
 * @returns 렌더링할 JSX
 */
export function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  // 상태 관리

  // 이벤트 핸들러

  // useEffect 등 부수효과

  // 렌더링
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

---

## 🖼️ 이미지 처리 원칙

### 자동 최적화 프로세스
1. **업로드** → 마스터님이 이미지 업로드
2. **분석** → 해상도, 크기, 색상 톤, 주요 피사체 확인
3. **최적화** → WebP 변환, 반응형 사이즈 생성, 압축
4. **배치** → 적합한 페이지/섹션 제안
5. **코드** → next/image 컴포넌트 자동 생성

### 이미지 저장 규칙
```
public/images/
├── hero/          # Hero 섹션 배경
├── worship/       # 예배 관련
├── community/     # 공동체
├── ministry/      # 사역
├── sermon/        # 설교 썸네일
└── optimized/     # 최적화된 이미지
```

### Next.js Image 최적화
- **포맷**: WebP 우선, PNG/JPG 폴백
- **크기**: 반응형 (640/1024/1920px)
- **품질**: 90% (용량 vs 품질 밸런스)
- **로딩**: Lazy loading (Hero는 priority)
- **Alt**: 접근성을 위한 한국어 alt 텍스트

---

## 📊 작업 진행 원칙

### Phase 단위 작업
- Phase는 논리적 작업 단위 (예: Phase 1 - 프로젝트 설정)
- 각 Phase는 여러 세부 작업으로 구성
- Phase 완료 시에만 보고서 작성

### 체크리스트 관리
- tasks.md에서 실시간 진행 상황 추적
- 완료된 작업: `[x]` 표시
- 진행 중인 작업: `[ ]` 표시
- PROGRESS.md에서 전체 진행률 확인

### 세션 연속성 유지
1. **세션 시작 시**: QUICK-START.md 확인
2. **작업 중**: PROGRESS.md 실시간 업데이트
3. **세션 종료 전**: 현재 상태 tasks.md 저장
4. **다음 세션**: QUICK-START.md로 빠른 재시작

---

## 🚨 주의사항

### 하지 말아야 할 것
- ❌ 승인 없이 코드 작성
- ❌ 영어로 주석 작성
- ❌ any 타입 사용
- ❌ 접근성 무시
- ❌ 반응형 테스트 생략
- ❌ Phase 세부 작업별 보고서 작성

### 반드시 해야 할 것
- ✅ 마스터님 승인 후 작업
- ✅ 한국어 주석 필수
- ✅ TypeScript strict 모드
- ✅ 모든 화면 크기 테스트
- ✅ 이미지 최적화
- ✅ Phase 완료 시 보고서 작성

---

## 🎯 프로젝트 성공 기준

### 기술적 목표
- ✅ 100% 반응형 (모든 디바이스)
- ✅ Lighthouse 성능 점수 90+
- ✅ 접근성 점수 90+
- ✅ SEO 점수 90+
- ✅ 로딩 속도 <3초 (3G)

### 사용자 경험 목표
- ✅ 직관적인 네비게이션
- ✅ 부드러운 애니메이션
- ✅ 명확한 CTA (Call to Action)
- ✅ 쉬운 정보 접근
- ✅ 강력한 첫인상

### 유지보수 목표
- ✅ 코드 가독성
- ✅ 컴포넌트 재사용성
- ✅ 명확한 문서화
- ✅ 간편한 콘텐츠 업데이트

---

## 📞 커뮤니케이션

### 보고 형식
- 📋 **작업 시작**: "XXX 작업 시작합니다"
- ✅ **작업 완료**: "XXX 작업 완료했습니다"
- 💡 **제안**: "이런 방식은 어떨까요?"
- 🚨 **이슈**: "XXX 문제가 발생했습니다"
- 🤔 **확인**: "이해가 맞는지 확인 부탁드립니다"

### 응답 대기
- 중요한 결정: 반드시 마스터님 승인 대기
- 작은 개선: 제안 후 진행
- 이슈 발생: 즉시 보고 후 대기

---

**이 문서는 프로젝트의 헌법입니다. 모든 작업은 이 원칙을 따릅니다.** 📜
