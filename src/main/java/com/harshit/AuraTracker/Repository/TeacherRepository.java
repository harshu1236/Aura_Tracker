package com.harshit.AuraTracker.Repository;

import com.harshit.AuraTracker.modal.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    Optional<Teacher> findByName(String name);
    Teacher findByEmail(String email);
    //Optional<Teacher> findByTeacherId(Long teacherId);
}
