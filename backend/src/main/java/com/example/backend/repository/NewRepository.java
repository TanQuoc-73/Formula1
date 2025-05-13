package com.example.backend.repository;

import com.example.backend.model.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewRepository extends JpaRepository<News, Long> {
    // Có thể thêm các phương thức truy vấn tùy chỉnh nếu cần
}