package com.example.activityService.dto;

import java.time.LocalDateTime;
import java.util.Map;
import lombok.Data;


@Data



public class ActivityResponse {

    private String id;
    private String userId;

    private String type;
    private int duration; // in minutes
    private int distance; // in meters
    private int caloriesBurned;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

  
    private Map<String, Object> AdditionalMetrics;
    
    // Additional metadata
 
    private LocalDateTime createdAt;
  
    private LocalDateTime updatedAt;
    // Getters and setters

}
