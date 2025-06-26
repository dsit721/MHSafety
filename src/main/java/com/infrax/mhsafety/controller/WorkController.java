package com.infrax.mhsafety.controller;

import com.infrax.mhsafety.entity.Work;
import com.infrax.mhsafety.service.WorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/works")
public class WorkController {
    
    private final WorkService workService;
    
    @Autowired
    public WorkController(WorkService workService) {
        this.workService = workService;
    }
    
    // 모든 작업 조회
    @GetMapping
    public ResponseEntity<List<Work>> getAllWorks() {
        List<Work> works = workService.getAllWorks();
        return ResponseEntity.ok(works);
    }
    
    // ID로 작업 조회
    @GetMapping("/{id}")
    public ResponseEntity<Work> getWorkById(@PathVariable Long id) {
        Optional<Work> work = workService.getWorkById(id);
        return work.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }
    
    // 새 작업 생성
    @PostMapping
    public ResponseEntity<Work> createWork(@Valid @RequestBody Work work) {
        Work savedWork = workService.saveWork(work);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedWork);
    }
    
    // 작업 정보 업데이트
    @PutMapping("/{id}")
    public ResponseEntity<Work> updateWork(@PathVariable Long id, @Valid @RequestBody Work workDetails) {
        try {
            Work updatedWork = workService.updateWork(id, workDetails);
            return ResponseEntity.ok(updatedWork);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // 작업 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWork(@PathVariable Long id) {
        workService.deleteWork(id);
        return ResponseEntity.noContent().build();
    }
    
    // 작업일자로 검색
    @GetMapping("/search/date")
    public ResponseEntity<List<Work>> getWorksByDate(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate workDate) {
        List<Work> works = workService.getWorksByDate(workDate);
        return ResponseEntity.ok(works);
    }
    
    // 작업자로 검색
    @GetMapping("/search/worker")
    public ResponseEntity<List<Work>> getWorksByWorker(@RequestParam String worker) {
        List<Work> works = workService.getWorksByWorker(worker);
        return ResponseEntity.ok(works);
    }
    
    // 주소로 검색
    @GetMapping("/search/address")
    public ResponseEntity<List<Work>> getWorksByAddress(@RequestParam String address) {
        List<Work> works = workService.getWorksByAddress(address);
        return ResponseEntity.ok(works);
    }
    
    // 상태로 검색
    @GetMapping("/search/status")
    public ResponseEntity<List<Work>> getWorksByStatus(@RequestParam String status) {
        List<Work> works = workService.getWorksByStatus(status);
        return ResponseEntity.ok(works);
    }
    
    // 작업일자 범위로 검색
    @GetMapping("/search/date-range")
    public ResponseEntity<List<Work>> getWorksByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<Work> works = workService.getWorksByDateRange(startDate, endDate);
        return ResponseEntity.ok(works);
    }
    
    // 작업자와 상태로 검색
    @GetMapping("/search/worker-status")
    public ResponseEntity<List<Work>> getWorksByWorkerAndStatus(
            @RequestParam String worker, @RequestParam String status) {
        List<Work> works = workService.getWorksByWorkerAndStatus(worker, status);
        return ResponseEntity.ok(works);
    }
} 