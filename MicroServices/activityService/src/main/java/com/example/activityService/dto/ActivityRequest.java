package com.example.activityService.dto;


import java.time.LocalDateTime;
import java.util.Map;
import lombok.Data;

@Data
public class ActivityRequest {
    private String userId;
    private String activityType;
   private int duration; // in minutes
   private int caloriesBurned;
   private LocalDateTime startTime;
   private Map<String, Object> additionalMetrics;

  

}
