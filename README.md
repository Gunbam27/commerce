# Commerce Stack (Monorepo)

현대적인 이커머스 서비스를 위한 풀스택 모노레포 프로젝트입니다. Turborepo를 기반으로 프론트엔드와 백엔드가 긴밀하게 연결되어 있습니다.

---

## 🏗 프로젝트 구조 (Monorepo)

```text
.
├── apps
│   ├── api (NestJS - 백엔드)
│   └── web (Next.js - 프론트엔드)
├── packages
│   ├── ui (공용 컴포넌트 라이브러리)
│   ├── eslint-config (공용 린트 설정)
│   └── typescript-config (공용 TS 설정)
└── README.md
```

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

## 💻 백엔드 아키텍처 (apps/api)

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

## 🌐 프론트엔드 타입 연동 (apps/web)

백엔드의 API 명세를 바탕으로 프론트엔드 타입을 자동으로 생성합니다.

### 타입 생성 방법
API 서버가 실행 중인 상태에서 `apps/web` 디렉토리로 이동 후 아래 명령어를 실행합니다.
```bash
npm run generate:types
```
이 명령어는 `apps/web/src/api/schema.ts` 파일을 생성하여 백엔드와 동일한 타입을 프론트엔드에서 사용할 수 있게 해줍니다.

---

