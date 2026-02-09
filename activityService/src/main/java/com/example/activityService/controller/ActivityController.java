package com.example.activityService.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.activityService.dto.ActivityRequest;
import com.example.activityService.dto.ActivityResponse;
import com.example.activityService.service.ActivityService;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/v1/activities")
@AllArgsConstructor
public class ActivityController {

    @Autowired
    private ActivityService activityService;
    
@PostMapping
public ResponseEntity<ActivityResponse> trackActivity(@RequestBody ActivityRequest activityRequest) {
        // Here you would typically call a service to handle the business logic
        // For now, we just return a success message
      return ResponseEntity.ok(activityService.trackActivity(activityRequest));
    }

   @GetMapping("/{id}") 
    public ResponseEntity<ActivityResponse> getActivity(@PathVariable String id) {
        // This method would typically retrieve an activity by its ID
        // Here you would typically call a service to handle the business logic
        ActivityResponse activity = activityService.getActivityById(id);
        return ResponseEntity.ok(activity);
    }

    @GetMapping
    public ResponseEntity<List<ActivityResponse>> getAllActivities() {
        // This method retrieves all activities for all users
        List<ActivityResponse> activities = activityService.getAllActivities();
        return ResponseEntity.ok(activities);
    }
}
