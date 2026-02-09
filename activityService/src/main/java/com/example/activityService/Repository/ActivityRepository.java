package com.example.activityService.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.activityService.model.Activity;

public interface ActivityRepository extends MongoRepository<Activity, String> {

    List<Activity> findByUserId(String userId);

}
