# 🛒 커머스 플랫폼 - PORTSTYLE

이커머스 서비스를 위한 풀스택 모노레포 프로젝트입니다.   
Turborepo를 기반으로 프론트엔드와 백엔드가 긴밀하게 연결되어 있습니다.

👉 서비스: https://portstyle.shop   

---
## 🏗 프로젝트 구조 (Monorepo)

```text
├── apps
│   ├── api (NestJS - 백엔드)
│   └── web (Next.js - 프론트엔드)
├── packages
│   ├── ui (공용 컴포넌트 라이브러리)
│   ├── eslint-config (공용 린트 설정)
│   └── typescript-config (공용 TS 설정)
└── README.md
```
- Turborepo 기반 모노레포 구조로 프론트/백엔드 통합 관리

---
## 💻 프론트엔드 (apps/web)
### 🛠 기술 스택

| 분류 | 기술 |
|------|------|
| **Framework** | Next.js 15.5.12 (App Router) |
| **언어** | TypeScript |
| **서버 상태** | TanStack Query (React Query v5) |
| **클라이언트 상태** | Zustand |
| **스타일** | Tailwind CSS |
| **HTTP 클라이언트** | Axios |
| **타입 생성** | openapi-typescript  |
| **테스트** | Vitest + Testing Library |

---

### 📂 폴더 구조 및 레이어

```
apps/web/
├── app/                    # Next.js App Router — 라우팅 및 페이지
│   ├── layout.tsx          # 루트 레이아웃 (NavBar, Footer, Provider 적용)
│   ├── page.tsx            # 메인(홈) 페이지
│   ├── (auth)/             # 인증 라우트 그룹 (레이아웃 분리)
│   │   ├── login/          # /login 페이지
│   │   └── signup/         # /signup 페이지
│   ├── shop/               # /shop 상품 목록 페이지
│   ├── products/[id]/      # /products/:id 상품 상세 페이지
│   ├── cart/               # /cart 장바구니 페이지
│   ├── sitemap.ts          # SEO — 사이트맵 자동 생성
│   └── robots.ts           # SEO — 크롤러 접근 제어
│
├── features/               # 도메인별 기능 모듈 (핵심 레이어)
│   ├── auth/               # 인증 도메인
│   ├── products/           # 상품 도메인
│   └── cart/               # 장바구니 도메인
│
├── components/             # 재사용 가능한 공통 UI 컴포넌트
│   ├── common/             # 도메인 무관 공용 컴포넌트
│   └── layout/             # 레이아웃 전용 컴포넌트
│
├── store/                  # 전역 UI 상태 (Zustand)
├── providers/              # React Context 및 라이브러리 Provider
├── utils/                  # 유틸리티 (Axios 인스턴스 등)
└── src/api/                # 백엔드 OpenAPI 스키마 자동 생성 타입
```

---


### 🗃 상태 관리 전략

| 상태 종류 | 도구 | 위치 |
|-----------|------|------|
| **서버 데이터 캐싱** (상품 목록, 프로필 등) | TanStack Query | `features/*/api/` |
| **인증 상태** (유저, 토큰, 장바구니 등) | Zustand | `features/auth/store/` |
| **전역 UI 상태** (모달 등) | Zustand | `store/` |

---

#### 🔌 핵심 유틸리티

### [utils/apiClient.ts](file:///c:/Users/yejin/Desktop/dev/commerce-stack/apps/web/utils/apiClient.ts) — Axios 인스턴스

모든 API 요청의 단일 진입점입니다.

- **요청 인터셉터**: Zustand에서 AccessToken을 읽어 `Authorization` 헤더 자동 첨부
- **응답 인터셉터**: `TOKEN_EXPIRED` 오류 시 `/auth/refresh` 자동 호출 후 원래 요청 재시도
- **경쟁 조건 처리**: `isRefreshing` 플래그로 토큰 갱신 요청을 1회로 제한, 대기 요청은 큐에서 일괄 처리

### `src/api/schema.ts` — 자동 생성 타입

백엔드 Swagger(`/api-json`)로부터 `openapi-typescript`로 자동 생성된 타입입니다.  
백엔드 DTO 변경 시 프론트엔드 타입을 재생성하여 타입 불일치를 구조적으로 방지합니다.

---
### 🔄 CI & Deployment

코드 변경이 서비스에 미치는 영향을 최소화하고, 안정적인 배포를 위해 CI 환경을 구성했습니다.   

- **CI (Continuous Integration)**  
  GitHub Actions를 활용하여 `main` 브랜치에 push 또는 Pull Request 발생 시  
  프론트엔드 유닛 테스트(Vitest)를 자동 실행하도록 설정

- **Deployment**  
  Vercel(Frontend)과 Render(Backend)의 자동 배포 환경을 활용

- **안전 장치**  
  GitHub Branch Protection Rule에서 'Frontend Tests'를 Required로 설정   
  Vercel Status Check시 required일때는 배포하지 않음 -> 테스트 실패한 코드의 배포를 방지

---
### 🌐 SEO 설정

