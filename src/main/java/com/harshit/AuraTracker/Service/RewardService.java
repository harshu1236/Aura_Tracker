package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.modal.Reward;

import java.util.List;

public interface RewardService {
    public List<Reward> getRewardsByStudent(Long studentId);
    public void unlockReward(Long rewardId);
    public Reward createReward(Reward reward);
}
