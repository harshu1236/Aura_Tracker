package com.harshit.AuraTracker.Repository;

import com.harshit.AuraTracker.modal.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
    Optional<Student> findByRegNo(String regNo);

    @Query("SELECT s FROM Student s ORDER BY s.points DESC")
    List<Student> getLeaderboard();
}
