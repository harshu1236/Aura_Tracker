package com.harshit.AuraTracker.Repository;

import com.harshit.AuraTracker.modal.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course,Long> {
}
