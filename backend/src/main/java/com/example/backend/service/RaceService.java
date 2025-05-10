package com.example.backend.service;

import com.example.backend.model.Race;
import com.example.backend.repository.RaceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RaceService {
    private static final Logger logger = LoggerFactory.getLogger(RaceService.class);

    @Autowired
    private RaceRepository raceRepository;

    // Lấy tất cả cuộc đua
    public List<Race> getAllRaces() {
        logger.info("Fetching all races");
        return raceRepository.findAll();
    }
    
    // Lấy một cuộc đua theo ID
    public Race getRaceById(Integer raceId) {
        return raceRepository.findById(raceId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy cuộc đua với ID: " + raceId));
    }
    
    // Tạo mới cuộc đua
    public Race createRace(Race race) {
        logger.info("Creating race: {}", race.getRaceName());
        return raceRepository.save(race);
    }
    
    // Cập nhật thông tin cuộc đua
    public Race updateRace(Integer raceId, Race updatedRace) {
        logger.info("Updating race with ID: {}", raceId);
        Race existingRace = raceRepository.findById(raceId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy cuộc đua với ID: " + raceId));
        
        existingRace.setRaceName(updatedRace.getRaceName());
        existingRace.setRaceDate(updatedRace.getRaceDate());
        existingRace.setSeason(updatedRace.getSeason());
        // Cập nhật các trường cần thiết thêm nếu có...
        return raceRepository.save(existingRace);
    }
    
    // Xóa cuộc đua theo ID
    public void deleteRace(Integer raceId) {
        logger.info("Deleting race with ID: {}", raceId);
        raceRepository.deleteById(raceId);
    }
}