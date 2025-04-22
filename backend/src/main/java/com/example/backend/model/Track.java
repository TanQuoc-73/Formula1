package com.example.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.math.BigDecimal;

@Entity
@Table(name = "Tracks")
public class Track {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TrackID")
    private Integer trackId;

    @Column(name = "trackname", nullable = false, length = 100)
    private String trackName;

    @Column(name = "location", length = 100)
    private String location;

    @Column(name = "trackLength")
    private BigDecimal trackLength;

    @Column(name = "numLaps")
    private Integer numLaps;

    // Constructor rỗng
    public Track() {
    }

    public Track(String trackName, String location, BigDecimal trackLength, Integer numLaps) {
        this.trackName = trackName;
        this.location = location;
        this.trackLength = trackLength;
        this.numLaps = numLaps;
    }

    public Integer getTrackId() {
        return trackId;
    }

    public void setTrackId(Integer trackId) {
        this.trackId = trackId;
    }

    public String getTrackName() {
        return trackName;
    }

    public void setTrackName(String trackName) {
        this.trackName = trackName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public BigDecimal getTrackLength() {
        return trackLength;
    }

    public void setTrackLength(BigDecimal trackLength) {
        this.trackLength = trackLength;
    }

    public Integer getNumLaps() {
        return numLaps;
    }

    public void setNumLaps(Integer numLaps) {
        this.numLaps = numLaps;
    }
}