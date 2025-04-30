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
        user.setRole(User.Role.ThanhVien); // Vai trò mặc định (để nguyên đoạn comment của bạn)
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

    public User updateUser(Integer id, User updatedUser) {
        // Tìm user hiện tại theo ID
        User existingUser = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với ID: " + id));

        // Kiểm tra xem username mới có bị trùng không (nếu username thay đổi)
        if (!existingUser.getUserName().equals(updatedUser.getUserName()) &&
            userRepository.findByUserName(updatedUser.getUserName()).isPresent()) {
            throw new RuntimeException("Tên người dùng đã tồn tại");
        }

        // Cập nhật các trường
        existingUser.setUserName(updatedUser.getUserName());
        // Nếu mật khẩu thay đổi, mã hóa lại
        if (!updatedUser.getPassWord().equals(existingUser.getPassWord())) {
            existingUser.setPassWord(passwordEncoder.encode(updatedUser.getPassWord()));
        }
        existingUser.setFirstName(updatedUser.getFirstName());
        existingUser.setLastName(updatedUser.getLastName());
        existingUser.setRole(updatedUser.getRole());
        existingUser.setCreatedAt(updatedUser.getCreatedAt());

        // Lưu user đã cập nhật vào database
        return userRepository.save(existingUser);
    }
}