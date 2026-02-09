package com.example.userservice.DTO;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank (message = "password is required")
    @Size(min = 6 , max =15, message = "password must be 6 chracter minimum")
    private String password;
    private String firstName;
    private String lastName;

    @NotBlank(message = "email is required")
    @Email(message = "invalid email formate")
    private String email;


}
