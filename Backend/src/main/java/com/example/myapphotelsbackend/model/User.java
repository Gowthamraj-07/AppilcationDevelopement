package com.example.myapphotelsbackend.model;





import java.util.List;
import java.util.Map;


import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapKeyColumn;
import jakarta.persistence.Table;

@Entity
@Table(name="users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String userName;
    String number;
    String address;
    String email;
    String password;
    Long carthotel;
    @ElementCollection
    @CollectionTable(name = "user_cart", joinColumns = @JoinColumn(name = "user_id"))
    @MapKeyColumn(name = "menu_item_id")
    @Column(name = "count")
    private Map<Long, Long> cart;

   

   
    public String getNumber() {
        return number;
    }
    public void setNumber(String number) {
        this.number = number;
    }
   
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
  
    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public Map<Long, Long> getCart() {
        return cart;
    }
    public void setCart(Map<Long, Long> cart) {
        this.cart = cart;
    }
    public Long getCarthotel() {
        return carthotel;
    }
    public void setCarthotel(Long carthotel) {
        this.carthotel = carthotel;
    }
    
   
   
  
    


}

