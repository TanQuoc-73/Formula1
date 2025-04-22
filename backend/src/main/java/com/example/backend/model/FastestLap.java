package com.example.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalTime;

@Entity
@Table(name = "FastestLaps")
public class FastestLap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FastestLapID")
    private Integer fastestLapId;

    @ManyToOne
    @JoinColumn(name = "RaceID")
    private Race race;

    @ManyToOne
    @JoinColumn(name = "DriverID")
    private Driver driver;

    @Column(name = "laptime")
    private LocalTime lapTime;

    @Column(name = "lapnumber")
    private Integer lapNumber;

    public FastestLap() {
    }

    public FastestLap(Race race, Driver driver, LocalTime lapTime, Integer lapNumber) {
        this.race = race;
        this.driver = driver;
        this.lapTime = lapTime;
        this.lapNumber = lapNumber;
    }

    public Integer getFastestLapId() {
        return fastestLapId;
    }

    public void setFastestLapId(Integer fastestLapId) {
        this.fastestLapId = fastestLapId;
    }

    public Race getRace() {
        return race;
    }

    public void setRace(Race race) {
        this.race = race;
    }

    public Driver getDriver() {
        return driver;
    }

    public void setDriver(Driver driver) {
        this.driver = driver;
    }

    public LocalTime getLapTime() {
        return lapTime;
    }

    public void setLapTime(LocalTime lapTime) {
        this.lapTime = lapTime;
    }

    public Integer getLapNumber() {
        return lapNumber;
    }

    public void setLapNumber(Integer lapNumber) {
        this.lapNumber = lapNumber;
    }
}