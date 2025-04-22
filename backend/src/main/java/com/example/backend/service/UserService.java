package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        // Kiểm tra xem username đã tồn tại chưa
        if (userRepository.findByUserName(user.getUserName()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        // Mã hóa mật khẩu
        user.setPassWord(passwordEncoder.encode(user.getPassWord()));

        // Thiết lập giá trị mặc định
        user.setRole("USER"); // Vai trò mặc định
        user.setCreateat(Date.valueOf(LocalDate.now())); // Ngày tạo

        // Lưu user vào database
        return userRepository.save(user);
    }
}