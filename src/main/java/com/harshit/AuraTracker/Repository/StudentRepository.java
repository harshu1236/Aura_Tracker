package com.harshit.AuraTracker.Repository;

import com.harshit.AuraTracker.modal.Course;
import com.harshit.AuraTracker.modal.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByRegNo(String regNo);

    @Query("SELECT s FROM Student s ORDER BY s.points DESC")
    List<Student> getLeaderboard();

    @Query("SELECT s.courses FROM Student s WHERE s.studentId = :studentId")
    List<Course> findCoursesByStudentId(@Param("studentId") Long studentId);


    @Query("SELECT DISTINCT s FROM Student s JOIN s.courses c WHERE c.courseId IN :courseIds")
List<Student> findStudentsByCourseIds(@Param("courseIds") List<Long> courseIds);


Optional<Student> findByStudentId(Long studentId);


}
