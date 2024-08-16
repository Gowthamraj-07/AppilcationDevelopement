package com.example.myapphotelsbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.myapphotelsbackend.model.DietPlan;



@Repository
public interface DietRepo extends JpaRepository<DietPlan,Long> {

     
} 
