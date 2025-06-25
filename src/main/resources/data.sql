-- MariaDB 데이터베이스 생성 스크립트
-- 이 스크립트는 MariaDB에서 직접 실행하거나 애플리케이션 시작 시 자동으로 실행됩니다.

-- 데이터베이스 생성 (필요한 경우)
-- CREATE DATABASE IF NOT EXISTS mhsafety CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 데이터베이스 사용
-- USE mhsafety;

-- 사용자 테이블 생성 (JPA가 자동으로 생성하지만, 수동으로도 가능)
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    role VARCHAR(50) NOT NULL
);

-- 작업 테이블 생성
CREATE TABLE IF NOT EXISTS works (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    work_date DATE NOT NULL,
    address VARCHAR(500) NOT NULL,
    worker VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) NOT NULL,
    front_image VARCHAR(500),
    before_image VARCHAR(500),
    after_image VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 샘플 사용자 데이터 삽입 (선택사항)
INSERT INTO users (name, email, password, role) VALUES 
('관리자', 'admin@mhsafety.com', 'password123', 'ADMIN'),
('테스트 사용자', 'test@mhsafety.com', 'password123', 'USER')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- 샘플 작업 데이터 삽입 (선택사항)
INSERT INTO works (work_date, address, worker, description, status, front_image, before_image, after_image) VALUES 
('2024-01-15', '서울특별시 강남구 테헤란로 123', '김철수', '맨홀 뚜껑 교체 및 안전장치 설치', '완료', 'https://example.com/front1.jpg', 'https://example.com/before1.jpg', 'https://example.com/after1.jpg'),
('2024-01-20', '서울특별시 서초구 서초대로 456', '이영희', '맨홀 내부 점검 및 정비', '진행중', 'https://example.com/front2.jpg', 'https://example.com/before2.jpg', NULL),
('2024-01-25', '서울특별시 마포구 와우산로 789', '박민수', '새로운 맨홀 설치 및 안전시설 구축', '대기', NULL, NULL, NULL)
ON DUPLICATE KEY UPDATE work_date = VALUES(work_date);

-- 추가된 샘플 사용자 데이터
INSERT INTO users (email, password, name, role) VALUES ('admin@test.com', 'admin123', '관리자', 'ADMIN');
INSERT INTO users (email, password, name, role) VALUES ('user1@test.com', 'user123', '사용자1', 'USER');
INSERT INTO users (email, password, name, role) VALUES ('user2@test.com', 'user123', '사용자2', 'USER'); 