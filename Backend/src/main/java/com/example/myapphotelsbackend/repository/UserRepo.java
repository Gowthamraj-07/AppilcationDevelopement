package com.example.myapphotelsbackend.repository;



import org.springframework.data.jpa.repository.JpaRepository;


import com.example.myapphotelsbackend.model.User;

public interface UserRepo extends JpaRepository<User,Long> {
    User findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByNumber(String number);
}