package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

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
            .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Thêm cấu hình CORS
            .csrf(csrf -> csrf.disable()) // Vô hiệu hóa CSRF trong phát triển
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/api/auth/**",
                    "/api/",
                    "/api/users",
                    "/api/user/**",  
                    "/api/teams",
                    "/api/teams/**",
                    "/api/teams/{teamId}",
                    "/api/teams/{id}",
                    "/api/drivers", 
                    "/api/tracks", 
                    "/api/races", 
                    "/api/race-results", 
                    "/api/schedules",
                    "/api/schedules/**",
                    "/api/fastest-laps",
                    "/api/login_history",
                    "/api/teams-with-drivers",
                    "/api/ai/test",
                    "/api/ai/**",
                    "/api/news",
                    "/api/news/**"
                ).permitAll() 
                .anyRequest().authenticated() 
            )
            .formLogin(form -> form.disable()) // Vô hiệu hóa form đăng nhập mặc định
            .httpBasic(httpBasic -> httpBasic.disable()); // Vô hiệu hóa HTTP Basic auth

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }
}