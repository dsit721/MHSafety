package com.infrax.mhsafety.repository;

import com.infrax.mhsafety.entity.Work;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface WorkRepository extends JpaRepository<Work, Long> {
    
    // 작업일자로 검색
    List<Work> findByWorkDate(LocalDate workDate);
    
    // 작업자로 검색
    List<Work> findByWorkerContainingIgnoreCase(String worker);
    
    // 주소로 검색
    List<Work> findByAddressContainingIgnoreCase(String address);
    
    // 상태로 검색
    List<Work> findByStatus(String status);
    
    // 작업일자 범위로 검색
    List<Work> findByWorkDateBetween(LocalDate startDate, LocalDate endDate);
    
    // 작업자와 상태로 검색
    List<Work> findByWorkerContainingIgnoreCaseAndStatus(String worker, String status);
    
    // 커스텀 쿼리 - 최근 작업 조회
    @Query("SELECT w FROM Work w ORDER BY w.workDate DESC, w.createdAt DESC")
    List<Work> findRecentWorks();
    
    // 커스텀 쿼리 - 특정 기간의 작업 조회
    @Query("SELECT w FROM Work w WHERE w.workDate >= :startDate AND w.workDate <= :endDate ORDER BY w.workDate DESC")
    List<Work> findWorksByDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
} 