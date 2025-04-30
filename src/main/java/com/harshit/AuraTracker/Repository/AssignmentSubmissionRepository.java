package com.harshit.AuraTracker.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.harshit.AuraTracker.modal.AssignmentSubmission;

public interface AssignmentSubmissionRepository  extends JpaRepository<AssignmentSubmission, Long>{
    List<AssignmentSubmission> findByAssignment_Id(Long assignmentId);

    Optional<AssignmentSubmission> findByAssignment_IdAndStudent_StudentId(Long assignmentId, Long studentId);


}
