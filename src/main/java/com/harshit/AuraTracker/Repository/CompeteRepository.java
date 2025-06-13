package com.harshit.AuraTracker.Repository;
import com.harshit.AuraTracker.modal.Compete;
import com.harshit.AuraTracker.modal.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface CompeteRepository extends JpaRepository<Compete, Long> {

    List<Compete> findByChallengerOrOpponent(Student challenger, Student opponent);

    List<Compete> findByCompletedFalseAndDeadlineBefore(LocalDateTime now);

    List<Compete> findByWinner(Student winner);

    // Optional: fetch all ongoing duels
    List<Compete> findByCompletedFalse();
}
