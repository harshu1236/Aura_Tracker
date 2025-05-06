package com.harshit.AuraTracker.dto;

import lombok.Data;

@Data
public class TeacherSignupRequest {
    private String name;
    private String email;
    private String password;

    private String courseType;    // e.g., BTECH, MASTERS, PHD
    private String courseBranch;  // e.g., CSE, ECE
    private int semester;
}
