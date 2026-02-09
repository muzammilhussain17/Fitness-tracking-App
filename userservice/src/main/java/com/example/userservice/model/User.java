package com.example.userservice.model;


import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDate;


@Entity
@Table(name = "Users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
        private String id;



    @Column(unique = true , nullable = false)
    private String email;


    @Column(nullable = false)
    private String password;
    private String firstName;
    private String lastName;

    @CreationTimestamp
    private LocalDate CreatedAt;
    @UpdateTimestamp
    private LocalDate UpdatedAt;


    @Enumerated(EnumType.STRING)
    private UserRole role=UserRole.USER;


}
