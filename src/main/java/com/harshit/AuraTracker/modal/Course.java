package com.harshit.AuraTracker.modal;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String courseName;
    private String description;

    @ManyToOne
    @JoinColumn(name = "studentId")
    private Student student;

    @OneToMany(mappedBy = "courses",cascade = CascadeType.ALL)
    private List<Assignment> assignments;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourse_Name(String course_Name) {
        this.courseName = course_Name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public List<Assignment> getAssignments() {
        return assignments;
    }

    public void setAssignments(List<Assignment> assignments) {
        this.assignments = assignments;
    }
}
