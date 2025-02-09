package com.harshit.AuraTracker.Controller;

import com.harshit.AuraTracker.Service.RewardService;
import com.harshit.AuraTracker.modal.Reward;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rewards")
public class RewardController {

    @Autowired
    private RewardService rewardService;

    @GetMapping("/{studentId}")
    public List<Reward> getRewards(@PathVariable Long studentId) {
        return rewardService.getRewardsByStudent(studentId);
    }

    @PostMapping("/unlock/{rewardId}")
    public String unlockReward(@PathVariable Long rewardId) {
        rewardService.unlockReward(rewardId);
        return "Reward unlocked successfully!";
    }
}
