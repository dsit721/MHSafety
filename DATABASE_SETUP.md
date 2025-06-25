<!-- @format -->

# MariaDB 설정 가이드

## 1. MariaDB 설치 및 설정

### MariaDB 설치

```bash
# Windows (Chocolatey 사용)
choco install mariadb

# 또는 MariaDB 공식 웹사이트에서 다운로드
# https://mariadb.org/download/
```

### MariaDB 서비스 시작

```bash
# Windows
net start MariaDB

# 또는 MariaDB 설치 디렉토리에서
mysqld --install
```

## 2. 데이터베이스 생성

MariaDB에 접속하여 데이터베이스를 생성합니다:

```sql
-- MariaDB 접속
mysql -u root -p

-- 데이터베이스 생성
CREATE DATABASE mhsafety CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 데이터베이스 확인
SHOW DATABASES;

-- 데이터베이스 사용
USE mhsafety;
```

## 3. 사용자 계정 설정

```sql
-- 새 사용자 생성 (선택사항)
CREATE USER 'mhsafety_user'@'localhost' IDENTIFIED BY 'your_password';

-- 권한 부여
GRANT ALL PRIVILEGES ON mhsafety.* TO 'mhsafety_user'@'localhost';

-- 권한 적용
FLUSH PRIVILEGES;
```

## 4. 애플리케이션 설정

### application.properties 수정

```properties
# 데이터베이스 연결 정보를 실제 환경에 맞게 수정
spring.datasource.url=jdbc:mariadb://localhost:3306/mhsafety
spring.datasource.username=root
spring.datasource.password=your_actual_password
```

## 5. 애플리케이션 실행

```bash
# 프로젝트 루트 디렉토리에서
./gradlew bootRun
```

## 6. API 테스트

애플리케이션이 실행되면 다음 API를 테스트할 수 있습니다:

### 사용자 생성

```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "홍길동",
    "email": "hong@example.com",
    "password": "password123"
  }'
```

### 모든 사용자 조회

```bash
curl http://localhost:8080/api/users
```

### 특정 사용자 조회

```bash
curl http://localhost:8080/api/users/1
```

## 7. 문제 해결

### 연결 오류

- MariaDB 서비스가 실행 중인지 확인
- 포트 3306이 사용 가능한지 확인
- 사용자명과 비밀번호가 올바른지 확인

### 테이블 생성 오류

- 데이터베이스가 존재하는지 확인
- 사용자에게 적절한 권한이 부여되었는지 확인

## 8. 개발 환경 설정

### IntelliJ IDEA

1. Database 도구 창 열기
2. MariaDB 연결 추가
3. Host: localhost, Port: 3306
4. Database: mhsafety
5. User: root (또는 생성한 사용자)

### VS Code

1. MariaDB 확장 설치
2. 연결 설정 추가
3. 쿼리 실행 및 데이터 확인 가능
