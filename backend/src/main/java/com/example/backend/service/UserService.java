package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;

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
        user.setRole(User.Role.ThanhVien); // Vai trò mặc định
        user.setCreatedAt(Timestamp.valueOf(LocalDateTime.now())); // Thời gian tạo

        // Lưu user vào database
        return userRepository.save(user);
    }

    public User loginUser(String userName, String password) {
        // Tìm user theo username
        User user = userRepository.findByUserName(userName)
            .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        // So sánh mật khẩu nhập vào với mật khẩu đã hash
        if (!passwordEncoder.matches(password, user.getPassWord())) {
            throw new RuntimeException("Invalid username or password");
        }

        return user;
    }
}