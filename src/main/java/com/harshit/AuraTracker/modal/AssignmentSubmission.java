package com.harshit.AuraTracker.modal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table
public class AssignmentSubmission {
    
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

private String submittedFileUrl;

    @ManyToOne
    private Student student;  // <- link to full Student object instead of just studentId

    @ManyToOne
    private Assignment assignment;


    public String getSubmittedFileUrl() {
        return submittedFileUrl;
    }

    public void setSubmittedFileUrl(String submittedFileUrl) {
        this.submittedFileUrl = submittedFileUrl;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student2) {
        this.student = student;
    }

    public Assignment getAssignment() {
        return assignment;
    }

    public void setAssignment(Assignment assignment) {
        this.assignment = assignment;
    }



}
