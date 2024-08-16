package com.example.myapphotelsbackend.controller;


import java.util.List;

public class CreateGroupRequest {

    private String name;
    private Long adminId;
    private List<Long> memberIds;
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Long getAdminId() {
        return adminId;
    }
    public void setAdminId(Long adminId) {
        this.adminId = adminId;
    }
    public List<Long> getMemberIds() {
        return memberIds;
    }
    public void setMemberIds(List<Long> memberIds) {
        this.memberIds = memberIds;
    }

  
    

}

