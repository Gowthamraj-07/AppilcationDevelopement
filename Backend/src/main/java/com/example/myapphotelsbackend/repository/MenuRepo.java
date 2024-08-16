package com.example.myapphotelsbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.myapphotelsbackend.model.MenuItem;

public interface MenuRepo extends JpaRepository<MenuItem,Long> {
    List<MenuItem> findByIdIn(List<Long> ids);

     @Query("SELECT m FROM MenuItem m WHERE LOWER(m.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<MenuItem> findByNameIgnoreCase(@Param("name") String name);
}
