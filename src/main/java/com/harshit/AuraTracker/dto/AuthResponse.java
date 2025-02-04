package com.harshit.AuraTracker.dto;

import com.harshit.AuraTracker.modal.Student;
import lombok.Data;

@Data
public class AuthResponse {
    private String token;
    private String message;
    private Student student;

    public AuthResponse(String token, String message, Student student) {
        this.token = token;
        this.message = message;
        this.student = student;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }
}
