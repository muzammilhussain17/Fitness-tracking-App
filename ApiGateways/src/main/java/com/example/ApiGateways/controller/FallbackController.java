package com.example.ApiGateways.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

/**
 * Fallback controller for circuit breaker fallbacks.
 * Returns graceful error responses when downstream services are unavailable.
 */
@RestController
@RequestMapping("/fallback")
public class FallbackController {

    @GetMapping("/user")
    public Mono<ResponseEntity<Map<String, Object>>> userServiceFallback() {
        return Mono.just(buildFallbackResponse("User Service",
                "User service is currently unavailable. Please try again later."));
    }

    @GetMapping("/activity")
    public Mono<ResponseEntity<Map<String, Object>>> activityServiceFallback() {
        return Mono.just(buildFallbackResponse("Activity Service",
                "Activity service is currently unavailable. Please try again later."));
    }

    @GetMapping("/ai")
    public Mono<ResponseEntity<Map<String, Object>>> aiServiceFallback() {
        return Mono.just(
                buildFallbackResponse("AI Service", "AI service is currently unavailable. Please try again later."));
    }

    private ResponseEntity<Map<String, Object>> buildFallbackResponse(String serviceName, String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "SERVICE_UNAVAILABLE");
        response.put("service", serviceName);
        response.put("message", message);
        response.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(response);
    }
}
