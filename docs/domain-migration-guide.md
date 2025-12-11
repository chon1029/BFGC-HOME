# 🌐 도메인 이전 및 사이트 교체 가이드

**목표**: 현재 운영 중인 `www.bfgc.kr` 도메인을 **새로운 Next.js 홈페이지**에 연결하고, 기존 워드프레스 사이트는 **Cafe24 기본 주소**로 변경하여 "이전 홈페이지"로 보존합니다.

---

## 📋 전체 흐름도

1.  **기존 사이트 (`Wordpress`)**: `www.bfgc.kr` 연결 해제 ➔ `bfgc3.mycafe24.com` (기본 주소)로 복귀
2.  **새 사이트 (`Next.js`)**: 호스팅 서버에 배포 ➔ `www.bfgc.kr` 도메인 연결
3.  **연동**: 새 사이트 메뉴에 "이전 홈페이지" 링크 추가 (➔ `bfgc3.mycafe24.com`)

---

## 🚀 Step 1: 기존 사이트 도메인 연결 해제 (Cafe24)

기존 워드프레스 사이트가 `www.bfgc.kr`을 놓아주어야 새 사이트가 그 주소를 쓸 수 있습니다.

1.  **Cafe24 호스팅 센터** 로그인.
2.  **나의서비스관리** > **도메인 연결관리** 메뉴로 이동.
3.  연결된 도메인 목록에서 `bfgc.kr` 및 `www.bfgc.kr` 선택.
4.  **[도메인 연결삭제]** 클릭.
    *   *삭제해도 도메인 소유권이 사라지는 것은 아닙니다. 호스팅과의 연결만 끊는 것입니다.*
5.  이제 기존 사이트는 Cafe24가 제공한 기본 아이디 주소(예: `bfgc3.mycafe24.com`)로만 접속됩니다.
    *   *이 주소를 메모해 두세요! 나중에 링크 걸 때 필요합니다.*

---

## 🚀 Step 2: 새 프로젝트 배포 (Vercel 추천)

Next.js 프로젝트는 **Vercel**에 배포하는 것이 가장 성능이 좋고 관리가 쉽습니다. (Cafe24 Node.js 호스팅보다 훨씬 간편합니다.)

1.  **Vercel.com** 회원가입 (GitHub 아이디로 로그인).
2.  **[Add New Project]** 클릭.
3.  GitHub 리포지토리(`BFGC-HOME`)를 선택하고 **[Import]** 클릭.
4.  설정 변경 없이 **[Deploy]** 클릭.
5.  배포가 완료되면 `bfgc-home.vercel.app` 같은 임시 주소가 생성됩니다.

---

## 🚀 Step 3: 도메인 연결 (Vercel ↔ Cafe24 DNS)

이제 `bfgc.kr`을 Vercel(새 사이트)로 연결합니다.

1.  **Vercel 대시보드** > 해당 프로젝트 > **Settings** > **Domains**.
2.  입력창에 `www.bfgc.kr` 입력 후 **[Add]** 클릭.
3.  Vercel이 **DNS 설정값(A Record, CNAME)**을 보여줍니다.
    *   예: `A Record` -> `76.76.21.21`
    *   예: `CNAME` -> `cname.vercel-dns.com`
4.  **Cafe24 도메인 관리** 페이지(도메인을 구입한 곳)로 이동.
5.  **DNS 관리** (네임서버 관리) 메뉴 접속.
6.  Vercel에서 알려준 값대로 레코드를 수정/추가합니다.
    *   `www` (CNAME) ➔ `cname.vercel-dns.com`
    *   `@` (A Record) ➔ `76.76.21.21`
7.  Vercel로 돌아와서 초록색 체크(✅)가 뜰 때까지 기다립니다. (최대 24시간 소요될 수 있음)

---

## 🚀 Step 4: "이전 홈페이지" 링크 연결

새 사이트에서 기존 사이트로 갈 수 있는 문을 만들어줍니다.

1.  `src/components/layout/Header.tsx` 또는 `Footer.tsx` 파일 열기.
2.  원하는 위치에 링크 추가:
    ```tsx
    <a href="http://bfgc3.mycafe24.com" target="_blank" rel="noopener noreferrer">
      이전 홈페이지 가기
    </a>
    ```
3.  변경 사항을 GitHub에 Push하면 Vercel이 자동으로 재배포합니다.

---

## ✅ 체크리스트

- [ ] 기존 사이트가 기본 주소(`mycafe24.com`)로 잘 접속되는가?
- [ ] 새 사이트가 `www.bfgc.kr`로 잘 접속되는가?
- [ ] 새 사이트에서 "이전 홈페이지" 클릭 시 기존 사이트가 새 창으로 뜨는가?
- [ ] `https` (보안 접속)가 잘 적용되었는가? (Vercel은 자동 적용됨)

---

**문의**: 진행 중 막히는 부분이 있으면 언제든 코딩(AI)에게 물어보세요!
