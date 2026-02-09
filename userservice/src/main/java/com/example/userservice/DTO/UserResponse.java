package com.example.userservice.DTO;

import lombok.Data;

import java.time.LocalDate;


@Data

public class UserResponse {


    private String id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private LocalDate CreatedAt;
    private LocalDate UpdatedAt;
}
