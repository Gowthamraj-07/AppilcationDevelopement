package com.example.myapphotelsbackend.repository;



import com.example.myapphotelsbackend.model.Order;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
    // Custom query methods if needed
    List<Order> findByUserId(Long userId);
}

