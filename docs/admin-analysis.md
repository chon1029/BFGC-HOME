# 📊 Admin Renewal 프로젝트 - 구조 분석 보고서

**분석 일시**: 2025년 12월 10일 오후 11:10
**분석 범위**: Epic 1 (ADM-001 ~ ADM-004)
**상태**: ✅ 완료

---

## 🎯 분석 개요

기존 관리자 페이지 구조를 분석하여 최소 침습 방식으로 푸터/팝업/이메일 관리 기능을 추가하기 위한 사전 조사.

---

## 📁 ADM-001: Admin/Settings 폴더 구조 확인

### 발견 사항

**현재 상태**: ❌ `/admin/settings` 폴더가 **존재하지 않음**

### 실제 Admin 폴더 구조

```
src/app/admin/
├── layout.tsx                    # 관리자 레이아웃 (사이드바 포함)
├── page.tsx                      # 대시보드 메인 페이지
├── weekly-prayer/
│   ├── page.tsx                 # 주간 기도문 목록
│   ├── create/page.tsx          # 주간 기도문 생성
│   └── edit/[id]/page.tsx       # 주간 기도문 수정
├── users/page.tsx               # 회원 관리
├── posts/page.tsx               # 게시글 관리
├── analytics/page.tsx           # 통계/로그
└── spam/page.tsx                # 스팸 차단
```

### 📌 중요 발견

1. **Settings 페이지 없음**
   - 현재 구조에 `/admin/settings` 폴더가 존재하지 않음
   - **새로 생성 필요**

2. **대시보드에 Settings 링크 있음**
   - `page.tsx:69` - "사이트 설정" 타일이 `/admin/settings`로 연결
   - **현재 404 에러 발생 예상**

3. **사이드바에 Settings 메뉴 있음**
   - `AdminSidebar.tsx:52-57` - "설정" 메뉴 존재
   - **클릭 시 페이지 없음**

### 🎯 결론

**Settings 페이지를 새로 만들어야 함** (기존 수정이 아님)
- 위치: `src/app/admin/settings/page.tsx`
- 처음부터 **탭 구조**로 설계 가능
- 기존 코드 영향 없음

---

## 🖥️ ADM-002: 관리자 대시보드 페이지 분석

### 파일: `src/app/admin/page.tsx`

### 주요 기능

1. **통계 카드** (4개)
   - 총 방문자 수
   - 신규 가입자
   - 새 게시글
   - 스팸 의심

2. **빠른 작업 (Quick Actions)** (6개 타일)
   ```typescript
   - 설교 관리 (모달)
   - 주간 기도문 (모달)
   - 묵상(QT) 나눔 (모달)
   - 갤러리 관리 (모달)
   - 주보 업로드 (모달)
   - 사이트 설정 (링크: /admin/settings) ← 우리가 만들 페이지
   ```

3. **최근 활동 로그** (하드코딩 데이터)

4. **스팸 모니터링** (하드코딩 데이터)

### 사용 기술

- **UI**: Shadcn UI (Card, Button, Badge, Avatar)
- **아이콘**: Lucide React
- **상태 관리**: React useState (모달 제어)
- **모달**: 각 기능별 전용 모달 컴포넌트

### 패턴 분석

```typescript
// 빠른 작업 데이터 구조
const QUICK_ACTIONS = [
    {
        title: '타일 제목',
        description: '설명',
        icon: LucideIcon,
        color: 'text-색상',
        bg: 'bg-색상',
        type: 'modal' | 'link',
        modalType?: 'prayer' | 'sermon' | ...,
        href?: '/admin/path',
    }
]
```

### 🎯 적용 가능 패턴

우리 Settings 페이지도:
- **Shadcn Card 기반 UI** 사용
- **Lucide 아이콘** 활용
- **일관된 디자인** 유지

---

## 🦶 ADM-003: Footer 컴포넌트 구조 분석

### 파일: `src/components/layout/Footer.tsx`

### 현재 구조

```typescript
// 하드코딩된 정적 데이터
3개 컬럼:
1. 교회 로고 & 소개
2. 빠른 링크 (8개)
3. 연락처 정보 (주소, 예배시간, 전화, 이메일)

하단:
- 소셜 미디어 아이콘 (Facebook, YouTube, Instagram)
- 저작권 문구
- 이단 경고문
```

### 하드코딩된 데이터 (수정 필요)

