package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.Repository.RewardRepository;
import com.harshit.AuraTracker.modal.Reward;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RewardServiceImpl implements RewardService{

    @Autowired
    private RewardRepository rewardRepository;

    public List<Reward> getRewardsByStudent(Long studentId) {
        return rewardRepository.findByStudentId(studentId);
    }

    public void unlockReward(Long rewardId) {
        Reward reward = rewardRepository.findById(rewardId).orElseThrow(() -> new RuntimeException("Reward not found"));
        reward.setUnlocked(true);
        rewardRepository.save(reward);
    }
}
