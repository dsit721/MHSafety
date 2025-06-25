package com.infrax.mhsafety.service;

import com.infrax.mhsafety.entity.User;
import com.infrax.mhsafety.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {
    
    private final UserRepository userRepository;
    
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    // 모든 사용자 조회
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    // ID로 사용자 조회
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    
    // 이메일로 사용자 조회
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    // 사용자 저장
    public User saveUser(User user) {
        return userRepository.save(user);
    }
    
    // 사용자 업데이트
    public User updateUser(Long id, User userDetails) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setName(userDetails.getName());
            user.setEmail(userDetails.getEmail());
            if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
                user.setPassword(userDetails.getPassword());
            }
            return userRepository.save(user);
        }
        throw new RuntimeException("사용자를 찾을 수 없습니다: " + id);
    }
    
    // 사용자 삭제
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    
    // 이메일 중복 확인
    public boolean isEmailExists(String email) {
        return userRepository.existsByEmail(email);
    }
    
    // 이름으로 사용자 검색
    public List<User> searchUsersByName(String name) {
        return userRepository.findByNameContainingIgnoreCase(name);
    }
} 