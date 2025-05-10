package com.example.backend.service;

import com.example.backend.model.Team;
import com.example.backend.model.Driver;
import com.example.backend.repository.TeamRepository;
import com.example.backend.repository.DriverRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService {
    private static final Logger logger = LoggerFactory.getLogger(TeamService.class);

    @Autowired
    private TeamRepository teamRepository;
    
    @Autowired
    private DriverRepository driverRepository;

    // Lấy danh sách đội và đính kèm driver tương ứng
    public List<Team> getAllTeams() {
        logger.info("Fetching all teams");
        List<Team> teams = teamRepository.findAll();
        for (Team team : teams) {
            List<Driver> drivers = driverRepository.findByTeamTeamId(team.getTeamId());
            team.setDrivers(drivers);
        }
        return teams;
    }

    // Tạo mới một đội
    public Team createTeam(Team team) {
        logger.info("Creating team: {}", team.getTeamName());
        return teamRepository.save(team);
    }

    // Cập nhật thông tin đội
    public Team updateTeam(Integer teamId, Team updatedTeam) {
        logger.info("Updating team with ID: {}", teamId);
        Team existingTeam = teamRepository.findById(teamId)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy đội với ID: " + teamId));
        
        existingTeam.setTeamName(updatedTeam.getTeamName());
        existingTeam.setBaseLocation(updatedTeam.getBaseLocation());
        existingTeam.setNumChampTitles(updatedTeam.getNumChampTitles());
        existingTeam.setTotalPoints(updatedTeam.getTotalPoints());
        // Nếu có thay đổi danh sách driver, có thể cập nhật thêm
        return teamRepository.save(existingTeam);
    }

    // Xóa đội theo ID
    public void deleteTeam(Integer teamId) {
        logger.info("Deleting team with ID: {}", teamId);
        teamRepository.deleteById(teamId);
    }
}