package com.infrax.mhsafety.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
public class FileUploadController {

    @Value("${file.upload.temp-dir:temp}")
    private String tempDir;

    @Value("${file.upload.upload-dir:upload}")
    private String uploadDir;

    @PostMapping("/temp")
    public ResponseEntity<String> uploadToTemp(@RequestParam("file") MultipartFile file) {
        try {
            // temp 디렉토리 생성
            Path tempPath = Paths.get(tempDir);
            if (!Files.exists(tempPath)) {
                Files.createDirectories(tempPath);
            }

            // 고유한 파일명 생성
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String uniqueFilename = UUID.randomUUID().toString() + extension;

            // temp 폴더에 파일 저장
            Path tempFilePath = tempPath.resolve(uniqueFilename);
            Files.copy(file.getInputStream(), tempFilePath, StandardCopyOption.REPLACE_EXISTING);

            return ResponseEntity.ok(uniqueFilename);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("파일 업로드 실패: " + e.getMessage());
        }
    }

    @PostMapping("/move")
    public ResponseEntity<String> moveFromTempToUpload(@RequestParam("filename") String filename) {
        try {
            // upload 디렉토리 생성
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path tempFilePath = Paths.get(tempDir, filename);
            Path uploadFilePath = Paths.get(uploadDir, filename);

            // temp에서 upload로 파일 이동
            if (Files.exists(tempFilePath)) {
                Files.move(tempFilePath, uploadFilePath, StandardCopyOption.REPLACE_EXISTING);
                return ResponseEntity.ok("/api/upload/files/" + filename);
            } else {
                return ResponseEntity.badRequest().body("임시 파일을 찾을 수 없습니다.");
            }
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("파일 이동 실패: " + e.getMessage());
        }
    }

    @GetMapping("/files/{filename}")
    public ResponseEntity<byte[]> getFile(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(uploadDir, filename);
            if (Files.exists(filePath)) {
                byte[] fileContent = Files.readAllBytes(filePath);
                return ResponseEntity.ok()
                        .header("Content-Disposition", "inline; filename=\"" + filename + "\"")
                        .header("Access-Control-Allow-Origin", "*")
                        .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
                        .header("Access-Control-Allow-Headers", "*")
                        .body(fileContent);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/files/{filename}")
    public ResponseEntity<String> deleteFile(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(uploadDir, filename);
            if (Files.exists(filePath)) {
                Files.delete(filePath);
                return ResponseEntity.ok("파일이 삭제되었습니다.");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("파일 삭제 실패: " + e.getMessage());
        }
    }
} 