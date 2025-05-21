package com.example.backend.service;

import com.example.backend.model.Schedule;
import com.example.backend.repository.ScheduleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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
        validateSchedule(schedule); // Kiểm tra dữ liệu trước khi lưu
        return scheduleRepository.save(schedule);
    }

    public Schedule updateSchedule(Integer id, Schedule updatedSchedule) {
        Schedule schedule = getScheduleById(id);
        // Cập nhật tất cả các trường từ updatedSchedule
        schedule.setRace(updatedSchedule.getRace());
        schedule.setStartTime(updatedSchedule.getStartTime());
        schedule.setEndTime(updatedSchedule.getEndTime());
        schedule.setEventType(updatedSchedule.getEventType());
        schedule.setSessionNumber(updatedSchedule.getSessionNumber());
        schedule.setNotes(updatedSchedule.getNotes());

        validateSchedule(schedule); // Kiểm tra dữ liệu sau khi cập nhật
        return scheduleRepository.save(schedule);
    }

    public void deleteSchedule(Integer id) {
        scheduleRepository.deleteById(id);
    }

    private void validateSchedule(Schedule schedule) {
        if (schedule.getStartTime() == null) {
            throw new RuntimeException("Thời gian bắt đầu không được để trống");
        }
        if (schedule.getEventType() == null || !schedule.getEventType().matches("Practice|Qualifying|Race|Sprint")) {
            throw new RuntimeException("Loại sự kiện phải là Practice, Qualifying, Race hoặc Sprint");
        }
        if (schedule.getSessionNumber() != null && schedule.getSessionNumber() <= 0) {
            throw new RuntimeException("Số phiên phải lớn hơn 0");
        }
        if (schedule.getEndTime() != null && schedule.getEndTime().isBefore(schedule.getStartTime())) {
            throw new RuntimeException("Thời gian kết thúc phải sau thời gian bắt đầu");
        }
    }
}