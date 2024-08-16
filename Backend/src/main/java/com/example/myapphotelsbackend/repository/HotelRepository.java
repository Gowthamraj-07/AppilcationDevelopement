package com.example.myapphotelsbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.myapphotelsbackend.model.HotelModel;
@Repository
public interface HotelRepository extends JpaRepository<HotelModel,Long> {

     @Query("SELECT h FROM HotelModel h WHERE LOWER(h.hotelName) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<HotelModel> findByHotelNameIgnoreCase(@Param("name") String name);
     
} 