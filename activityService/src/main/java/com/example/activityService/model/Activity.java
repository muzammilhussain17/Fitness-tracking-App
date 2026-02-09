package com.example.activityService.model;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document (collection = "activities")

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class Activity {

//    @Autowired
//    private ActivityType activityType;
    // Fields
    // Assuming id is a String, you can change it to ObjectId if needed
    @Id
    private String id;
    private String userId;

    private String type;
    private int duration; // in minutes
    private int distance; // in meters
    private int caloriesBurned;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    @Field ("additionalMetrics")
    private Map<String, Object> AdditionalMetrics;
    
    // Additional metadata
    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;
    // Getters and setters
}
