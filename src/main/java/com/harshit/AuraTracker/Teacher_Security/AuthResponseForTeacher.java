package com.harshit.AuraTracker.Teacher_Security;

import com.harshit.AuraTracker.modal.Teacher;

import lombok.Data;

@Data
public class AuthResponseForTeacher {
    private String token;
    private String message;
    private Teacher teacher;

    public AuthResponseForTeacher(String token, String message, Teacher teacher) {
        this.token = token;
        this.message = message;
        this.teacher = teacher;
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

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }
}
