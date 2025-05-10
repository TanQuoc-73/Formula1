package com.example.backend.service;

import com.example.backend.model.Driver;
import com.example.backend.repository.DriverRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriverService {
    private static final Logger logger = LoggerFactory.getLogger(DriverService.class);

    @Autowired
    private DriverRepository driverRepository;

    // Lấy danh sách tất cả tài xế
    public List<Driver> getAllDrivers() {
        logger.info("Fetching all drivers");
        return driverRepository.findAll();
    }

    // Tạo mới tài xế
    public Driver createDriver(Driver driver) {
        logger.info("Creating driver: {}", driver.getDriverName());
        return driverRepository.save(driver);
    }
    
    // Cập nhật thông tin tài xế
    public Driver updateDriver(Integer driverId, Driver updatedDriver) {
        logger.info("Updating driver with ID: {}", driverId);
        Driver existingDriver = driverRepository.findById(driverId)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy tài xế với ID: " + driverId));
        
        existingDriver.setDriverName(updatedDriver.getDriverName());
        existingDriver.setTeam(updatedDriver.getTeam());
        existingDriver.setDriverPoints(updatedDriver.getDriverPoints());
        
        return driverRepository.save(existingDriver);
    }
    
    // Xóa tài xế theo ID
    public void deleteDriver(Integer driverId) {
        logger.info("Deleting driver with ID: {}", driverId);
        driverRepository.deleteById(driverId);
    }
}