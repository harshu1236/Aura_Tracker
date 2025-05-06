package com.harshit.AuraTracker.Repository;

import com.harshit.AuraTracker.modal.Course;
import com.harshit.AuraTracker.modal.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    Optional<Teacher> findByName(String name);
    Teacher findByEmail(String email);
    //Optional<Teacher> findByTeacherId(Long teacherId);

    // 🔽 Custom method to get courses by teacherId
    @Query("SELECT t.courses FROM Teacher t WHERE t.teacherId = :teacherId")
    List<Course> findCoursesByTeacherId(@Param("teacherId") Long teacherId);

    @Query("SELECT DISTINCT t FROM Teacher t JOIN t.courses c WHERE c.courseId IN :courseIds")
    List<Teacher> findTeachersByCourseIds(List<Long> courseIds);
}
