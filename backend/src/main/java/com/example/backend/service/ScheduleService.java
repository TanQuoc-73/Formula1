package com.example.backend.service;

import com.example.backend.model.Schedule;
import com.example.backend.repository.ScheduleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;

    public ScheduleService(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    public Schedule getScheduleById(Integer id) {
        return scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule không tồn tại"));
    }

    public Schedule createSchedule(Schedule schedule) {
        return scheduleRepository.save(schedule);
    }

   public Schedule updateSchedule(Integer id, Schedule updatedSchedule) {
        Schedule schedule = getScheduleById(id);
        // cập nhật dữ liệu
        schedule.setEventDate(updatedSchedule.getEventDate()); // Thay setDate bằng setEventDate
        schedule.setRace(updatedSchedule.getRace());
        // thêm các trường khác nếu cần
        return scheduleRepository.save(schedule);
    }

    public void deleteSchedule(Integer id) {
        scheduleRepository.deleteById(id);
    }
}
