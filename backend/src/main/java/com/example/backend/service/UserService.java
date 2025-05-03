package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.validation.constraints.NotBlank;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    private static final User.Role DEFAULT_ROLE = User.Role.ThanhVien; //mặc định là thành viên

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Custom exceptions
    public static class UsernameAlreadyExistsException extends RuntimeException {
        public UsernameAlreadyExistsException(String message) {
            super(message);
        }
    }

    public static class InvalidCredentialsException extends RuntimeException {
        public InvalidCredentialsException(String message) {
            super(message);
        }
    }

    public static class IllegalArgumentException extends RuntimeException {
        public IllegalArgumentException(String message) {
            super(message);
        }
    }

    public User registerUser(
        @NotBlank(message = "Username cannot be empty") String userName,
        @NotBlank(message = "Password cannot be empty") String password,
        String firstName,
        String lastName
    ) {
        logger.info("Registering user: {}", userName);

        if (userRepository.findByUserName(userName).isPresent()) {
            throw new UsernameAlreadyExistsException("Username already exists");
        }

        User user = new User();
        user.setUserName(userName);
        user.setPassWord(passwordEncoder.encode(password));
        // Thêm thông tin firstName và lastName
        user.setFirstName(firstName);
        user.setLastName(lastName);
        
        user.setRole(DEFAULT_ROLE);
        user.setCreatedAt(Timestamp.valueOf(LocalDateTime.now()));

        return userRepository.save(user);
    }

    public User loginUser(@NotBlank(message = "Username cannot be empty") String userName,
                         @NotBlank(message = "Password cannot be empty") String password) {
        logger.info("Attempting login for user: {}", userName);

        return userRepository.findByUserName(userName)
                .filter(user -> passwordEncoder.matches(password, user.getPassWord()))
                .orElseThrow(() -> new InvalidCredentialsException("Invalid username or password"));
    }

    public User updateUser(Integer id, User updatedUser) {
        logger.info("Updating user with ID: {}", id);

        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng với ID: " + id));

        // Kiểm tra username trùng lặp nếu có thay đổi
        if (!existingUser.getUserName().equals(updatedUser.getUserName()) &&
            userRepository.findByUserName(updatedUser.getUserName()).isPresent()) {
            throw new UsernameAlreadyExistsException("Tên người dùng đã tồn tại");
        }

        // Cập nhật thông tin
        existingUser.setUserName(updatedUser.getUserName());
        if (updatedUser.getPassWord() != null && !updatedUser.getPassWord().isEmpty()) {
            existingUser.setPassWord(passwordEncoder.encode(updatedUser.getPassWord()));
        }
        existingUser.setFirstName(updatedUser.getFirstName());
        existingUser.setLastName(updatedUser.getLastName());
        existingUser.setRole(updatedUser.getRole());

        return userRepository.save(existingUser);
    }
}