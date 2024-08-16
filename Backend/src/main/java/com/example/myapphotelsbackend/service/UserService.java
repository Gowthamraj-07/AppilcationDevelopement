package com.example.myapphotelsbackend.service;


import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.net.http.HttpHeaders;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.myapphotelsbackend.model.MenuItem;
import com.example.myapphotelsbackend.model.User;
import com.example.myapphotelsbackend.repository.MenuRepo;
import com.example.myapphotelsbackend.repository.UserRepo;
import jakarta.transaction.Transactional;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
@Service
public class UserService {
    @Autowired
    UserRepo userRepo;

    @Autowired
    MenuRepo menuItemRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private static final String projectId = "2b57e581-62e7-4736-9cd7-0bd0291860bf";
    private static final String projectKey = "0424f20f-2d7a-4447-8f2e-fb38b36e5351";
    public List<User> getUsers()
    {
        return userRepo.findAll();
    }
    public Optional<User> getUserById(long id)
    {
        return userRepo.findById(id);
    }
     public ResponseEntity<?> login(@RequestBody User user) {
        HttpURLConnection con = null;
        try {
            // Create GET request
            URI uri = new URI("https", "api.chatengine.io", "/users/me", null);
            URL url = uri.toURL();

            con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            // Set headers
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("Accept", "application/json");
            con.setRequestProperty("Project-ID", projectId);
            con.setRequestProperty("User-Name", user.getUserName());
            con.setRequestProperty("User-Secret", user.getPassword());
            // Generate response String
            StringBuilder responseStr = new StringBuilder();
            try (BufferedReader br = new BufferedReader(
                    new InputStreamReader(con.getInputStream(), "utf-8"))) {
                String responseLine = null;
                while ((responseLine = br.readLine()) != null) {
                    responseStr.append(responseLine.trim());
                }
            }
            // Jsonify + return response
            Map<String, Object> response = new Gson().fromJson(
                    responseStr.toString(), new TypeToken<HashMap<String, Object>>() {
                    }.getType());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } finally {
            if (con != null) {
                con.disconnect();
            }
        }
    }
    public ResponseEntity<?> postUsers(@RequestBody User user) {
        User user1 = userRepo.save(user);
        HttpURLConnection con = null;
        try {
            // Create POST request
            URI uri = new URI("https", "api.chatengine.io", "/users", null);
            URL url = uri.toURL();
            con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            // Set headers
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("Accept", "application/json");
            con.setRequestProperty("Private-Key", projectKey);
            // Add request body
            con.setDoOutput(true);
            Map<String, String> body = new HashMap<>();
            body.put("username", user1.getUserName());
            body.put("secret", user1.getPassword());
            body.put("email", user1.getEmail());
            body.put("first_name", user1.getUserName());
            body.put("last_name", user1.getUserName());

            String jsonInputString = objectMapper.writeValueAsString(body);
            try (OutputStream os = con.getOutputStream()) {
                byte[] input = jsonInputString.getBytes("utf-8");
                os.write(input, 0, input.length);
            }
            // Generate response String
            StringBuilder responseStr = new StringBuilder();
            try (BufferedReader br = new BufferedReader(
                    new InputStreamReader(con.getInputStream(), "utf-8"))) {
                String responseLine;
                while ((responseLine = br.readLine()) != null) {
                    responseStr.append(responseLine.trim());
                }
            }
            // Return response
            return new ResponseEntity<>(responseStr.toString(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } finally {
            if (con != null) {
                con.disconnect();
            }
        }
    }
    public User editUser(User user,long id)
    {
        User u=userRepo.findById(id).orElse(null);
        if(u!=null)
        {
            u.setEmail(user.getEmail());
            u.setUserName(user.getUserName());
            u.setPassword(user.getPassword());
            userRepo.saveAndFlush(u);
        }
        return user;

    }
    @Transactional
    public void addToCart(Long userId, Long menuItemId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Map<Long, Long> cart = user.getCart();
        if (cart == null) {
            cart = new HashMap<>();
        }
        cart.put(menuItemId, cart.getOrDefault(menuItemId, 0L) + 1);
        user.setCart(cart);
        userRepo.save(user);
    }

    @Transactional
    public void incrementCartItem(Long userId, Long menuItemId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Map<Long, Long> cart = user.getCart();
        if (cart != null && cart.containsKey(menuItemId)) {
            cart.put(menuItemId, cart.get(menuItemId) + 1);
            user.setCart(cart);
            userRepo.save(user);
        } else {
            throw new RuntimeException("Menu item not found in cart");
        }
    }
    @Transactional
    public void decrementCartItem(Long userId, Long menuItemId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Map<Long, Long> cart = user.getCart();
        if (cart != null && cart.containsKey(menuItemId)) {
            long currentCount = cart.get(menuItemId);
            if (currentCount > 1) {
                cart.put(menuItemId, currentCount - 1);
            } else {
                cart.remove(menuItemId);
            }
            user.setCart(cart);
            userRepo.save(user);
        } else {
            throw new RuntimeException("Menu item not found in cart");
        }
    }
    public List<Map<String, Object>> getCartItems(Long userId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Map<Long, Long> cart = user.getCart();
        List<Map<String, Object>> cartItems = new ArrayList<>();
        for (Map.Entry<Long, Long> entry : cart.entrySet()) {
            MenuItem menuItem = menuItemRepository.findById(entry.getKey())
                    .orElseThrow(() -> new RuntimeException("Menu item not found"));
            Map<String, Object> itemDetails = new HashMap<>();
            itemDetails.put("id", menuItem.getId());
            itemDetails.put("name", menuItem.getName());
            itemDetails.put("description", menuItem.getDescription());
            itemDetails.put("imageUrl", menuItem.getImageUrl());
            itemDetails.put("price", menuItem.getPrice());
            itemDetails.put("rating", menuItem.getRating());
            itemDetails.put("type", menuItem.getType()); // Added type attribute
            itemDetails.put("count", entry.getValue());
            cartItems.add(itemDetails);
        }
        return cartItems;
    }
    public Map<Long, Long> getCartCount(Long userId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return user.getCart();
    }
   
    public boolean deleteCart(Long userId)
    {
        User user=userRepo.findById(userId).orElseThrow(()->new RuntimeException("User not found"));
        user.setCart(new HashMap<>());
        userRepo.save(user);
        return true;
    }
    public User updateCartHotel(Long userId, Long carthotel) {
        Optional<User> optionalUser = userRepo.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setCarthotel(carthotel);
            return userRepo.save(user);
        }
        throw new RuntimeException("User not found with id " + userId);
    }
    public MenuItem getMenuItemById(Long id) {
        Optional<MenuItem> menuItem = menuItemRepository.findById(id);
        return menuItem.orElse(null); // or throw an exception if preferred
    }


   
    
     
    
}