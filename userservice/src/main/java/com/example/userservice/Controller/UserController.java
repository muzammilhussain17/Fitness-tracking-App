package com.example.userservice.Controller;


import com.example.userservice.DTO.RegisterRequest;
import com.example.userservice.DTO.UserResponse;
import com.example.userservice.Service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@AllArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController
{
    @Autowired

    private UserService userService;

    @GetMapping("{id}")
    public ResponseEntity<UserResponse> getUserByProfile(@PathVariable String id){

            return ResponseEntity.ok(userService.getUserProfile(id));
    }
    @PostMapping("/Register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request){

        return ResponseEntity.ok(userService.register(request));
    }
    
       @GetMapping("{id}/validate")
    public ResponseEntity<Boolean> existByUserId(@PathVariable String id){

            return ResponseEntity.ok(userService.existByUserId(id));
    }

}
