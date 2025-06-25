package com.infrax.mhsafety.repository;

import com.infrax.mhsafety.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // 이메일로 사용자 찾기
    Optional<User> findByEmail(String email);
    
    // 이름으로 사용자 찾기
    List<User> findByNameContainingIgnoreCase(String name);
    
    // 이메일 존재 여부 확인
    boolean existsByEmail(String email);
    
    // 커스텀 쿼리 예시
    @Query("SELECT u FROM User u WHERE u.createdAt >= :startDate")
    List<User> findUsersCreatedAfter(@Param("startDate") java.time.LocalDateTime startDate);
} 