package com.fitness.aiservice.model;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Builder;
import lombok.Data;

@Document(collection = "recommendation")
@Data
@Builder
public class Recomendation {

    @Id
    private String id;
    private String userId;
    private String ActivityId; // ID of the activity this recommendation is related to
    private String recommendationType; // e.g., "diet", "exercise", "wellness"
    private String ActivityType; // e.g., "cardio", "strength", "flexibility"
    private List<String> improvements; // List of improvements or suggestions
    private List<String> suggestions; // Tags for categorization
    private List<String> safety; // Tags for categorization
    private String content; // JSON or text content of the recommendation
    private LocalDateTime createdAt; // Timestamp of when the recommendation was created
    private LocalDateTime updatedAt; // Timestamp of when the recommendation was last updated
}
