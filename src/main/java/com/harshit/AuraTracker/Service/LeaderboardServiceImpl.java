package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.Repository.StudentRepository;
import com.harshit.AuraTracker.modal.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaderboardServiceImpl implements LeaderboardService{

    @Autowired
    private StudentRepository studentRepository;

    public List<Student> getLeaderboard() {
        return studentRepository.getLeaderboard();
    }
}
