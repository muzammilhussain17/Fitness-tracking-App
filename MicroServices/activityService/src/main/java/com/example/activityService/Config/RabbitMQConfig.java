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

    public Queue queue() {
        return new Queue("activityQueue", true);
    }
    @Bean
    public DirectExchange activityExchange(){

        return new DirectExchange("fitness_Exchange");
    }

    @Bean
    public Binding activityBinding(Queue activityQueue, DirectExchange activityExchange)
    {
        return BindingBuilder.bind(activityQueue).to(activityExchange).with("activityRoutingKey");
    }

    @Bean

    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }
    

}
