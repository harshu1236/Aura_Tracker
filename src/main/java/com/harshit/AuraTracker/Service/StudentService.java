package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.modal.Course;
import com.harshit.AuraTracker.modal.Student;
import com.harshit.AuraTracker.modal.Teacher;

import java.util.List;
import java.util.Optional;


public interface StudentService {
    Student createStudent(Student student);
    Student getStudentById(Long id);
    Optional<Student> getStudentDataById(Long id);

    List<Student> getAllStudent();
    public Integer extractStudentIdFromToken(String token);

    List<Course> getCoursesByStudentId(Long studentId);

    public List<Teacher> getTeachersForStudent(Long studentId);


}
