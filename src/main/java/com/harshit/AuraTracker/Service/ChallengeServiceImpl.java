package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.Repository.ChallengeRepository;
import com.harshit.AuraTracker.modal.Challenge;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChallengeServiceImpl implements ChallengeService{

    @Autowired
    private ChallengeRepository challengeRepository;

    public List<Challenge> getChallengesByStudentId(Long studentId) {
        return challengeRepository.findByStudent_StudentId(studentId);
    }

    public Challenge createChallenge(Challenge challenge) {
        return challengeRepository.save(challenge);
    }

    public String markChallengeAsComplete(Long challengeId) {
        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new RuntimeException("Challenge not found"));
        challenge.setCompleted(true);
        challengeRepository.save(challenge);
        return "Challenge marked as completed!";
    }
}
