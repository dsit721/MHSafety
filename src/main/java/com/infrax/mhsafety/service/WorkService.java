package com.infrax.mhsafety.service;

import com.infrax.mhsafety.entity.Work;
import com.infrax.mhsafety.repository.WorkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class WorkService {
    
    private final WorkRepository workRepository;
    
    @Autowired
    public WorkService(WorkRepository workRepository) {
        this.workRepository = workRepository;
    }
    
    // 모든 작업 조회
    public List<Work> getAllWorks() {
        return workRepository.findRecentWorks();
    }
    
    // ID로 작업 조회
    public Optional<Work> getWorkById(Long id) {
        return workRepository.findById(id);
    }
    
    // 작업 저장
    public Work saveWork(Work work) {
        return workRepository.save(work);
    }
    
    // 작업 업데이트
    public Work updateWork(Long id, Work workDetails) {
        Optional<Work> workOptional = workRepository.findById(id);
        if (workOptional.isPresent()) {
            Work work = workOptional.get();
            work.setWorkDate(workDetails.getWorkDate());
            work.setAddress(workDetails.getAddress());
            work.setWorker(workDetails.getWorker());
            work.setDescription(workDetails.getDescription());
            work.setStatus(workDetails.getStatus());
            work.setFrontImage(workDetails.getFrontImage());
            work.setBeforeImage(workDetails.getBeforeImage());
            work.setAfterImage(workDetails.getAfterImage());
            return workRepository.save(work);
        }
        throw new RuntimeException("작업을 찾을 수 없습니다: " + id);
    }
    
    // 작업 삭제
    public void deleteWork(Long id) {
        workRepository.deleteById(id);
    }
    
    // 작업일자로 검색
    public List<Work> getWorksByDate(LocalDate workDate) {
        return workRepository.findByWorkDate(workDate);
    }
    
    // 작업자로 검색
    public List<Work> getWorksByWorker(String worker) {
        return workRepository.findByWorkerContainingIgnoreCase(worker);
    }
    
    // 주소로 검색
    public List<Work> getWorksByAddress(String address) {
        return workRepository.findByAddressContainingIgnoreCase(address);
    }
    
    // 상태로 검색
    public List<Work> getWorksByStatus(String status) {
        return workRepository.findByStatus(status);
    }
    
    // 작업일자 범위로 검색
    public List<Work> getWorksByDateRange(LocalDate startDate, LocalDate endDate) {
        return workRepository.findWorksByDateRange(startDate, endDate);
    }
    
    // 작업자와 상태로 검색
    public List<Work> getWorksByWorkerAndStatus(String worker, String status) {
        return workRepository.findByWorkerContainingIgnoreCaseAndStatus(worker, status);
    }
} 