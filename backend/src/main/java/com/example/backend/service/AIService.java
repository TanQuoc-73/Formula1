package com.example.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

@Service
public class AIService {
    private final RestTemplate restTemplate = new RestTemplate();

    public String predictRaceOutcome(String inputData) {
        String apiUrl = "http://localhost:5000/predict";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> request = new HttpEntity<>(inputData, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, request, String.class);
        return response.getBody();
    }
}