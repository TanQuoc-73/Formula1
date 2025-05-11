package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.service.AIService;

@RestController
@RequestMapping("/api/ai")
public class AIController {
    @Autowired
    private AIService aiService;

    @GetMapping("/predict")
    public ResponseEntity<String> predictRaceOutcome(@RequestParam String inputData) {
        String result = aiService.predictRaceOutcome(inputData);
        return ResponseEntity.ok(result);
    }
}
