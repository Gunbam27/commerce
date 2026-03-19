# Testing Guide

현재 프론트엔드에서만 테스트를 진행하고 있습니다.

## 1. 테스트 전략
- **Unit (단위 테스트)**: 로직, 유틸리티, 상태 저장소(Zustand) 검증.
- **Integration (통합 테스트)**: 커스텀 훅 및 API 연동 컴포넌트 검증. (가장 비중이 높음)

## 2. 기술 스택
- Vitest: 테스트 러너 및 단언(Assertion) 라이브러리.
- MSW (Mock Service Worker) : 네트워크 레벨의 API 모킹.
- React Testing Library : React 컴포넌트 및 훅 테스팅.

## 3. 테스트 실행 방법

### Web (Frontend)
```bash
cd apps/web
npm run test        # 단발성 실행
npm run test:watch  # 변경 감지 모드
```

## 4. 테스트 작성 규칙
- 테스트 파일은 실제 코드 파일과 같은 경로에 위치합니다. 
  - 예: `useCart.ts` -> `useCart.test.ts`
- API 연동 테스트 시 `test/mocks/handlers.ts`에 핸들러를 추가하여 MSW를 사용합니다.

## 5. 테스트 파일 구조

| 분류 | 파일 경로 | 역할 |
| :--- | :--- | :--- |
| **설정** | `vitest.config.ts` | 테스트 전체 실행 설정 |
| | `test/setup.ts` | 테스트 전역 초기화 및 MSW 서버 관리 |
| **유틸리티** | `test/utils.tsx` | 테스트용 렌더링 및 QueryContext 래퍼 |
| **모킹** | `test/mocks/handlers.ts` | API 응답(Mock) 정의 |
| | `test/mocks/server.ts` | 모킹 서버 인스턴스 설정 |
| **테스트** | `features/auth/api/useLogin.test.ts` | 로그인 기능 검증 |
| | `features/auth/api/useProfile.test.ts` | 프로필 정보 조회 검증 |
| | `features/products/api/useProducts.test.ts` | 상품 목록 조회 검증 |
| | `features/cart/store/useCartStore.test.ts` | 장바구니 로직(Store) 검증 |
| | `features/cart/hooks/useCartManage.test.ts` | 장바구니 통합 관리 검증 |

