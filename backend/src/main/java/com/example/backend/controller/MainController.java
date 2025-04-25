package com.example.backend.controller;

import com.example.backend.model.*;
import com.example.backend.repository.*;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class MainController {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private TrackRepository trackRepository;

    @Autowired
    private RaceRepository raceRepository;

    @Autowired
    private RaceResultRepository raceResultRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private FastestLapRepository fastestLapRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LoginHistoryRepository loginHistoryRepository;

    @Autowired
    private UserService userService;



    @GetMapping("/")
    public String home() {
        return "Welcome to F1 API!";
    }

    @PostMapping("/auth/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User registeredUser = userService.registerUser(user);
            return ResponseEntity.ok(Map.of("message", "dang ký thành công", "userName", registeredUser.getUserName()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        try {
            String userName = loginRequest.get("userName");
            String password = loginRequest.get("password");
            User user = userService.loginUser(userName, password);
            return ResponseEntity.ok(Map.of(
                "message", "Đăng nhập thành công",
                "userId", user.getUserId(),
                "userName", user.getUserName(),
                "firstName", user.getFirstName(),
                "lastName", user.getLastName(),
                "role", user.getRole().name()
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/teams")
    public List<Team> getAllTeams() {
        List<Team> teams = teamRepository.findAll();
        System.out.println("Teams fetched: " + teams);
        return teams;
    }

    @GetMapping("/login_history")
    public List<LoginHistory> getAllLoginHistory() {
        return loginHistoryRepository.findAll();
    }

    @GetMapping("/drivers")
    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    @GetMapping("/tracks")
    public List<Track> getAllTracks() {
        return trackRepository.findAll();
    }

    @GetMapping("/races")
    public List<Race> getAllRaces() {
        return raceRepository.findAll();
    }

    @GetMapping("/race-results")
    public List<RaceResult> getAllRaceResults() {
        return raceResultRepository.findAll();
    }

    @GetMapping("/schedules")
    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    @GetMapping("/fastest-laps")
    public List<FastestLap> getAllFastestLaps() {
        return fastestLapRepository.findAll();
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}