package com.example.backend.model;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "LichSuDangNhap")
public class LoginHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "UserID", referencedColumnName = "UserID")
    private User user;

    @Column(name = "LoginHistory")
    private Timestamp loginHistory;

    public LoginHistory() {
    }

    public LoginHistory(User user, Timestamp loginHistory) {
        this.user = user;
        this.loginHistory = loginHistory;
    }

    // Getters và Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Timestamp getLoginHistory() {
        return loginHistory;
    }

    public void setLoginHistory(Timestamp loginHistory) {
        this.loginHistory = loginHistory;
    }
}
