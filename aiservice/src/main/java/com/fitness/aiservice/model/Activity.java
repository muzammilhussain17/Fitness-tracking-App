package com.fitness.aiservice.model;


import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.Map;

@Document (collection = "activities")

@Data


public class Activity {


    // Fields
    // Assuming id is a String, you can change it to ObjectId if needed

    private String id;
    private String userId;
    private int duration; // in minutes/ in meters
    private int caloriesBurned;
    private String Type;
    private LocalDateTime startTime;
    private Map<String, Object> AdditionalMetrics;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


}
