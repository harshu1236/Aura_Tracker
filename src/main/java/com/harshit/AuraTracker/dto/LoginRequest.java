package com.harshit.AuraTracker.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String regNo;
    private String password;

    public String getRegNo() {
        return regNo;
    }

    public void setRegNo(String regNo) {
        this.regNo = regNo;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

