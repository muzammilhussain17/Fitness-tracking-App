package com.eureka.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;
// Importing necessary Spring Boot and Eureka server annotations
@SpringBootApplication
@EnableEurekaServer
// The @EnableEurekaServer annotation is used to enable the Eureka server functionality in the application.
// This annotation is part of the Spring Cloud Netflix project, which provides a set of tools for building distributed systems.
// By adding this annotation, the application will act as a Eureka server, allowing other services to register themselves and discover other services in the system.
// The @SpringBootApplication annotation is a convenience annotation that combines @Configuration, @EnableAutoConfiguration, and @ComponentScan annotations.
// It is used to mark the main class of a Spring Boot application, enabling auto-configuration and component scanning.
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

}
