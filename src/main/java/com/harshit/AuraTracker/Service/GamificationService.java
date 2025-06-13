package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.modal.Student;

public interface GamificationService {
    public Student addPoints(Long studentId, int points) throws Exception;
}
