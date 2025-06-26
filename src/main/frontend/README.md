# MHSafety Frontend

React 기반의 맨홀 추락방지시설 관리 시스템 프론트엔드입니다.

## 설치 및 실행

```bash
npm install
npm run dev
```

## API 설정

### 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하여 API URL을 설정할 수 있습니다:

```env
# 개발 환경
VITE_API_BASE_URL=http://localhost:8180
VITE_APP_TITLE=MHSafety
```

### API 설정 파일

`src/config/api.js` 파일에서 API 엔드포인트와 설정을 중앙에서 관리합니다:

- **환경별 설정**: 개발/프로덕션 환경에 따른 API URL 자동 선택
- **엔드포인트 관리**: 모든 API 엔드포인트를 한 곳에서 관리
- **CORS 설정**: 크로스 오리진 요청 설정 중앙화
- **헤더 관리**: 공통 HTTP 헤더 설정

### 사용 예시

```javascript
import { getApiUrl, API_ENDPOINTS, getCorsConfig } from "../config/api";

// API 호출
const response = await fetch(getApiUrl(API_ENDPOINTS.USERS.GET_ALL));

// 파일 업로드
const response = await fetch(getApiUrl(API_ENDPOINTS.UPLOAD.TEMP), {
  method: "POST",
  body: formData,
  ...getCorsConfig(),
});
```

## 주요 기능

- 사용자 관리 (CRUD)
- 작업 정보 관리 (CRUD)
- 파일 업로드 및 미리보기
- 반응형 디자인

## 기술 스택

- React 18
- Vite
- CSS3
- Fetch API

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
