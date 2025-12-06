# 🚀 빠른 시작 가이드

**버전**: v1.0.0
**최종 업데이트**: 2025-12-06

---

## 📌 새 세션 시작 시 필독!

이 문서는 새로운 작업 세션을 시작할 때 빠르게 프로젝트 상태를 파악하고 작업을 재개하기 위한 가이드입니다.

---

## 🔍 1단계: 현재 상태 빠른 확인

### 📊 전체 진행 현황
```bash
# PROGRESS.md 파일을 먼저 확인하세요
열기: PROGRESS.md
```

**확인 사항**:
- ✅ 전체 진행률 (%)
- ✅ 현재 Phase 번호 및 이름
- ✅ 마지막 작업 내용
- ✅ 다음 해야 할 작업

---

## 📝 2단계: 마지막 작업 위치 확인

### tasks.md에서 체크박스 확인
```bash
# tasks.md 파일 열기
열기: tasks.md

# 마지막 [x] 체크된 항목 찾기
# 다음 [ ] 항목이 현재 해야 할 작업
```

**확인 방법**:
1. tasks.md 열기
2. 각 Phase 섹션 확인
3. 마지막으로 `[x]` 체크된 작업 찾기
4. 다음 `[ ]` 작업이 현재 해야 할 일

---

## 📂 3단계: Phase 완료보고서 확인

### 마지막 완료된 Phase 보고서
```bash
# docs 폴더 확인
ls docs/

# 최신 Phase 보고서 열기
# 예: docs/phase-1-complete.md
```

**확인 사항**:
- 완료된 작업 목록
- 생성/수정된 파일
- 발생한 이슈 & 해결 방법
- 다음 Phase 준비사항

---

## 📚 4단계: 핵심 컨텍스트 파일 빠른 리뷰

### 반드시 읽어야 할 4가지 문서

#### 1. CLAUDE.md (작업 원칙)
```
핵심 내용:
✅ 한국어 사용 원칙
✅ 즉시 코딩 금지 프로토콜
✅ Phase 완료 보고 시스템
```

#### 2. requirements.md (요구사항)
```
핵심 내용:
✅ 프로젝트 목표
✅ 사이트 네비게이션 구조
✅ 각 페이지별 요구사항
✅ 기술적 요구사항 (성능, SEO, 접근성)
```

#### 3. design.md (디자인 시스템)
```
핵심 내용:
✅ 컬러 시스템 (Primary, Accent)
✅ 타이포그래피 (SC Dream 폰트)
✅ 컴포넌트 스타일
✅ 애니메이션 가이드
```

#### 4. tasks.md (작업 목록)
```
핵심 내용:
✅ Phase별 작업 체크리스트
✅ 완료 조건
✅ 마일스톤
```

---

## 🎯 5단계: 현재 Phase 이해하기

### Phase 0: 프로젝트 문서화
**목표**: 문서 작성
**핵심 파일**: CLAUDE.md, requirements.md, design.md, tasks.md, PROGRESS.md, QUICK-START.md

### Phase 1: 프로젝트 기반 설정
**목표**: Next.js 프로젝트 생성
**핵심 작업**:
- Next.js 14 설치
- Tailwind CSS 설정
- Shadcn UI 설치
- 폴더 구조 생성

### Phase 2: 디자인 시스템 구축
**목표**: 공통 컴포넌트 제작
**핵심 작업**:
- Header/Footer
- 네비게이션
- 재사용 컴포넌트

### Phase 3: 랜딩 페이지 개발
**목표**: 홈페이지 완성
**핵심 작업**:
- Hero 섹션
- 예배 안내
- 설교 영상
- 새가족 CTA

### Phase 4-8: 서브 페이지 & 배포
**목표**: 나머지 페이지 및 최적화
**핵심 작업**:
- 교회 소개, 예배·양육, 다음세대, 교회생활, 동역 페이지
- 성능 최적화
- cafe24 배포

---

