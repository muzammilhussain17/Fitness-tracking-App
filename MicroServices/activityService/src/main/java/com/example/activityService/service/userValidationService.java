package com.example.activityService.service;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;


@Service
@RequiredArgsConstructor


public class userValidationService {

    private final WebClient userServiceWebClient;

    public Boolean isUserValid(String userId) {
        try {
            return userServiceWebClient.get()
                    .uri("/api/user/{id}/validate", userId)
                    .retrieve()
                    .bodyToMono(Boolean.class)
                    .block();
        } catch (WebClientResponseException e) {
            if (e.getStatusCode() == HttpStatus.NOT_FOUND) {
                return false; // User not found
            }
            throw e; // Re-throw other exceptions
        }
    }
}