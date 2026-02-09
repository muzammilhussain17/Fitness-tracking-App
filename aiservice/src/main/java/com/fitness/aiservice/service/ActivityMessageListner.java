package com.fitness.aiservice.service;


import com.fitness.aiservice.model.Activity;
import com.fitness.aiservice.model.Recomendation;
import com.fitness.aiservice.repository.RecomendationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ActivityMessageListner {
    private final ActivityAiService aiService;
    private final RecomendationRepository repository;

    @RabbitListener(queues = "activityQueue")
    public void processActivity(Activity activity){
        log.info("received activity for processing: {}",activity.getId());
//        log.info("Generated recomendations: {}",);
        Recomendation recomendation=aiService.generateRecomendation(activity);
        repository.save(recomendation);
    }
}
