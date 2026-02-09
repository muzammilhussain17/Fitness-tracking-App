package com.example.activityService.service;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;


@Service
@RequiredArgsConstructor


public class userValidationService {

    private final WebClient userServiceWebClient;

    public boolean isUserValid(String userId) {
        try {
            Boolean response = userServiceWebClient.get()
                    .uri("/api/user/{id}/validate", userId)
                    .retrieve()
                    .bodyToMono(Boolean.class)
                    .block(); // Mono<Boolean> → Boolean

            return response != null && response; // convert to primitive boolean
        } catch (WebClientResponseException e) {
            if (e.getStatusCode() == HttpStatus.NOT_FOUND) {
                return false; // User not found`
            }
            throw e; // bubble up all other errors
        }
    }
}