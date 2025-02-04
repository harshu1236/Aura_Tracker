package com.harshit.AuraTracker.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String reg_No;
    private String password;

    public String getReg_No() {
        return reg_No;
    }

    public void setReg_No(String reg_No) {
        this.reg_No = reg_No;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
