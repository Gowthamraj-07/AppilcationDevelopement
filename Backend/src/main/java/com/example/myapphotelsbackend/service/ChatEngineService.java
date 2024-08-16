package com.example.myapphotelsbackend.service;



import java.util.List;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.example.myapphotelsbackend.model.MenuItem;

@Service
public class ChatEngineService {

   
    private static final String projectId = "2b57e581-62e7-4736-9cd7-0bd0291860bf";
    private static final String projectKey = "0424f20f-2d7a-4447-8f2e-fb38b36e5351";

    private final RestTemplate restTemplate = new RestTemplate();

    public ResponseEntity<String> createGroup(String name, Long adminId, List<Long> memberIds) {
        String url = "https://api.chatengine.io/groups/";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Project-ID", projectId);
        headers.set("Private-Key", projectKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        String payload = String.format(
                "{\"name\": \"%s\", \"admins\": [%d], \"members\": %s}",
                name, adminId, memberIds.toString()
        );

        HttpEntity<String> request = new HttpEntity<>(payload, headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);
            return response;
        } catch (Exception e) {
            e.printStackTrace();  // Log exception
            throw e;  // Rethrow or handle it as needed
        }
    }

    public ResponseEntity<String> addMenuItemToGroup(Long groupId, MenuItem menuItem) {
        String url = String.format("https://api.chatengine.io/groups/%d/messages/", groupId);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Project-ID", projectId);
        headers.set("Private-Key", projectKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        String payload = String.format(
                "{\"text\": \"Menu Item: %s, Price: %.2f\", \"data\": %s}",
                menuItem.getName(), menuItem.getPrice(), menuItem.toString()
        );

        HttpEntity<String> request = new HttpEntity<>(payload, headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);
            return response;
        } catch (Exception e) {
            e.printStackTrace();  // Log exception
            throw e;  // Rethrow or handle it as needed
        }
    }
}
