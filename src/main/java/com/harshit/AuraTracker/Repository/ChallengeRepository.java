package com.harshit.AuraTracker.Repository;

import com.harshit.AuraTracker.modal.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    List<Challenge> findByStudent_StudentId(Long studentId);
}
