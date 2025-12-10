# 📦 Admin Renewal 프로젝트

**프로젝트명**: Admin Renewal (관리자 페이지 개선)
**시작일**: 2025년 12월 10일
**상태**: 진행 중
**Linear 프로젝트**: BFGC Admin Renewal

---

## 🎯 프로젝트 개요

### 목표
기존 관리자 페이지(`/admin/settings`)를 확장하여 사이트 관리 기능 강화

### 핵심 전략
- ✅ **최소 침습 수정**: 새 폴더/파일 생성 최소화
- ✅ **기존 구조 활용**: `/admin/settings` 폴더 확장
- ✅ **탭 기반 UI**: 푸터/팝업/이메일 관리

---

## 📊 Epic 및 Story 구조

### Epic 1: 구조 파악 및 분석 (Foundation)
**목표**: 기존 시스템 완벽 이해
**우선순위**: P0 (긴급)
**예상 기간**: 1일

#### Story 1.1: 프로젝트 구조 분석
- [ ] **ADM-001**: `admin/settings` 폴더 구조 확인
  - 우선순위: P0
  - 레이블: 🔍 analysis
  - 설명: 기존 설정 페이지의 파일 구조와 컴포넌트 확인

- [ ] **ADM-002**: 관리자 대시보드 페이지 분석
  - 우선순위: P1
  - 레이블: 🔍 analysis
  - 설명: 현재 대시보드 레이아웃과 사이드바 메뉴 구조 파악

- [ ] **ADM-003**: Footer 컴포넌트 구조 분석
  - 우선순위: P1
  - 레이블: 🔍 analysis
  - 설명: 현재 Footer의 데이터 구조와 렌더링 방식 확인

- [ ] **ADM-004**: Sanity 스키마 현황 확인
  - 우선순위: P0
  - 레이블: 🔍 analysis
  - 설명: 기존 Sanity 스키마 구조 및 관리 데이터 파악

---

### Epic 2: 탭 기반 UI 설계 및 구현 (UI Foundation)
**목표**: 확장 가능한 탭 시스템 구축
**우선순위**: P1
**예상 기간**: 2일

#### Story 2.1: 탭 시스템 설계
- [ ] **ADM-005**: 탭 컴포넌트 아키텍처 설계
  - 우선순위: P1
  - 레이블: 🎨 design
  - 설명: Shadcn Tabs 컴포넌트 기반 설계
  - 기술 스택: Radix UI Tabs, TypeScript

- [ ] **ADM-006**: Settings 페이지 리팩토링
  - 우선순위: P1
  - 레이블: 💻 development
  - 설명: 기존 page.tsx를 탭 구조로 전환
  - 파일: `src/app/admin/settings/page.tsx`

#### Story 2.2: Sanity 스키마 확장
- [ ] **ADM-007**: Footer 설정 스키마 추가
  - 우선순위: P0
  - 레이블: 💻 development
  - 설명: 푸터 관리를 위한 Sanity 스키마 생성
  - 필드: 주소, 연락처, 소셜 미디어, 저작권 등

- [ ] **ADM-008**: Popup 설정 스키마 추가
  - 우선순위: P1
  - 레이블: 💻 development
  - 설명: 팝업 관리를 위한 Sanity 스키마 생성
  - 필드: 제목, 내용, 표시 여부, 기간 등

- [ ] **ADM-009**: Email 알림 설정 스키마 추가
  - 우선순위: P2
  - 레이블: 💻 development
  - 설명: 이메일 알림 설정을 위한 Sanity 스키마
  - 필드: 수신자, 알림 타입, 템플릿 등

---

### Epic 3: 관리 기능 구현 (Features)
**목표**: 각 탭별 핵심 관리 기능 개발
**우선순위**: P1
**예상 기간**: 3일

#### Story 3.1: 푸터 관리 기능
- [ ] **ADM-010**: FooterSettings 컴포넌트 개발
  - 우선순위: P1
  - 레이블: 💻 development
  - 파일: `src/components/admin/settings/FooterSettings.tsx`
  - 기능:
    - 주소 편집
    - 연락처 편집
    - 소셜 미디어 링크 관리
    - 실시간 미리보기

- [ ] **ADM-011**: Footer 동적 렌더링 구현
  - 우선순위: P1
  - 레이블: 💻 development
  - 설명: Sanity 데이터 기반 Footer 동적 렌더링
  - 파일: `src/components/layout/Footer.tsx`

#### Story 3.2: 팝업 관리 기능
- [ ] **ADM-012**: PopupSettings 컴포넌트 개발
  - 우선순위: P2
  - 레이블: 💻 development
  - 파일: `src/components/admin/settings/PopupSettings.tsx`
  - 기능:
    - 팝업 생성/수정/삭제
    - 표시 기간 설정
    - 활성화/비활성화 토글

- [ ] **ADM-013**: 팝업 표시 로직 구현
  - 우선순위: P2
  - 레이블: 💻 development
  - 설명: 홈페이지 팝업 표시 및 쿠키 관리

