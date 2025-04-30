package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Vô hiệu hóa CSRF trong phát triển
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**", "/api/").permitAll() // Cho phép truy cập công khai vào /api/auth/** và /api/
                .requestMatchers("/api/users","/api/teams", "/api/drivers", "/api/tracks", "/api/races", 
                                "/api/race-results", "/api/schedules", "/api/fastest-laps","/api/login_history", "/api/teams-with-drivers").permitAll() // Tạm thời cho phép các endpoint F1
                .anyRequest().authenticated() // Các request khác yêu cầu xác thực
            )
            .formLogin(form -> form.disable()) // Vô hiệu hóa form đăng nhập mặc định
            .httpBasic(httpBasic -> httpBasic.disable()); // Vô hiệu hóa HTTP Basic auth

        return http.build();
    }
}