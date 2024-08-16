package com.example.myapphotelsbackend.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.myapphotelsbackend.model.DietPlan;
import com.example.myapphotelsbackend.service.DietService;

@CrossOrigin
@RestController
public class DietController {
     @Autowired
    private DietService dietPlanService;

    @GetMapping("/api/diet/getall")
    public List<DietPlan> getAllDietPlans() {
        return dietPlanService.getAllDietPlans();
    }

    @GetMapping("/api/diet/getbyid/{id}")
    public DietPlan getDietPlanById(@PathVariable Long id) {
        return dietPlanService.getDietPlanById(id);
    }

    @PostMapping("/api/diet/post")
    public DietPlan createDietPlan(@RequestBody DietPlan dietPlan) {
        return dietPlanService.saveDietPlan(dietPlan);
    }

    @PutMapping("/api/diet/put/{id}")
    public DietPlan updateDietPlan(@PathVariable Long id, @RequestBody DietPlan dietPlan) {
        dietPlan.setId(id);
        return dietPlanService.saveDietPlan(dietPlan);
    }

    @DeleteMapping("/api/diet/delete/{id}")
    public void deleteDietPlan(@PathVariable Long id) {
        dietPlanService.deleteDietPlan(id);
    }
    
}
