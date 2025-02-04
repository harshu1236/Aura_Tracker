package com.harshit.AuraTracker.modal;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

@Entity
@Data
@Table
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int student_Id;

    @Column(nullable = false)
    private String student_Name;

    @Column(name = "regNo")
    private String regNo;
    
    private String password;
    private String role="STUDENT";
    @OneToMany(mappedBy = "student",cascade = CascadeType.ALL)
    private List<Course> course;

    public int getStudent_Id() {
        return student_Id;
    }

    public void setStudent_Id(int student_Id) {
        this.student_Id = student_Id;
    }

    public String getStudent_Name() {
        return student_Name;
    }

    public void setStudent_Name(String student_Name) {
        this.student_Name = student_Name;
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
        BCryptPasswordEncoder encoder=new BCryptPasswordEncoder();
        this.password=encoder.encode(password);
    }
}
