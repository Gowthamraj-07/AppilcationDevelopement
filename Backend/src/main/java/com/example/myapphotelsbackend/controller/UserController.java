package com.example.myapphotelsbackend.controller;





import org.springframework.web.bind.annotation.RestController;

import com.example.myapphotelsbackend.model.MenuItem;
import com.example.myapphotelsbackend.model.User;
import com.example.myapphotelsbackend.repository.UserRepo;
import com.example.myapphotelsbackend.service.UserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin
@RestController
public class UserController {
    @Autowired
    UserService userService;
    
    @Autowired
    UserRepo repo;
    @CrossOrigin
    @PutMapping("/{userId}/carthotel")
    public User updateCartHotel(@PathVariable Long userId, @RequestParam Long carthotel) {
        return userService.updateCartHotel(userId, carthotel);
    }
   @GetMapping("/api/getusers")
   public List<User> getAllUsers()
   {
        return userService.getUsers();
   }
   @GetMapping("/api/getusers/{id}")
   public Optional<User> getUserById(@PathVariable long id)
   {
        return userService.getUserById(id);
   }
   @PostMapping("/api/postusers")
      public ResponseEntity<?> postUser(@RequestBody User user) {
       
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.postUsers(user)); // Return the created user with 201 status
    }
   @PutMapping("/api/editusers/{id}")
   public User postUser(@RequestBody User user,@PathVariable long id)
   {
     return userService.editUser(user,id);
   }
     @PostMapping("/{userId}/cart")
    public void addToCart(@PathVariable Long userId, @RequestParam Long menuItemId) {
        userService.addToCart(userId, menuItemId);
    }

    @PutMapping("/{userId}/cart/increment")
    public void incrementCartItem(@PathVariable Long userId, @RequestParam Long menuItemId) {
        userService.incrementCartItem(userId, menuItemId);
    }

    @PutMapping("/{userId}/cart/decrement")
    public void decrementCartItem(@PathVariable Long userId, @RequestParam Long menuItemId) {
        userService.decrementCartItem(userId, menuItemId);
    }

    @GetMapping("/{userId}/cart/items")
    public List<Map<String, Object>> getCartItems(@PathVariable Long userId) {
        return userService.getCartItems(userId);
    }
    @GetMapping("/{userId}/cart/count")
    public Map<Long, Long> getCartCount(@PathVariable Long userId) {
        return userService.getCartCount(userId);
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.login(user)); // Return the created user with 201 status
    }
     @GetMapping("/checkUser")
    public ResponseEntity<Map<String, Boolean>> checkUser(@RequestParam String email, @RequestParam String number) {
        boolean emailExists = repo.existsByEmail(email);
        boolean numberExists = repo.existsByNumber(number);

        Map<String, Boolean> result = new HashMap<>();
        result.put("email", emailExists);
        result.put("number", numberExists);

        return ResponseEntity.ok(result);
    }

    @DeleteMapping("{userId}/cart/delete")
    public boolean deleteCart(@PathVariable Long userId)
    {
        return userService.deleteCart(userId);
    }
     @GetMapping("menu/{id}")
    public MenuItem getMenuItem(@PathVariable Long id) {
        return userService.getMenuItemById(id);
    }
   
    
    
    
   

    
    
   
    
    
}