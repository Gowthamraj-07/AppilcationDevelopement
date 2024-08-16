package com.example.myapphotelsbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.example.myapphotelsbackend.model.HotelModel;
import com.example.myapphotelsbackend.model.MenuItem;
import com.example.myapphotelsbackend.service.HotelService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
public class HotelController {
    @Autowired
    HotelService ser;

   

    @CrossOrigin
    @GetMapping("/hotels")
    public List<HotelModel> getMethodName() {
        return ser.getHotels();
    }

    @CrossOrigin
    @PostMapping("/post")
    public HotelModel postMethodName(@RequestBody HotelModel entity) {
        //TODO: process POST request
        
        return ser.postHotel(entity);
    }
    @CrossOrigin
    @DeleteMapping("/delete/{id}")
public String deleteHotel(@PathVariable("id") Long id) {
    return ser.delHotel(id);
    
}
@CrossOrigin
@PostMapping("/{hotelId}/menuItems")
    public ResponseEntity<HotelModel> addMenuItemToHotel(@PathVariable Long hotelId, @RequestBody MenuItem menuItem) {
        HotelModel updatedHotel = ser.addMenuItem(hotelId, menuItem);
        return ResponseEntity.ok(updatedHotel);
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public HotelModel getHotelById(@PathVariable Long id) {
        return ser.getHotelById(id);
    }
    
    @CrossOrigin
    @GetMapping("/menu-items/search/{name}")
    public List<MenuItem> searchMenuItems(@PathVariable String name) {
        return ser.searchMenuItemsByName(name);
    }
    
    @CrossOrigin
    @GetMapping("/hotels/search/{name}")
    public List<HotelModel> searchHotels(@PathVariable String name) {
        return ser.searchHotelsByName(name);
    }
    
    @CrossOrigin
    @GetMapping("/search/{name}")
    public HotelService.SearchResults search(@PathVariable String name) {
        return ser.searchAll(name);
    }
    
    
}
