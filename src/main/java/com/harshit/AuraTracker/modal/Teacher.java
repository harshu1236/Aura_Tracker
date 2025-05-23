package com.harshit.AuraTracker.modal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long teacherId;

    private String name;
    private String email;
    private String password;
    private int semester;

    // @ManyToOne
    // @JoinColumn(name = "courseId")
    // @JsonIgnore
    // private Course courses;

    @ManyToMany
    @JoinTable(
    name = "teacher_course",
    joinColumns = @JoinColumn(name = "teacherId"),
    inverseJoinColumns = @JoinColumn(name = "courseId"))
    private List<Course> courses;

    public Teacher() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses( List<Course> courses) {
        this.courses = courses;
    }
}