```typescript
// Line 24: 로고
src="/images/logo/watermark-logo.png"

// Line 32-41: 교회 소개글 (하드코딩)
"사도행전적 역사가 일어나는 교회..."

// Line 84-105: 연락처 (하드코딩)
주소: "1073 Budapest, Osvát utca 16, Hungary"
전화: "+36 20 320 1595"
이메일: "bfgc1004@gamil.com"

// Line 93-94: 예배 시간 (하드코딩)
"주일 예배: 15:00(오후 3시)"
"금요 기도회: 19:00(저녁 7시)"

// Line 131-153: 소셜 미디어 링크 (하드코딩)
href="https://facebook.com"
href="https://youtube.com"
href="https://instagram.com"

// Line 158: 저작권 (동적 연도만)
© {new Date().getFullYear()} 부다페스트한인선교교회

// Line 164-165: 이단 경고문 (하드코딩)
"부다페스트한인선교교회는\n신천지 및 이단단체를 거부합니다"
```

### 🎯 수정 전략

**현재**: 정적 JSX 하드코딩
**목표**: Sanity 데이터 기반 동적 렌더링

```typescript
// 수정 후 구조 (예상)
const footerData = await getFooterSettings() // Sanity 조회
return (
    <footer>
        {/* footerData 사용 */}
        <p>{footerData.churchInfo.churchDescription}</p>
        <p>{footerData.contactInfo.address}</p>
        ...
    </footer>
)
```

---

## 🗄️ ADM-004: Sanity 스키마 현황 확인

### 파일: `src/sanity/schemaTypes/`

### 기존 스키마 목록

```typescript
// index.ts에 등록된 스키마 (6개)
1. dailyBread           - 일용할 양식
2. discipleshipApplication - 제자훈련 신청
3. sermon               - 설교
4. weeklyPrayer         - 주간 기도문
5. gallery              - 갤러리
6. bulletin             - 주보
```

### 📌 중요 발견

**footerSettings.ts 파일 발견!** ✅

- 파일 위치: `src/sanity/schemaTypes/footerSettings.ts`
- **하지만 index.ts에 미등록** ❌
- 즉, Sanity Studio에서 사용 불가능

### footerSettings 스키마 분석

**완벽하게 설계됨!** 🎉

```typescript
스키마 구조:
├── churchInfo (교회 기본 정보)
│   ├── churchName (교회명)
│   └── churchDescription (교회 소개)
│
├── contactInfo (연락처 정보)
│   ├── address (주소)
│   ├── phone (전화번호)
│   └── email (이메일)
│
├── worshipTime (예배 시간)
│   ├── sundayService (주일 예배)
│   └── fridayPrayer (금요 기도회)
│
├── socialMedia (소셜 미디어)
│   ├── facebook { url, enabled }
│   ├── youtube { url, enabled }
│   └── instagram { url, enabled }
│
├── otherSettings (기타 설정)
│   ├── copyright (저작권)
│   └── antiCultStatement (이단 경고문)
│
└── lastUpdated (최종 수정일) - 자동
```

### 특징

1. **싱글톤 패턴**
   - `__experimental_singleton: true`
   - 하나의 문서만 존재 (설정 페이지에 최적)

2. **그룹화 (Collapsible)**
   - 5개 그룹으로 논리적 분류
   - 관리 편의성 극대화

3. **Validation**
   - 필수 필드 검증
   - 이메일 형식 검증
   - URL 스킴 검증 (http/https)

4. **초기값 설정**
   - 실제 교회 데이터로 initialValue 설정
   - 즉시 사용 가능

### 🎯 해야 할 작업

1. **index.ts에 footerSettings 등록**
   ```typescript
   import footerSettings from './footerSettings'

   export const schema = {
       types: [
           dailyBread,
           discipleshipApplication,
           sermon,
           weeklyPrayer,
           gallery,
           bulletin,
           footerSettings, // ← 추가
       ],
   }
   ```

2. **Sanity Studio 재시작**
   - 스키마 적용

3. **초기 데이터 입력**
   - Sanity Studio에서 푸터 설정 문서 생성

---

## 📂 추가 발견 사항

### 컴포넌트 구조

```
src/components/admin/
├── UserNav.tsx         - 사용자 프로필 네비게이션
└── AdminSidebar.tsx    - 관리자 사이드바
```

### Admin Layout 구조

```typescript
// src/app/admin/layout.tsx
- Desktop: 고정 사이드바 (w-64)
- Mobile: Sheet 사이드바
- Header: 상단 고정 (UserNav 포함)
- Main: 스크롤 가능 콘텐츠 영역
```

---

## 🎨 디자인 시스템 분석

### 색상 패턴

