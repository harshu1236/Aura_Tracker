package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.modal.Course;
import com.harshit.AuraTracker.modal.Student;
import com.harshit.AuraTracker.modal.Teacher;

import java.util.List;
import java.util.Optional;


public interface StudentService {
    Student createStudent(Student student);
    Optional<Student> getStudentDataById(Integer id);

    List<Student> getAllStudent();
    public Integer extractStudentIdFromToken(String token);

    List<Course> getCoursesByStudentId(Long studentId);

    public List<Teacher> getTeachersForStudent(Integer studentId);


}
