package com.example.backend.repository;

import com.example.backend.model.FastestLap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FastestLapRepository extends JpaRepository<FastestLap, Integer> {
}