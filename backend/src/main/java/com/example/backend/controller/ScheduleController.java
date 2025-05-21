package com.example.backend.controller;

import com.example.backend.model.Schedule;
import com.example.backend.service.ScheduleService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/schedules")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class ScheduleController {

    private static final Logger logger = LoggerFactory.getLogger(ScheduleController.class);
    private final ScheduleService scheduleService;

    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
        logger.info("ScheduleController initialized");
    }

    @GetMapping
    public ResponseEntity<List<Schedule>> getAllSchedules() {
        logger.info("Received GET request for /api/schedules");
        try {
            List<Schedule> schedules = scheduleService.getAllSchedules();
            logger.info("Fetched {} schedules", schedules.size());
            return ResponseEntity.ok(schedules);
        } catch (Exception e) {
            logger.error("Error fetching schedules", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getScheduleById(@PathVariable Integer id) {
        logger.info("Received GET request for /api/schedules/{}", id);
        try {
            Schedule schedule = scheduleService.getScheduleById(id);
            logger.info("Fetched schedule: {}", schedule);
            return ResponseEntity.ok(schedule);
        } catch (RuntimeException e) {
            logger.error("Schedule not found for id: {}", id, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Schedule không tồn tại");
        } catch (Exception e) {
            logger.error("Error fetching schedule with id: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching schedule");
        }
    }

    @PostMapping
    public ResponseEntity<?> createSchedule(@Valid @RequestBody Schedule schedule, BindingResult bindingResult) {
        logger.info("Received POST request for /api/schedules with data: {}", schedule);
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(error ->
                    errors.put(error.getField(), error.getDefaultMessage()));
            logger.warn("Validation errors: {}", errors);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }
        try {
            Schedule created = scheduleService.createSchedule(schedule);
            logger.info("Created schedule: {}", created);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (RuntimeException e) {
            logger.error("Failed to create schedule", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Không thể tạo schedule: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Error creating schedule", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating schedule");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSchedule(@PathVariable Integer id, @Valid @RequestBody Schedule schedule, BindingResult bindingResult) {
        logger.info("Received PUT request for /api/schedules/{} with data: {}", id, schedule);
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(error ->
                    errors.put(error.getField(), error.getDefaultMessage()));
            logger.warn("Validation errors: {}", errors);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }
        try {
            Schedule updated = scheduleService.updateSchedule(id, schedule);
            logger.info("Updated schedule: {}", updated);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            logger.error("Failed to update schedule with id: {}", id, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không thể cập nhật: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Error updating schedule with id: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating schedule");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSchedule(@PathVariable Integer id) {
        logger.info("Received DELETE request for /api/schedules/{}", id);
        try {
            scheduleService.deleteSchedule(id);
            logger.info("Deleted schedule with id: {}", id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            logger.error("Failed to delete schedule with id: {}", id, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không thể xóa: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Error deleting schedule with id: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting schedule");
        }
    }
}