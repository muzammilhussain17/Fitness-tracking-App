package com.fitness.aiservice.Controller;

import lombok.RequiredArgsConstructor;

import java.util.Collections;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitness.aiservice.model.Recomendation;
import com.fitness.aiservice.service.RecomendationService;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/recommendation")
public class RecomendationController {
    private final RecomendationService recomendationService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Recomendation>> getUserRecommendations(@PathVariable String userId) {
        List<Recomendation> recommendations = recomendationService.getUserRecommendations(userId);
        if (recommendations.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        }
        return ResponseEntity.ok(recommendations);
    }

     @GetMapping("/activity/{activityId}")
    public ResponseEntity<List<Recomendation>> getActivityRecommendations(@PathVariable String activityId) {
        List<Recomendation> recommendations = recomendationService.getActivityRecommendations(activityId);
        if (recommendations.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        }
        return ResponseEntity.ok(recommendations);
    }

}
