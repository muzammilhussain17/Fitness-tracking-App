package com.example.activityService.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.activityService.Repository.ActivityRepository;
import com.example.activityService.dto.ActivityRequest;
import com.example.activityService.dto.ActivityResponse;
import com.example.activityService.model.Activity;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import lombok.extern.slf4j.Slf4j;


import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@Slf4j
@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final userValidationService userValidationService;
    private final RabbitTemplate rabbitTemplate;
    @Value("${rabbitmq.exchange.name}")
    private String exchange;
    @Value("${rabbitmq.routing.key}")
    private String routingKey;

    public ActivityResponse trackActivity(ActivityRequest activityRequest) {
        // Here you would implement the logic to track the activity
        boolean isValidUser = userValidationService.isUserValid(activityRequest.getUserId());
        if (!isValidUser) {
            throw new RuntimeException("Invalid user ID");
        }

        // Assuming you have a method to validate the user ID
        // if (!userValidationService.isUserValid(activityRequest.getUserId())) {
        //     throw new RuntimeException("User not found");
        // }


        Activity activity = Activity.builder()
                .userId(activityRequest.getUserId())
                .type(activityRequest.getActivityType())
                .duration(activityRequest.getDuration())
                .caloriesBurned(activityRequest.getCaloriesBurned())
                .startTime(activityRequest.getStartTime())
                .AdditionalMetrics(activityRequest.getAdditionalMetrics())
                .build();
        Activity savedActivity = activityRepository.save(activity);
        try{
            rabbitTemplate.convertAndSend(exchange, routingKey, savedActivity);
        }
        catch(Exception e){
            log.error("Error sending activity to RabbitMQ: {}", e.getMessage());
        }
        return mapToResponse(savedActivity);
    }

    public ActivityResponse mapToResponse(Activity activity) {
        //     return ActivityResponse.builder()
        //             .id(activity.getId())
        //             .userId(activity.getUserId())
        //             .activityType(activity.getType())
        //             .duration(activity.getDuration())
        //             .caloriesBurned(activity.getCaloriesBurned())
        //             .startTime(activity.getStartTime())
        //             .additionalMetrics(activity.getAdditionalMetrics())
        //             .build();
        // }
        ActivityResponse response = new ActivityResponse();
        response.setId(activity.getId());
        response.setUserId(activity.getUserId());
        response.setType(activity.getType());
        response.setDuration(activity.getDuration());
        response.setCaloriesBurned(activity.getCaloriesBurned());
        response.setStartTime(activity.getStartTime());
        response.setAdditionalMetrics(activity.getAdditionalMetrics());
        response.setCreatedAt(activity.getCreatedAt());
        response.setUpdatedAt(activity.getUpdatedAt());
        return response;

    }

    public ActivityResponse getActivityById(String id) {
        Activity activity = activityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Activity not found with id: " + id));
        return mapToResponse(activity);

    }

    public List<ActivityResponse> getAllActivities() {
        List<Activity> activities = activityRepository.findAll();
        return activities.stream()
                .map(this::mapToResponse)
                .toList();

    }
}