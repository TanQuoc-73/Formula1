    package com.example.backend.model;

    import jakarta.persistence.*;
    import java.time.LocalDateTime;

    @Entity
    @Table(name = "News")
    public class News {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "NewsID")
        private Long newsId;

        @Column(name = "Title", nullable = false, length = 255)
        private String title;

        @Column(name = "Content", nullable = false, columnDefinition = "TEXT")
        private String content;

        @Column(name = "PublishedDate", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
        private LocalDateTime publishedDate;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "AuthorID", referencedColumnName = "UserID")
        private User author;

        @Column(name = "ImageURL", length = 500)
        private String imageUrl;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "RaceID", referencedColumnName = "RaceID")
        private Race race;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "TeamID", referencedColumnName = "TeamID")
        private Team team;

        // Constructors
        public News() {}

        public News(String title, String content, LocalDateTime publishedDate, User author, String imageUrl, Race race, Team team) {
            this.title = title;
            this.content = content;
            this.publishedDate = publishedDate;
            this.author = author;
            this.imageUrl = imageUrl;
            this.race = race;
            this.team = team;
        }

        // Getters and Setters
        public Long getNewsId() {
            return newsId;
        }

        public void setNewsId(Long newsId) {
            this.newsId = newsId;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getContent() {
            return content;
        }

        public void setContent(String content) {
            this.content = content;
        }

        public LocalDateTime getPublishedDate() {
            return publishedDate;
        }

        public void setPublishedDate(LocalDateTime publishedDate) {
            this.publishedDate = publishedDate;
        }

        public User getAuthor() {
            return author;
        }

        public void setAuthor(User author) {
            this.author = author;
        }

        public String getImageUrl() {
            return imageUrl;
        }

        public void setImageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
        }

        public Race getRace() {
            return race;
        }

        public void setRace(Race race) {
            this.race = race;
        }

        public Team getTeam() {
            return team;
        }

        public void setTeam(Team team) {
            this.team = team;
        }
    }