```typescript
// 관리자 페이지 공통 색상
배경:
- Light: bg-slate-50
- Dark: bg-slate-950

사이드바:
- bg-slate-900 (다크 테마)
- Active: bg-slate-800
- Hover: hover:bg-slate-800

액센트:
- Primary: text-sky-400
- Secondary: text-purple-600
```

### 아이콘 사용 패턴

```typescript
// Lucide React 아이콘
import { Settings, LayoutDashboard, Users, FileText, ... } from 'lucide-react'

// 사용 예시
<Settings className="mr-2 h-4 w-4" />
```

---

## 🚀 다음 단계 액션 아이템

### 즉시 실행 (우선순위 P0)

1. **✅ Sanity 스키마 활성화**
   ```
   - footerSettings를 index.ts에 등록
   - Sanity Studio 재시작
   - 초기 데이터 입력
   ```

2. **✅ Settings 페이지 생성**
   ```
   - src/app/admin/settings/page.tsx 생성
   - 탭 UI 기본 구조 작성
   - 3개 탭: 푸터, 팝업, 이메일
   ```

3. **✅ FooterSettings 컴포넌트 개발**
   ```
   - src/components/admin/settings/FooterSettings.tsx
   - Sanity 데이터 CRUD 연동
   - 실시간 미리보기
   ```

### 다음 실행 (우선순위 P1)

4. **Footer 동적화**
   ```
   - src/components/layout/Footer.tsx 수정
   - Sanity 데이터 기반 렌더링
   - 하드코딩 제거
   ```

5. **Popup 스키마 추가**
   ```
   - src/sanity/schemaTypes/popupSettings.ts 생성
   - index.ts 등록
   ```

6. **Email 스키마 추가**
   ```
   - src/sanity/schemaTypes/emailSettings.ts 생성
   - index.ts 등록
   ```

---

## 📊 진행 현황 업데이트

**Epic 1: 구조 파악 및 분석** ✅ **완료!**

- [x] ADM-001: Settings 폴더 구조 확인
- [x] ADM-002: 대시보드 페이지 분석
- [x] ADM-003: Footer 컴포넌트 분석
- [x] ADM-004: Sanity 스키마 확인

**Epic 2: 탭 기반 UI 설계** ⏳ 준비 완료

- [ ] ADM-005: 탭 컴포넌트 설계
- [ ] ADM-006: Settings 페이지 생성
- [ ] ADM-007: Footer 스키마 활성화
- [ ] ADM-008: Popup 스키마 추가
- [ ] ADM-009: Email 스키마 추가

---

## 🎯 핵심 인사이트

### ✅ 좋은 점

1. **footerSettings 스키마 이미 완성**
   - 설계 시간 절약
   - 즉시 사용 가능

2. **일관된 디자인 시스템**
   - Shadcn UI 기반
   - 쉽게 확장 가능

3. **깔끔한 Admin 구조**
   - 기능별 폴더 분리
   - 유지보수 용이

### ⚠️ 주의사항

1. **Settings 페이지 미존재**
   - 링크만 있고 실제 페이지 없음
   - 새로 생성 필요

2. **Footer 완전 하드코딩**
   - Sanity 연동 안 됨
   - 전체 리팩토링 필요

3. **footerSettings 미등록**
   - 스키마 파일만 있음
   - index.ts 등록 필수

---

## 📝 기술 스택 정리

### 프론트엔드
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI**: Shadcn UI (Radix UI)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State**: React Hooks (useState)

### 백엔드/CMS
- **CMS**: Sanity.io
- **Auth**: NextAuth.js
- **Data Fetching**: Server Components (기본)

### 관리자 페이지 패턴
- **Layout**: Fixed Sidebar + Main Content
- **Navigation**: AdminSidebar 컴포넌트
- **Modals**: 각 기능별 전용 모달
- **Forms**: React Hook Form (예상)

---

**분석 완료 시각**: 2025년 12월 10일 오후 11:15
**다음 작업**: Epic 2 시작 - Settings 페이지 개발
**예상 소요 시간**: 2-3일

---

## 📂 참고 파일 목록

```
분석된 파일:
✓ src/app/admin/page.tsx
✓ src/app/admin/layout.tsx
✓ src/components/admin/AdminSidebar.tsx
✓ src/components/layout/Footer.tsx
✓ src/sanity/schemaTypes/footerSettings.ts
✓ src/sanity/schemaTypes/index.ts
```

---

**작성자**: 코딩 (Claude)
**검토자**: 마스터님
**승인 상태**: 대기 중
