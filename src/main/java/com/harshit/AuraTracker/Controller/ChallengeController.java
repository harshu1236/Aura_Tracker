package com.harshit.AuraTracker.Controller;

import com.harshit.AuraTracker.Service.ChallengeService;
import com.harshit.AuraTracker.modal.Challenge;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/challenges")
public class ChallengeController {

    @Autowired
    private ChallengeService challengeService;

    @GetMapping("/{studentId}")
    public List<Challenge> getChallenges(@PathVariable Long studentId) {
        return challengeService.getChallengesByStudentId(studentId);
    }

    @PostMapping
    public Challenge createChallenge(@RequestBody Challenge challenge) {
        return challengeService.createChallenge(challenge);
    }

    @PutMapping("/complete/{challengeId}")
    public String markAsComplete(@PathVariable Long challengeId) {
        return challengeService.markChallengeAsComplete(challengeId);
    }
}
