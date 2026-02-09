package com.fitness.aiservice.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.fitness.aiservice.model.Recomendation;
import org.springframework.stereotype.Repository;

@Repository
public interface RecomendationRepository extends MongoRepository<Recomendation, String> {

    List<Recomendation> findHistoryByUserId(String userId);

    List<Recomendation> findByUserId(String userId);

    List<Recomendation> findByActivityId(String activityId);

    // You can define custom query methods here if needed.
    // Example:
    // List<Recomendation> findByUserId(String userId);

}
