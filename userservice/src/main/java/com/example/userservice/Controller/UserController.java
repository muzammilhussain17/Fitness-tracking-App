package com.example.userservice.Controller;

import com.example.userservice.DTO.AuthResponse;
import com.example.userservice.DTO.LoginRequest;
import com.example.userservice.DTO.RegisterRequest;
import com.example.userservice.DTO.UserResponse;
import com.example.userservice.Service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // ── Auth ──────────────────────────────────────────────────────────────────────

    @PostMapping("/api/auth/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = userService.login(request);
        return ResponseEntity.ok(response);
    }

    // ── User ──────────────────────────────────────────────────────────────────────

    @PostMapping("/api/user/Register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request) {
        UserResponse response = userService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).ok(response);
    }

    @GetMapping("/api/user/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable String id) {
        return ResponseEntity.ok(userService.getUserProfile(id));
    }

    @GetMapping("/api/user/{id}/validate")
    public ResponseEntity<Boolean> existByUserId(@PathVariable String id) {
        return ResponseEntity.ok(userService.existByUserId(id));
    }
}