## 💻 6단계: 개발 환경 확인 (Phase 1 이후)

### 프로젝트가 생성된 경우

```bash
# 1. 프로젝트 폴더로 이동
cd "C:\Users\gicho\Desktop\BFGC HOME\bfgc-website"

# 2. 의존성 설치 확인
npm install

# 3. 개발 서버 실행
npm run dev

# 4. 브라우저에서 확인
# http://localhost:3000
```

### 주요 명령어
```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 정적 Export (cafe24 배포용)
npm run build && npm run export

# Lint 확인
npm run lint

# 타입 체크
npx tsc --noEmit
```

---

## 🗂️ 7단계: 파일 구조 파악

### 루트 디렉토리
```
BFGC HOME/
├── CLAUDE.md              # 작업 원칙
├── requirements.md        # 요구사항
├── design.md             # 디자인 시스템
├── tasks.md              # 작업 목록
├── PROGRESS.md           # 진행 현황
├── QUICK-START.md        # 이 파일
├── docs/                 # 완료보고서
│   ├── phase-X-complete.md
│   └── template-phase-complete.md
└── bfgc-website/         # Next.js 프로젝트 (Phase 1 이후)
    ├── app/
    ├── components/
    ├── lib/
    ├── public/
    └── ...
```

### 프로젝트 폴더 (Phase 1 이후)
```
bfgc-website/
├── app/                   # Next.js App Router
│   ├── layout.tsx        # 루트 레이아웃
│   ├── page.tsx          # 홈페이지
│   ├── about/            # 교회 소개
│   ├── worship/          # 예배·양육
│   ├── next-gen/         # 다음세대
│   ├── life/             # 교회생활
│   └── partnership/      # 아름다운 동역
├── components/           # 컴포넌트
│   ├── ui/              # Shadcn UI
│   ├── layout/          # Header, Footer
│   ├── sections/        # 섹션 컴포넌트
│   └── forms/           # 폼 컴포넌트
├── lib/                 # 유틸 함수
├── types/               # TypeScript 타입
├── public/              # 정적 파일
│   └── images/         # 이미지
├── styles/              # 스타일
└── package.json        # 의존성
```

---

## ⚡ 8단계: 빠른 작업 재개 체크리스트

### 작업 시작 전 확인
- [ ] PROGRESS.md 확인 - 현재 Phase 파악
- [ ] tasks.md 확인 - 다음 할 작업 확인
- [ ] 마지막 Phase 완료보고서 확인 (있는 경우)
- [ ] CLAUDE.md 작업 원칙 상기
- [ ] 개발 서버 실행 (Phase 1 이후)

### 새 Phase 시작 시 확인
- [ ] 이전 Phase 완료보고서 작성 완료
- [ ] tasks.md 체크박스 업데이트
- [ ] PROGRESS.md 진행률 업데이트
- [ ] requirements.md에서 해당 Phase 요구사항 확인
- [ ] design.md에서 디자인 가이드 확인

---

## 🎯 9단계: 각 Phase별 빠른 가이드

### Phase 0: 프로젝트 문서화
**시작 전**: 없음
**완료 후**: 모든 문서 파일 생성 확인
**다음 Phase**: Phase 1 - 프로젝트 생성 준비

### Phase 1: 프로젝트 기반 설정
**시작 전**: Node.js, npm 설치 확인
**핵심 명령어**:
```bash
npx create-next-app@latest bfgc-website --typescript --tailwind --app
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input ...
npm install framer-motion lucide-react react-hook-form zod
```
**완료 후**: npm run dev 실행 확인
**다음 Phase**: Phase 2 - 컴포넌트 제작

### Phase 2: 디자인 시스템 구축
**시작 전**: Phase 1 완료 확인
**주요 파일**:
- components/layout/Header.tsx
- components/layout/Footer.tsx
- lib/navigation.ts
**완료 후**: Header/Footer 렌더링 확인
**다음 Phase**: Phase 3 - 랜딩 페이지

