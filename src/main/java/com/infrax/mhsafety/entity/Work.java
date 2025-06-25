package com.infrax.mhsafety.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "works")
public class Work {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull(message = "작업일자는 필수입니다")
    @Column(name = "work_date", nullable = false)
    private LocalDate workDate;
    
    @NotBlank(message = "주소는 필수입니다")
    @Column(name = "address", nullable = false, length = 500)
    private String address;
    
    @NotBlank(message = "작업자는 필수입니다")
    @Column(name = "worker", nullable = false, length = 100)
    private String worker;
    
    @NotBlank(message = "작업설명은 필수입니다")
    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;
    
    @NotBlank(message = "상태는 필수입니다")
    @Column(name = "status", nullable = false, length = 50)
    private String status;
    
    @Column(name = "front_image", length = 500)
    private String frontImage;
    
    @Column(name = "before_image", length = 500)
    private String beforeImage;
    
    @Column(name = "after_image", length = 500)
    private String afterImage;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // 기본 생성자
    public Work() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    // 생성자
    public Work(LocalDate workDate, String address, String worker, String description, String status) {
        this();
        this.workDate = workDate;
        this.address = address;
        this.worker = worker;
        this.description = description;
        this.status = status;
    }
    
    // Getter와 Setter
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public LocalDate getWorkDate() {
        return workDate;
    }
    
    public void setWorkDate(LocalDate workDate) {
        this.workDate = workDate;
        this.updatedAt = LocalDateTime.now();
    }
    
    public String getAddress() {
        return address;
    }
    
    public void setAddress(String address) {
        this.address = address;
        this.updatedAt = LocalDateTime.now();
    }
    
    public String getWorker() {
        return worker;
    }
    
    public void setWorker(String worker) {
        this.worker = worker;
        this.updatedAt = LocalDateTime.now();
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
        this.updatedAt = LocalDateTime.now();
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
        this.updatedAt = LocalDateTime.now();
    }
    
    public String getFrontImage() {
        return frontImage;
    }
    
    public void setFrontImage(String frontImage) {
        this.frontImage = frontImage;
        this.updatedAt = LocalDateTime.now();
    }
    
    public String getBeforeImage() {
        return beforeImage;
    }
    
    public void setBeforeImage(String beforeImage) {
        this.beforeImage = beforeImage;
        this.updatedAt = LocalDateTime.now();
    }
    
    public String getAfterImage() {
        return afterImage;
    }
    
    public void setAfterImage(String afterImage) {
        this.afterImage = afterImage;
        this.updatedAt = LocalDateTime.now();
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
} 