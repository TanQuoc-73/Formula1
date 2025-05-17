package com.example.backend.controller;

import com.example.backend.model.News;
import com.example.backend.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins = "http://localhost:3000")

public class NewsController {

    @Autowired
    private NewsService newsService;

    // Lấy tất cả tin tức
    @GetMapping
    public List<News> getAllNews() {
        return newsService.getAllNews();
    }

    // Lấy tin tức theo ID
    @GetMapping("/{id}")
    public ResponseEntity<News> getNewsById(@PathVariable Long id) {
        News news = newsService.getNewsById(id)
                .orElseThrow(() -> new RuntimeException("News not found with id: " + id));
        return ResponseEntity.ok(news);
    }

    // Tạo tin tức mới
    @PostMapping
    public News createNews(@RequestBody News news) {
        return newsService.saveNews(news);
    }

    // Cập nhật tin tức
    @PutMapping("/{id}")
    public ResponseEntity<News> updateNews(@PathVariable Long id, @RequestBody News newsDetails) {
        News news = newsService.getNewsById(id)
                .orElseThrow(() -> new RuntimeException("News not found with id: " + id));
        
        news.setTitle(newsDetails.getTitle());
        news.setContent(newsDetails.getContent());
        news.setPublishedDate(newsDetails.getPublishedDate());
        news.setAuthor(newsDetails.getAuthor());
        news.setImageUrl(newsDetails.getImageUrl());
        news.setRace(newsDetails.getRace());
        news.setTeam(newsDetails.getTeam());

        News updatedNews = newsService.saveNews(news);
        return ResponseEntity.ok(updatedNews);
    }

    // Xóa tin tức
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable Long id) {
        News news = newsService.getNewsById(id)
                .orElseThrow(() -> new RuntimeException("News not found with id: " + id));
        newsService.deleteNews(id);
        return ResponseEntity.noContent().build();
    }
}