### Phase 3: 랜딩 페이지 개발
**시작 전**: Phase 2 완료 확인
**주요 파일**:
- app/page.tsx
- components/sections/HeroSection.tsx
- components/sections/ServiceInfoSection.tsx
- ...
**완료 후**: 홈페이지 완성 확인
**다음 Phase**: Phase 4 - 서브 페이지

---

## 🚨 10단계: 트러블슈팅

### 문제: 현재 위치를 모르겠어요
**해결**:
1. PROGRESS.md 열기
2. "현재 작업 중인 Phase" 섹션 확인
3. tasks.md에서 해당 Phase 찾기
4. 마지막 `[x]` 체크된 작업 확인

### 문제: 이전에 뭘 했는지 기억이 안 나요
**해결**:
1. docs/ 폴더 확인
2. 최신 phase-X-complete.md 열기
3. "완료된 작업" 섹션 확인
4. "다음 Phase 준비사항" 확인

### 문제: 개발 서버가 안 떠요
**해결**:
```bash
# 1. 의존성 재설치
rm -rf node_modules package-lock.json
npm install

# 2. 포트 충돌 확인
# 다른 포트로 실행
npm run dev -- -p 3001

# 3. 캐시 삭제
rm -rf .next
npm run dev
```

### 문제: 어떤 문서를 먼저 봐야 할지 모르겠어요
**해결**:
1. **QUICK-START.md** (이 파일) - 빠른 오리엔테이션
2. **PROGRESS.md** - 현재 상태 파악
3. **tasks.md** - 다음 할 일 확인
4. **CLAUDE.md** - 작업 원칙 상기
5. **requirements.md** - 해당 Phase 요구사항 확인
6. **design.md** - 디자인 가이드 참조

---

## 📞 11단계: 마스터님과 커뮤니케이션

### 작업 시작 보고
```
마스터님, 작업을 시작하겠습니다!

📊 현재 상태:
- Phase X - [Phase 이름]
- 진행률: X%
- 다음 작업: [작업 내용]

준비 완료했습니다. 진행해도 될까요?
```

### 작업 완료 보고
```
마스터님, Phase X 작업 완료했습니다!

✅ 완료 내용:
- [작업 1]
- [작업 2]

📁 생성 파일:
- [파일 1]
- [파일 2]

다음 Phase로 진행하시겠습니까?
```

### 이슈 발생 보고
```
마스터님, 이슈가 발생했습니다.

🚨 문제:
- [문제 설명]

💡 시도한 해결 방법:
- [방법 1]
- [방법 2]

조언 부탁드립니다.
```

---

## ⚡ 빠른 참조

### 주요 명령어
| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run lint` | ESLint 실행 |
| `git status` | Git 상태 확인 |

### 주요 파일 경로
| 파일 | 경로 |
|------|------|
| 작업 원칙 | CLAUDE.md |
| 요구사항 | requirements.md |
| 디자인 시스템 | design.md |
| 작업 목록 | tasks.md |
| 진행 현황 | PROGRESS.md |
| 완료보고서 | docs/phase-X-complete.md |

### 중요 링크
- 현재 사이트: www.bfgc3.mycafe24.com
- Next.js 문서: https://nextjs.org/docs
- Shadcn UI: https://ui.shadcn.com
- Tailwind CSS: https://tailwindcss.com/docs

---

## 🎯 최종 체크리스트

새 세션을 시작하기 전에:

- [ ] PROGRESS.md 확인 - 현재 Phase 파악
- [ ] tasks.md 확인 - 다음 할 일 확인
- [ ] 마지막 완료보고서 확인 (있는 경우)
- [ ] CLAUDE.md 작업 원칙 상기
- [ ] 개발 환경 준비 (Phase 1 이후)
- [ ] 마스터님께 작업 시작 보고

---

**이 가이드를 따라하면 5분 안에 작업을 재개할 수 있습니다!** ⚡
