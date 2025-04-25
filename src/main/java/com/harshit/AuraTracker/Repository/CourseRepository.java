package com.harshit.AuraTracker.Repository;

import com.harshit.AuraTracker.modal.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface CourseRepository extends JpaRepository<Course,Long> {
    List<Course> findByStudent_StudentId(Long studentId);

}
