<!-- @format -->

-- users 테이블에 권한 컬럼 추가
ALTER TABLE users ADD COLUMN role VARCHAR(20) DEFAULT 'USER';
