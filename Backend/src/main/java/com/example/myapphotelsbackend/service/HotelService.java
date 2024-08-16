package com.example.myapphotelsbackend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.myapphotelsbackend.model.HotelModel;
import com.example.myapphotelsbackend.model.MenuItem;
import com.example.myapphotelsbackend.repository.HotelRepository;
import com.example.myapphotelsbackend.repository.MenuRepo;
@Service
public class HotelService {
     @Autowired
     HotelRepository repo;

     @Autowired
     MenuRepo menuItemRepository;
    public HotelModel postHotel(HotelModel hotel)
    {
       return repo.save(hotel);
    }

    public List<HotelModel> getHotels()
    {
       
        return repo.findAll();
    }
    public String delHotel(Long id)
    {
        repo.deleteById(id);
        return "deleted";
    }
    public HotelModel editUser(HotelModel hotel,Long id)
    {
        HotelModel u=repo.findById(id).orElse(null);
        if(u!=null)
        {
            u.setHotelName(hotel.getHotelName());
            u.setHotelLocation(hotel.getHotelLocation());
            u.setHotelUrl(hotel.getHotelUrl());
            repo.saveAndFlush(u);
        }
        return hotel;

    }
     public HotelModel addMenuItem(Long hotelId, MenuItem menuItem) {
        Optional<HotelModel> hotelOptional = repo.findById(hotelId);
        if (hotelOptional.isPresent()) {
            HotelModel hotel = hotelOptional.get();
            menuItem.setHotel(hotel);
            hotel.getMenuItems().add(menuItem);
            menuItemRepository.save(menuItem);
            return repo.save(hotel);
        } else {
            throw new RuntimeException("Hotel with id " + hotelId + " not found");
        }
    }
    public HotelModel getHotelById(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Hotel with id " + id + " not found"));
    }

    public List<MenuItem> searchMenuItemsByName(String name) {
        return menuItemRepository.findByNameIgnoreCase(name);
    }
    public List<HotelModel> searchHotelsByName(String name) {
        return repo.findByHotelNameIgnoreCase(name);
    }
    public SearchResults searchAll(String name) {
        List<HotelModel> hotels = searchHotelsByName(name);
        List<MenuItem> items = searchMenuItemsByName(name);
        return new SearchResults(hotels, items);
    }

    
    public static class SearchResults {
        private List<HotelModel> hotels;
        private List<MenuItem> menuItems;

        public SearchResults(List<HotelModel> hotels, List<MenuItem> menuItems) {
            this.hotels = hotels;
            this.menuItems = menuItems;
        }

        public List<HotelModel> getHotels() {
            return hotels;
        }

        public void setHotels(List<HotelModel> hotels) {
            this.hotels = hotels;
        }

        public List<MenuItem> getMenuItems() {
            return menuItems;
        }

        public void setMenuItems(List<MenuItem> menuItems) {
            this.menuItems = menuItems;
        }
    }

   
    
}

