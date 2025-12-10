# MCP 환경변수 설정 가이드

## 📋 개요

이 가이드는 MCP (Model Context Protocol) 서버가 API 키를 사용할 수 있도록 환경변수를 설정하는 방법을 설명합니다.

---

## 🔐 설정된 MCP 서버

프로젝트에서 사용 가능한 MCP 서버:

### ✅ API 키 불필요 (즉시 사용 가능)
- **filesystem**: 파일시스템 접근
- **memory**: 컨텍스트 메모리 관리
- **sequential-thinking**: 순차적 사고 프로세스
- **time**: 시간/날짜 처리
- **shadcn**: Shadcn UI 컴포넌트
- **puppeteer**: 브라우저 자동화

### 🔑 API 키 필요 (환경변수 설정 필수)
- **github**: GitHub 저장소 연동
- **linear**: Linear 프로젝트 관리
- **brave-search**: Brave 검색 엔진

---

## 🚀 환경변수 설정 방법

### 방법 1: 스크립트 실행 (권장)

#### Windows (CMD/PowerShell)
```cmd
setup-mcp-env.bat
```

#### Linux/Mac (Bash)
```bash
source setup-mcp-env.sh
```

### 방법 2: 수동 설정

#### Windows PowerShell
```powershell
$env:GITHUB_PAT="your_github_token_here"
$env:LINEAR_API_KEY="your_linear_key_here"
$env:BRAVE_API_KEY="your_brave_key_here"
```

#### Linux/Mac Bash
```bash
export GITHUB_PAT="your_github_token_here"
export LINEAR_API_KEY="your_linear_key_here"
export BRAVE_API_KEY="your_brave_key_here"
```

---

## 🔍 환경변수 확인

### Windows
```cmd
echo %GITHUB_PAT%
echo %LINEAR_API_KEY%
echo %BRAVE_API_KEY%
```

### Linux/Mac
```bash
echo $GITHUB_PAT
echo $LINEAR_API_KEY
echo $BRAVE_API_KEY
```

---

## 📁 파일 구조

```
프로젝트 루트/
├── .env                    # Next.js 환경변수 (Git 제외)
├── .mcp.json              # MCP 서버 설정 (Git 제외)
├── setup-mcp-env.bat      # Windows 환경변수 스크립트 (Git 제외)
├── setup-mcp-env.sh       # Linux/Mac 환경변수 스크립트 (Git 제외)
└── MCP-SETUP-GUIDE.md     # 이 가이드
```

---

## 🛡️ 보안 주의사항

### ⚠️ 절대 하지 말 것
- ❌ API 키를 Git에 커밋
- ❌ API 키를 코드에 하드코딩
- ❌ API 키를 공개 저장소에 업로드

### ✅ 반드시 할 것
- ✅ `.gitignore`에 환경변수 파일 추가 (이미 완료)
- ✅ API 키는 `.env` 파일에만 저장
- ✅ 환경변수 스크립트는 로컬에서만 사용

---

## 🔄 MCP 서버와 환경변수 매핑

| MCP 서버 | 환경변수 이름 | `.env` 파일 변수명 |
|----------|--------------|------------------|
| github | `GITHUB_PERSONAL_ACCESS_TOKEN` | `GITHUB_PAT` |
| linear | `LINEAR_API_KEY` | `LINEAR_API_KEY` |
| brave-search | `BRAVE_API_KEY` | `BRAVE_API_KEY` |

`.mcp.json`에서 `${GITHUB_PAT}` 형식으로 환경변수를 참조합니다.

---

## ❓ 문제 해결

### 환경변수가 인식되지 않을 때
1. 스크립트를 올바른 방식으로 실행했는지 확인
   - Windows: `setup-mcp-env.bat` (더블클릭 또는 CMD에서 실행)
   - Linux/Mac: `source setup-mcp-env.sh` (**source** 명령 필수!)

2. 현재 세션에서만 유효
   - 터미널을 종료하면 환경변수가 사라짐
   - MCP 서버를 실행할 때마다 스크립트 재실행 필요

3. 영구적으로 설정하려면
   - Windows: 시스템 환경변수 설정
   - Linux/Mac: `~/.bashrc` 또는 `~/.zshrc`에 export 명령 추가

---

## 📞 추가 도움

문제가 발생하면:
1. `.env` 파일에 API 키가 올바르게 저장되어 있는지 확인
2. `.mcp.json` 파일의 환경변수 참조가 올바른지 확인
3. 환경변수 스크립트를 다시 실행
4. Claude Code 또는 MCP 클라이언트를 재시작

---

**작성일**: 2025-12-10
**버전**: 1.0.0
