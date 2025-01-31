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
    private int student_Id;

    private String student_Name;
    private String reg_No;
    private String Password;
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

    public String getReg_No() {
        return reg_No;
    }

    public void setReg_No(String reg_No) {
        this.reg_No = reg_No;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }
}
