package com.harshit.AuraTracker.modal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long courseId;

    private String courseName;
    private String description;

    @ManyToOne
    @JoinColumn(name = "studentId")
    @JsonIgnore
    private Student student;

    @ManyToOne
    @JoinColumn(name = "teacherId")
    private Teacher teacher;

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }




    @OneToMany(mappedBy = "courses",cascade = CascadeType.ALL)
    private List<Assignment> assignments;

    public Long getId() {
        return courseId;
    }

    public void setId(Long courseId) {
        this.courseId = courseId;
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
