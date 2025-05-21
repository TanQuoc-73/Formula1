package com.example.backend.controller;

import com.example.backend.model.Schedule;
import com.example.backend.service.ScheduleService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedules")
@CrossOrigin(origins = "http://localhost:3000")
public class ScheduleController {

    private final ScheduleService scheduleService;

    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping
    public List<Schedule> getAllSchedules() {
        return scheduleService.getAllSchedules();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getScheduleById(@PathVariable Integer id) {
        try {
            Schedule schedule = scheduleService.getScheduleById(id);
            return ResponseEntity.ok(schedule);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body("Schedule không tồn tại");
        }
    }

    @PostMapping
    public Schedule createSchedule(@Valid @RequestBody Schedule schedule) {
        return scheduleService.createSchedule(schedule);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSchedule(@PathVariable Integer id, @Valid @RequestBody Schedule schedule) {
        try {
            Schedule updated = scheduleService.updateSchedule(id, schedule);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body("Không thể cập nhật: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSchedule(@PathVariable Integer id) {
        try {
            scheduleService.deleteSchedule(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body("Không thể xóa: " + e.getMessage());
        }
    }
}
