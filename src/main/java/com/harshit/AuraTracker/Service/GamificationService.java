package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.modal.Student;

public interface GamificationService {
    public Student addPoints(int studentId, int points) throws Exception;
}