| 파일 | 내용 |
|------|------|
| [app/layout.tsx](file:///c:/Users/yejin/Desktop/dev/commerce-stack/apps/web/app/layout.tsx) | OpenGraph, 키워드, canonical URL, robots 메타데이터 설정 |
| [app/sitemap.ts](file:///c:/Users/yejin/Desktop/dev/commerce-stack/apps/web/app/sitemap.ts) | 정적 라우트 사이트맵 자동 생성 (`/`, `/shop`, `/cart` 등) |
| [app/robots.ts](file:///c:/Users/yejin/Desktop/dev/commerce-stack/apps/web/app/robots.ts) | 검색 엔진 크롤러 접근 허용 범위 설정 |

---

### 🧪 테스트

```
features/
├── auth/api/useLogin.test.ts      # 로그인 훅 단위 테스트
├── auth/api/useProfile.test.ts    # 프로필 훅 단위 테스트
└── products/api/useProducts.test.ts # 상품 목록 훅 단위 테스트
```

Vitest + Testing Library의 `renderHook`으로 각 Query/Mutation 훅을 독립적으로 테스트합니다.

---
## 🔐 인증 구조
```text
apps/
├── api/src/auth/
│   ├── auth.controller.ts     # 엔드포인트 (signup, login, refresh, logout, profile)
│   ├── auth.service.ts        # 비즈니스 로직 (bcrypt, JWT 발급)
│   ├── auth.module.ts         # 모듈 의존성 등록
│   ├── jwt.strategy.ts        # Passport JWT 검증 전략
│   ├── jwt-auth.guard.ts      # 보호 엔드포인트용 가드
│   └── dto/
│       ├── signup.dto.ts      # 회원가입 요청 DTO
│       ├── login.dto.ts       # 로그인 요청 DTO
│       └── auth-response.dto.ts # 응답 타입 (Swagger용)
└── web/features/auth/
    ├── api/
    │   ├── useSignup.tsx      # useMutation: 회원가입
    │   ├── useLogin.ts        # useMutation: 로그인 + Zustand 저장
    │   └── useProfile.ts      # useQuery: 프로필 조회 (token 있을 때만)
    ├── store/
    │   └── useAuthStore.ts    # Zustand: user, token, 로그인/로그아웃 액션
    └── type/
        └── auth.ts            # 프론트 타입 (OpenAPI 스키마로 자동 생성)

utils/
└── apiClient.ts               # Axios 인스턴스 + 인터셉터 (자동 토큰 갱신)

```
JWT 기반 Access/Refresh Token 이중 인증 구조를 설계하고 적용했습니다.   
AccessToken은 메모리(Zustand)에 1시간동안, RefreshToken은 httpOnlyCookie에 7일동안 보관됩니다.   
토큰 갱신은 프론트엔드 인터셉터에서 'TOKEN_EXPIRED'을 응답받을경우 갱신을 시도합니다.   
플래그를 사용해 갱신 요청은 한번만 보내고 큐에 요청들을 보관한 후 토큰 갱신 이후 큐에 쌓인 요청들을 일괄 재시도 합니다.   


---

## 💻 백엔드 아키텍처 (apps/api)

백엔드 구조는 AI 도구를 활용해 구성하였으며, 데이터 흐름과 아키텍처 설계를 중심으로 이해하고 연동했습니다.   
NestJS 프레임워크를 기반으로 하며, 도메인 중심의 모듈화된 구조를 따릅니다.

### 🛠 기술 스택
- **Framework**: NestJS
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Documentation**: Swagger (OpenAPI)
- **Security**: Passport.js, JWT, Bcrypt

### 📂 폴더 구조 및 모듈
`apps/api/src` 내부의 각 모듈은 독립적인 도메인을 담당합니다.

- **`auth/`**: 인증 및 인가 (JWT 전략, 로그인, 회원가입)
- **`users/`**: 유저 정보 관리
- **`products/`**: 상품 정보, 필터링, 검색 기능
- **`categories/`**: 상품 카테고리 관리
- **`cart/`**: 장바구니 로직
- **`orders/`**: 주문 생성 및 이력 관리
- **`prisma/`**: 데이터베이스 연결 및 Prisma 서비스
- **`main.ts`**: 애플리케이션 진입점 및 전역 설정 (CORS, Validation, Swagger)

### 📝 API 문서 (Swagger)
서버 실행 시 아래 주소에서 인터랙티브한 API 문서를 확인할 수 있습니다.
- **URL**: `http://localhost:9090/api`
- **JSON Spec**: `http://localhost:9090/api-json`

---

## 🚀 시작하기 (Execution)

### 전제 조건
- Node.js (v18 이상 권장)
- PostgreSQL (데이터베이스)

### 1. 패키지 설치
루트 디렉토리에서 아래 명령어를 실행하여 모든 앱과 패키지의 의존성을 설치합니다.
```bash
npm install
```

### 2. 환경 변수 설정
각 앱의 디렉토리에 `.env` 파일을 생성하고 필요한 환경 변수를 설정합니다.
- `apps/api/.env`: `DATABASE_URL`, `JWT_SECRET` 등
- `apps/web/.env`: `NEXT_PUBLIC_API_URL` 등

### 3. 개발 서버 실행
루트에서 아래 명령어를 실행하면 모든 앱(web, api)이 동시에 실행됩니다.
```bash
npx turbo dev
```
또는 특정 앱만 실행하려면:
```bash
# 프론트엔드만 실행
npx turbo dev --filter=web

# 백엔드만 실행
npx turbo dev --filter=api
```
---
