package com.fitness.aiservice.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fitness.aiservice.model.Recomendation;
import com.fitness.aiservice.repository.RecomendationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecomendationService {

    private final RecomendationRepository recomendationRepository;

    public List<Recomendation> getUserRecommendations(String userId) {
   
       return recomendationRepository.findByUserId(userId);
    }

    public List<Recomendation> getActivityRecommendations(String activityId) {
        return recomendationRepository.findByActivityId(activityId);
    }



}
