package com.harshit.AuraTracker.adminAuth;

import com.harshit.AuraTracker.modal.Admin;
import lombok.Data;

@Data
public class AuthResponseForAdmin {
    private String token;
    private String message;
    private Admin admin;

    public AuthResponseForAdmin(String token, String message, Admin admin) {
        this.token = token;
        this.message = message;
        this.admin = admin;
    }
}
