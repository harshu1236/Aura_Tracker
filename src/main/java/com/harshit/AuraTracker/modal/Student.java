package com.harshit.AuraTracker.modal;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentId;

    @Column(nullable = false)
    private String studentName;

    @Column(name = "regNo")
    private String regNo;
    
    private String password;
    private String role="STUDENT";
    @OneToMany(mappedBy = "student",cascade = CascadeType.ALL)
    private List<Course> course;

    private int points;

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<Course> getCourse() {
        return course;
    }

    public void setCourse(List<Course> course) {
        this.course = course;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getStudent_Name() {
        return studentName;
    }

    public void setStudent_Name(String student_Name) {
        this.studentName = student_Name;
    }

    public List<Course> getCourses() {
        return course;
    }

    public void setCourses(List<Course> courses) {
        this.course = courses;
    }

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

        this.password=password;

    }
}
