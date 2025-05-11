package com.example.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AIService {
    private static final Logger logger = LoggerFactory.getLogger(AIService.class);
    private final RestTemplate restTemplate = new RestTemplate();

    public String predictRaceOutcome(String inputData) {
        logger.info("Calling AI API with input: {}", inputData);
        String apiUrl = "http://localhost:5000/predict";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> request = new HttpEntity<>(inputData, headers);
        try {
            ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, request, String.class);
            logger.info("AI API response: {}", response.getBody());
            return response.getBody();
        } catch (Exception e) {
            logger.error("Error calling AI API: {}", e.getMessage());
            throw new RuntimeException("Failed to call AI API: " + e.getMessage());
        }
    }
}