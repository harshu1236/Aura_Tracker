package com.harshit.AuraTracker.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.harshit.AuraTracker.modal.StudentSubmission;

public interface StudentSubmissionRepository extends JpaRepository<StudentSubmission, Long>{
    List<StudentSubmission> findByAssignment_Id(Long assignmentId);
    List<StudentSubmission> findByStudent_StudentId(Long studentId);
}
