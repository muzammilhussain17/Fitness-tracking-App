package com.example.userservice.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

    private String token;
    private String userId;
    private String email;
    private String firstName;
    private String lastName;
    private String role;
    private long expiresIn; // milliseconds
}
