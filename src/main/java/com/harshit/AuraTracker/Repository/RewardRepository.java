package com.harshit.AuraTracker.Repository;

import com.harshit.AuraTracker.modal.Reward;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RewardRepository extends JpaRepository<Reward, Long> {
    List<Reward> findByStudentId(Long studentId);
}
