# React 커뮤니티 프로젝트 실습

Vite, React, Tailwind CSS를 기반으로 실제 동작하는 커뮤니티 웹 애플리케이션을 구축하는 실습 프로젝트입니다.
기본적인 UI 구성부터 상태 관리, API 연동, 인증, 배포까지 프론트엔드 개발의 전체 사이클을 경험하는 것을 목표로 합니다.

---

## 🚀 개발 커리큘럼 로드맵

### 1. 환경 설정 및 기본 레이아웃

- **주요 기술**: Vite, Tailwind CSS, DaisyUI
- **학습 목표**:
  - `npm create vite@latest`로 프로젝트 초기화
  - Tailwind CSS 및 PostCSS 설정
  - DaisyUI를 이용한 기본 테마 및 다크 모드 적용
  - ESLint, Prettier를 이용한 코드 포맷팅 및 컨벤션 설정

### 2. 라우팅 및 페이지 구조 설계

- **주요 기술**: React-Router v6
- **학습 목표**:
  - `BrowserRouter`를 사용하여 라우팅 시스템 등록
  - 중첩 라우팅을 이용한 레이아웃(Header/Footer) 유지
  - Home, Posts, Write 등 주요 페이지 경로 정의
  - `path: "*"`를 이용한 404 Fallback 컴포넌트 처리

### 3. Mock API 연동 및 비동기 데이터 처리

- **주요 기술**: MSW(Mock Service Worker), Fetch API
- **학습 목표**:
  - MSW를 이용해 실제 서버처럼 동작하는 Mock API 서버 구축
  - `useEffect`와 `fetch`를 사용해 게시물 목록 비동기적으로 로딩하기
  - 로딩(Loading), 성공(Success), 에러(Error) 상태에 따른 조건부 렌더링 구현

### 4. 전역 상태 관리

- **주요 기술**: Zustand
- **학습 목표**:
  - `create` 함수를 사용해 `posts`와 관련된 상태 및 액션(추가, 삭제 등)을 관리하는 `store` 정의
  - React Devtools 미들웨어를 연결하여 상태 변화 추적하기
  - 컴포넌트에서 상태와 액션을 가져와 사용하는 방법 학습

### 5. Form 처리 및 유효성 검사

- **주요 기술**: React-Hook-Form, Zod
- **학습 목표**:
  - `useForm` 훅을 사용해 글쓰기 폼의 상태 관리
  - Zod 스키마를 정의하여 폼 입력값에 대한 유효성 검사 구현
  - 유효성 검사 실패 시 에러 메시지 표시
  - 폼 제출 성공 시 Zustand `store`의 액션을 호출하여 새 게시물 추가

### 6. (심화) 사용자 인증 및 권한 관리

- **주요 기술**: Firebase Authentication, Private Routes
- **학습 목표**:
  - Firebase를 이용한 소셜 로그인(Google/GitHub) 기능 구현
  - 로그인 상태를 전역으로 관리하고, UI에 사용자 정보 표시
  - 로그인이 필요한 페이지(글쓰기 등)에 접근을 제어하는 `PrivateRoute` 구현

### 7. (심화) 사용자 경험(UX) 개선

- **주요 기술**: React-Query, Intersection Observer API
- **학습 목표**:
  - 페이지네이션 또는 무한 스크롤을 이용한 대용량 데이터 처리
  - 낙관적 업데이트(Optimistic Updates)를 적용하여 '좋아요' 등 빠른 UI 피드백 제공
  - React-Query를 도입하여 서버 상태 관리 고도화

### 8. 배포

- **주요 기술**: Vercel/Netlify, Environment Variables
- **학습 목표**:
  - `.env` 파일을 이용해 개발/프로덕션 환경 변수 분리
  - GitHub 저장소와 Vercel을 연동하여 CI/CD 파이프라인 구축
  - 원클릭으로 실제 웹에 프로젝트 배포 및 공유

test
