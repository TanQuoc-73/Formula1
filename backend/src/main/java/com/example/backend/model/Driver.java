package com.example.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "Drivers")
public class Driver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DriverID")
    private Integer driverId;

    @ManyToOne
    @JoinColumn(name = "TeamID")
    private Team team;

    @Column(name = "drivername", nullable = false, length = 100)
    private String driverName;

    @Column(name = "nationality", length = 50)
    private String nationality;

    @Column(name = "birthdate")
    private LocalDate birthDate;

    @Column(name = "driverpoints")
    private Integer driverPoints;

    public Driver() {
    }

    public Driver(Team team, String driverName, String nationality, LocalDate birthDate, Integer driverPoints) {
        this.team = team;
        this.driverName = driverName;
        this.nationality = nationality;
        this.birthDate = birthDate;
        this.driverPoints = driverPoints;
    }

    public Integer getDriverId() {
        return driverId;
    }

    public void setDriverId(Integer driverId) {
        this.driverId = driverId;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public String getDriverName() {
        return driverName;
    }

    public void setDriverName(String driverName) {
        this.driverName = driverName;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public Integer getDriverPoints() {
        return driverPoints;
    }

    public void setDriverPoints(Integer driverPoints) {
        this.driverPoints = driverPoints;
    }
}