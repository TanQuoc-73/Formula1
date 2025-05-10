package com.example.backend.controller;

import com.example.backend.model.*;
import com.example.backend.repository.*;
import com.example.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class MainController {

    private final TeamRepository teamRepository;
    private final DriverRepository driverRepository;
    private final TrackRepository trackRepository;
    private final RaceRepository raceRepository;
    private final RaceResultRepository raceResultRepository;
    private final ScheduleRepository scheduleRepository;
    private final FastestLapRepository fastestLapRepository;
    private final UserRepository userRepository;
    private final LoginHistoryRepository loginHistoryRepository;
    private final UserService userService;

    public MainController(
            TeamRepository teamRepository,
            DriverRepository driverRepository,
            TrackRepository trackRepository,
            RaceRepository raceRepository,
            RaceResultRepository raceResultRepository,
            ScheduleRepository scheduleRepository,
            FastestLapRepository fastestLapRepository,
            UserRepository userRepository,
            LoginHistoryRepository loginHistoryRepository,
            UserService userService) {
        this.teamRepository = teamRepository;
        this.driverRepository = driverRepository;
        this.trackRepository = trackRepository;
        this.raceRepository = raceRepository;
        this.raceResultRepository = raceResultRepository;
        this.scheduleRepository = scheduleRepository;
        this.fastestLapRepository = fastestLapRepository;
        this.userRepository = userRepository;
        this.loginHistoryRepository = loginHistoryRepository;
        this.userService = userService;
    }

    @GetMapping("/")
    public String home() {
        return "Welcome to F1 API!";
    }

    @PostMapping("/auth/register")
    public ResponseEntity<?> register(@Valid @RequestBody User user, BindingResult result) {
        // Xử lý lỗi validation
        if (result.hasErrors()) {
            String errorMessage = result.getFieldErrors().stream()
                    .map(error -> error.getField() + ": " + error.getDefaultMessage())
                    .collect(Collectors.joining(", "));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Validation failed: " + errorMessage));
        }

        try {
            // Sửa: truyền thêm firstName và lastName
            User registeredUser = userService.registerUser(
                    user.getUserName(),
                    user.getPassWord(),
                    user.getFirstName(),
                    user.getLastName()
            );
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of("message", "Đăng ký thành công", "userName", registeredUser.getUserName()));
        } catch (UserService.UsernameAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Username already exists"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Invalid input: " + e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "An unexpected error occurred: " + e.getMessage()));
        }
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest loginRequest) {
        try {
            User user = userService.loginUser(loginRequest.getUserName(), loginRequest.getPassword());

            LoginHistory loginHistory = new LoginHistory();
            loginHistory.setUser(user);
            loginHistoryRepository.save(loginHistory);

            return ResponseEntity.ok(Map.of(
                    "message", "Đăng nhập thành công",
                    "userId", user.getUserId(),
                    "userName", user.getUserName(),
                    "firstName", user.getFirstName() != null ? user.getFirstName() : "",
                    "lastName", user.getLastName() != null ? user.getLastName() : "",
                    "role", user.getRole().name()
            ));
        } catch (UserService.InvalidCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid username or password"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "An unexpected error occurred: " + e.getMessage()));
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

    @GetMapping("/teams-with-drivers")
    public List<Team> getTeamsWithDrivers() {
        // Sử dụng fetch join trong repository để tối ưu (nếu cần)
        List<Team> teams = teamRepository.findAll();
        for (Team team : teams) {
            List<Driver> drivers = driverRepository.findByTeamTeamId(team.getTeamId());
            team.setDrivers(drivers);
        }
        System.out.println("Teams with drivers fetched: " + teams);
        return teams;
    }

    @PutMapping("/users/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable("id") Integer id, @Valid @RequestBody User updatedUser, BindingResult result) {
        if (result.hasErrors()) {
            String errorMessage = result.getFieldErrors().stream()
                    .map(error -> error.getField() + ": " + error.getDefaultMessage())
                    .collect(Collectors.joining(", "));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Validation failed: " + errorMessage));
        }

        try {
            User user = userService.updateUser(id, updatedUser);
            return ResponseEntity.ok(user);
        } catch (UserService.UsernameAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Username already exists"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "User not found: " + e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "An unexpected error occurred: " + e.getMessage()));
        }
    }
}

// DTO cho login request
class LoginRequest {
    @NotBlank(message = "Username cannot be empty")
    private String userName;

    @NotBlank(message = "Password cannot be empty")
    private String password;

    // Getters và Setters
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}