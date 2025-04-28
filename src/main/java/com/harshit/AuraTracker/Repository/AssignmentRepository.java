package com.harshit.AuraTracker.Repository;

import com.harshit.AuraTracker.modal.Assignment;
import com.harshit.AuraTracker.modal.Course;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment,Long> {
    List<Assignment> findByCourses_CourseId(Long courseId);

    List<Assignment> findByCourses(Course course);

}