#### Story 3.3: 이메일 알림 설정
- [ ] **ADM-014**: EmailSettings 컴포넌트 개발
  - 우선순위: P2
  - 레이블: 💻 development
  - 파일: `src/components/admin/settings/EmailSettings.tsx`
  - 기능:
    - 알림 수신자 관리
    - 알림 타입별 활성화
    - 이메일 템플릿 설정

---

## 🏷️ 레이블 시스템

| 레이블 | 의미 | 사용 |
|--------|------|------|
| 🔍 analysis | 분석 작업 | 구조 파악, 리서치 |
| 🎨 design | 설계 작업 | UI/UX 설계, 아키텍처 |
| 💻 development | 개발 작업 | 코드 작성, 구현 |
| 🧪 testing | 테스트 작업 | 단위/통합 테스트 |
| 📝 documentation | 문서화 | 가이드, API 문서 |
| 🐛 bug | 버그 수정 | 오류 해결 |

---

## 📅 마일스톤

### M1: 구조 분석 완료 (2025-12-11)
- ADM-001 ~ ADM-004 완료
- 기존 시스템 완전 이해
- 기술 스택 확정

### M2: 탭 UI 구현 완료 (2025-12-12)
- ADM-005 ~ ADM-009 완료
- 탭 기반 UI 작동
- Sanity 스키마 배포

### M3: 전체 기능 완성 (2025-12-13)
- ADM-010 ~ ADM-014 완료
- 모든 관리 기능 작동
- 프로덕션 배포 준비

---

## 🎯 우선순위 매트릭스

### P0 (긴급) - 즉시 착수
- ADM-001: Settings 폴더 구조 확인
- ADM-004: Sanity 스키마 현황 확인
- ADM-007: Footer 설정 스키마 추가

### P1 (높음) - 1일 내 완료
- ADM-002: 대시보드 페이지 분석
- ADM-003: Footer 컴포넌트 분석
- ADM-005: 탭 컴포넌트 설계
- ADM-006: Settings 페이지 리팩토링
- ADM-008: Popup 스키마 추가
- ADM-010: FooterSettings 개발
- ADM-011: Footer 동적 렌더링

### P2 (중간) - 2-3일 내 완료
- ADM-009: Email 스키마 추가
- ADM-012: PopupSettings 개발
- ADM-013: 팝업 표시 로직
- ADM-014: EmailSettings 개발

---

## 📂 파일 구조 (예상)

```
src/
├── app/admin/settings/
│   └── page.tsx                    # 탭 기반 메인 페이지 (수정)
│
├── components/admin/settings/
│   ├── SettingsTabs.tsx            # 공통 탭 UI (신규)
│   ├── FooterSettings.tsx          # 푸터 관리 (신규)
│   ├── PopupSettings.tsx           # 팝업 관리 (신규)
│   └── EmailSettings.tsx           # 이메일 설정 (신규)
│
├── components/layout/
│   └── Footer.tsx                  # 동적 Footer (수정)
│
└── sanity/schemas/
    ├── footerSettings.ts           # Footer 스키마 (신규)
    ├── popupSettings.ts            # Popup 스키마 (신규)
    └── emailSettings.ts            # Email 스키마 (신규)
```

---

## 🔄 작업 흐름 (Workflow)

```
1. 분석 단계
   ↓
2. 설계 단계
   ↓
3. 개발 단계
   ↓
4. 테스트 단계
   ↓
5. 배포 단계
```

각 Task는 위 단계를 거쳐 진행됩니다.

---

## 📊 진행 현황

**전체 진행률**: 0/14 (0%)

**Epic별 진행률**:
- Epic 1 (분석): 0/4 (0%)
- Epic 2 (UI): 0/5 (0%)
- Epic 3 (기능): 0/5 (0%)

---

## 📝 작업 규칙

### 체크리스트 (각 Task 완료 시)
- [ ] 코드 리뷰 완료
- [ ] 테스트 작성 및 통과
- [ ] 한국어 주석 작성
- [ ] TypeScript strict 모드 준수
- [ ] ESLint 규칙 통과
- [ ] 반응형 테스트 완료

### 커밋 메시지 형식
```
<type>(<task-id>): <description>

예시:
feat(ADM-010): 푸터 설정 컴포넌트 개발
fix(ADM-011): Footer 렌더링 버그 수정
docs(ADM-001): Settings 구조 분석 문서 추가
```

---

## 🚀 다음 액션

**즉시 시작할 작업**:
1. ADM-001: Settings 폴더 구조 확인
2. ADM-004: Sanity 스키마 현황 확인

**준비 중인 작업**:
3. ADM-002: 대시보드 분석
4. ADM-003: Footer 컴포넌트 분석

---

**마지막 업데이트**: 2025년 12월 10일 오후 11:05
**작성자**: 코딩 (Claude)
**Linear 연동**: ✅ 준비 완료
