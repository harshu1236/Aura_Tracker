package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.modal.Assignment;

import java.util.List;

public interface AssignmentService {
    public List<Assignment> getAllAssignment();
    public Assignment createAssignment(Assignment assignment,Long courseId) throws Exception;
}
