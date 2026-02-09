package com.example.activityService.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;

@Configuration
public class RabbitMQConfig {

    // Define the queue
    @Bean
    public Queue activityQueue() {
        return new Queue("activityQueue", true);
    }

    // Define the direct exchange
    @Bean
    public DirectExchange activityExchange() {
        return new DirectExchange("fitness_Exchange");
    }

    // Bind the queue to the exchange with a routing key
    @Bean
    public Binding activityBinding(Queue activityQueue, DirectExchange activityExchange) {
        return BindingBuilder
                .bind(activityQueue)
                .to(activityExchange)
                .with("activityRoutingKey");
    }

    // Use JSON for message conversion
    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}
