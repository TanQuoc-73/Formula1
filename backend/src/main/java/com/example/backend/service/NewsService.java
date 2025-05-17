package com.example.backend.service;

import com.example.backend.model.News;
import com.example.backend.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NewsService {

    @Autowired
    private NewsRepository newsRepository;

    // Lấy tất cả tin tức
    public List<News> getAllNews() {
        return newsRepository.findAll();
    }

    // Lấy tin tức theo ID
    public Optional<News> getNewsById(Long id) {
        return newsRepository.findById(id);
    }

    // Tạo hoặc cập nhật tin tức
    public News saveNews(News news) {
        return newsRepository.save(news);
    }

    // Xóa tin tức theo ID
    public void deleteNews(Long id) {
        newsRepository.deleteById(id);
    }
}