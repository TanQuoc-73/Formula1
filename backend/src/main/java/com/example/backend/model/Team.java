package com.example.backend.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "Teams")
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TeamID")
    private Integer teamId;

    @Column(name = "teamname", nullable = false, length = 100)
    private String teamName;

    @Column(name = "baselocation", length = 100)
    private String baseLocation;

    @Column(name = "numchamptitles")
    private Integer numChampTitles;

    @Column(name = "totalpoints")
    private Integer totalPoints;

    // Thêm quan hệ OneToMany với Driver
    @OneToMany
    @JoinColumn(name = "team_id") // Cột team_id trong bảng Driver
    private List<Driver> drivers;

    // Constructors
    public Team() {
    }

    public Team(String teamName, String baseLocation, Integer numChampTitles, Integer totalPoints) {
        this.teamName = teamName;
        this.baseLocation = baseLocation;
        this.numChampTitles = numChampTitles;
        this.totalPoints = totalPoints;
    }

    // Getters và Setters
    public Integer getTeamId() {
        return teamId;
    }

    public void setTeamId(Integer teamId) {
        this.teamId = teamId;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getBaseLocation() {
        return baseLocation;
    }

    public void setBaseLocation(String baseLocation) {
        this.baseLocation = baseLocation;
    }

    public Integer getNumChampTitles() {
        return numChampTitles;
    }

    public void setNumChampTitles(Integer numChampTitles) {
        this.numChampTitles = numChampTitles;
    }

    public Integer getTotalPoints() {
        return totalPoints;
    }

    public void setTotalPoints(Integer totalPoints) {
        this.totalPoints = totalPoints;
    }

    // Getter và Setter cho drivers
    public List<Driver> getDrivers() {
        return drivers;
    }

    public void setDrivers(List<Driver> drivers) {
        this.drivers = drivers;
    }
}