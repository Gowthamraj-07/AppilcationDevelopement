package com.example.myapphotelsbackend.model;



import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="diet")
public class DietPlan {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long id;
    String name;
    String description;
    String dietUrl;
     
    @OneToMany(mappedBy="dietPlan",cascade=CascadeType.ALL,orphanRemoval=true)
    @JsonManagedReference
    Set<DietMenu>dietMenu;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDietUrl() {
        return dietUrl;
    }

    public void setDietUrl(String dietUrl) {
        this.dietUrl = dietUrl;
    }

    public Set<DietMenu> getDietMenu() {
        return dietMenu;
    }

    public void setDietMenu(Set<DietMenu> dietMenu) {
        this.dietMenu = dietMenu;
    }

    
    
    

    
}