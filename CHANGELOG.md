# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Kubernetes Helm charts for production deployment
- Docker Compose configuration for local development
- SpringDoc OpenAPI integration for API documentation

### Changed
- Updated all services to Spring Boot 3.4.6

### Fixed
- N/A

---

## [1.0.0] - 2026-02-09

### Added

#### Core Infrastructure
- **Config Server** - Centralized configuration management with Spring Cloud Config
- **Eureka Server** - Service discovery and registration
- **API Gateway** - Single entry point with Spring Cloud Gateway
  - Request routing and load balancing
  - Rate limiting configuration
  - Circuit breaker pattern with Resilience4j

#### Microservices
- **User Service** (v1.0.0)
  - User registration and authentication (JWT)
  - Role-based access control (RBAC)
  - Profile management
  - MySQL database integration
  
- **AI Service** (v0.9.0 Beta)
  - Natural language processing endpoints
  - Predictive analytics
  - MongoDB integration
  - RabbitMQ message processing
  
- **Activity Service** (v1.0.0)
  - User activity tracking
  - System performance metrics
  - Audit logging
  - Real-time monitoring

#### DevOps & Deployment
- Docker support with multi-stage Dockerfiles
- Docker Compose for local development
- Docker Compose for infrastructure (MySQL, MongoDB, RabbitMQ, Redis)
- Kubernetes Helm charts for production deployment
- Environment configuration templates

#### Documentation
- Comprehensive README.md
- API documentation with Swagger UI
- Apache License 2.0

### Security
- JWT-based authentication
- Role-based access control
- Secure environment variable handling

---

## [0.1.0] - 2026-01-15

### Added
- Initial project structure
- Basic service scaffolding
- Spring Boot integration
- Eureka service discovery setup

---

[Unreleased]: https://github.com/yourusername/microservices-project/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/yourusername/microservices-project/compare/v0.1.0...v1.0.0
[0.1.0]: https://github.com/yourusername/microservices-project/releases/tag/v0.1.0
