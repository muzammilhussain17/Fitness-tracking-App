package com.example.userservice.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.userservice.DTO.AuthResponse;
import com.example.userservice.DTO.LoginRequest;
import com.example.userservice.DTO.RegisterRequest;
import com.example.userservice.DTO.UserResponse;
import com.example.userservice.Repository.UserRepository;
import com.example.userservice.model.User;
import com.example.userservice.security.JwtUtils;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Value("${jwt.expiration-ms:86400000}")
    private long jwtExpirationMs;

    // ─── Register ────────────────────────────────────────────────────────────────
    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use: " + request.getEmail());
        }

        User user = new User();
        user.setEmail(request.getEmail());
        // Hash the password before storing
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());

        User savedUser = userRepository.save(user);
        log.info("New user registered: {}", savedUser.getEmail());
        return mapToResponse(savedUser);
    }

    // ─── Login ───────────────────────────────────────────────────────────────────
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtils.generateToken(
                user.getId(),
                user.getEmail(),
                user.getRole().name()
        );

        log.info("User logged in: {}", user.getEmail());
        return AuthResponse.builder()
                .token(token)
                .userId(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole().name())
                .expiresIn(jwtExpirationMs)
                .build();
    }

    // ─── Get Profile ─────────────────────────────────────────────────────────────
    public UserResponse getUserProfile(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return mapToResponse(user);
    }

    // ─── Validation (called by Activity Service) ──────────────────────────────────
    public Boolean existByUserId(String id) {
        log.info("Validating user with ID: {}", id);
        return userRepository.existsById(id);
    }

    // ─── Mapper ───────────────────────────────────────────────────────────────────
    private UserResponse mapToResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        // Never return the password hash in responses
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setCreatedAt(user.getCreatedAt());
        response.setUpdatedAt(user.getUpdatedAt());
        return response;
    }
}
