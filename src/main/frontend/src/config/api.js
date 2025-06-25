// API 설정
const API_CONFIG = {
  // 개발 환경
  development: {
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
    timeout: 10000,
  },
  // 프로덕션 환경
  production: {
    baseURL:
      import.meta.env.VITE_API_BASE_URL || "https://your-production-domain.com",
    timeout: 15000,
  },
};

// 현재 환경에 따른 설정 가져오기
const getCurrentConfig = () => {
  const env = import.meta.env.MODE || "development";
  return API_CONFIG[env] || API_CONFIG.development;
};

// API 엔드포인트 정의
export const API_ENDPOINTS = {
  // 사용자 관련
  USERS: {
    GET_ALL: "/api/users",
    GET_BY_ID: (id) => `/api/users/${id}`,
    GET_BY_EMAIL: (email) => `/api/users/email/${email}`,
    CREATE: "/api/users",
    UPDATE: (id) => `/api/users/${id}`,
    DELETE: (id) => `/api/users/${id}`,
    SEARCH: "/api/users/search",
    CHECK_EMAIL: "/api/users/check-email",
  },

  // 작업 관련
  WORKS: {
    GET_ALL: "/api/works",
    GET_BY_ID: (id) => `/api/works/${id}`,
    CREATE: "/api/works",
    UPDATE: (id) => `/api/works/${id}`,
    DELETE: (id) => `/api/works/${id}`,
    SEARCH: "/api/works/search",
  },

  // 파일 업로드 관련
  UPLOAD: {
    TEMP: "/api/upload/temp",
    MOVE: "/api/upload/move",
    GET_FILE: (filename) => `/api/upload/files/${filename}`,
    DELETE_FILE: (filename) => `/api/upload/files/${filename}`,
  },
};

// API URL 생성 함수
export const getApiUrl = (endpoint) => {
  const config = getCurrentConfig();
  return `${config.baseURL}${endpoint}`;
};

// API 요청 헤더
export const getDefaultHeaders = () => {
  return {
    "Content-Type": "application/json",
  };
};

// CORS 설정
export const getCorsConfig = () => {
  return {
    mode: "cors",
    credentials: "omit",
  };
};

// 현재 설정 내보내기
export const currentConfig = getCurrentConfig();

// 기본 내보내기
export default {
  getApiUrl,
  getDefaultHeaders,
  getCorsConfig,
  API_ENDPOINTS,
  currentConfig,
};
