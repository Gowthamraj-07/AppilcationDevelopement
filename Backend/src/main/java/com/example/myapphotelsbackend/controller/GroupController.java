package com.example.myapphotelsbackend.controller;




import com.example.myapphotelsbackend.model.MenuItem;
import com.example.myapphotelsbackend.model.User;
import com.example.myapphotelsbackend.service.ChatEngineService;
import com.example.myapphotelsbackend.service.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
public class GroupController {

    @Autowired
    private ChatEngineService chatEngineService;

   @Autowired
   UserService ser; 

    @CrossOrigin
    @PostMapping("/creategrp")
    public ResponseEntity<String> createGroup(@RequestBody CreateGroupRequest request) {
        return chatEngineService.createGroup(request.getName(), request.getAdminId(), request.getMemberIds());
    }
    
    @CrossOrigin
    @PostMapping("/{groupId}/addMenuItem")
    public ResponseEntity<String> addMenuItemToGroup(@PathVariable Long groupId, @RequestBody MenuItem menuItem) {
        return chatEngineService.addMenuItemToGroup(groupId, menuItem);
    }

   @GetMapping("/users")
   public List<User> getMethodName() {
       return ser.getUsers();
   }
   
    

}
