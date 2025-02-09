package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.modal.Challenge;

import java.util.List;

public interface ChallengeService {
    public List<Challenge> getChallengesByStudentId(Long studentId);
    public Challenge createChallenge(Challenge challenge);
    public String markChallengeAsComplete(Long challengeId);
}
